import { StageKey } from '../shared/privatePropertyKeys';
import {
  CoreElement,
  CoreElementStage,
  CoreInternalElement,
  PropertyDecorator,
  PropertyDecoratorOptions,
} from '../types';
import { getPropertyValue, setPropertyValue } from './accessPropertyValue';
import { createAttributePropertyMap } from './createAttributePropertyMap';
import { attributeValueDefaultFormatter } from './presets';

export function getPropertyDecoratorCreator(customAttribute?: string) {
  return function propertyDecoratorCreator<T extends CoreElement, U>(
    toPropertyValue: (this: T, input: unknown, oldValue: U | undefined) => U,
    toAttributeValue: (this: T, value: U) => string | null = attributeValueDefaultFormatter,
    options: PropertyDecoratorOptions<T, U> = {},
  ): PropertyDecorator<T, U> {
    const { enumerable = true, watcher } = options;

    return function propertyDecorator(Prototype, propertyKey) {
      const attributeName = createAttributePropertyMap(Prototype, propertyKey, customAttribute);

      Object.defineProperty(Prototype, propertyKey, {
        enumerable,
        configurable: true,
        get(this: T & CoreInternalElement) {
          // return toPropertyValue.call(
          //   this,
          //   this.getAttribute(attributeName),
          //   getPropertyValue(this, propertyKey),
          // );
          return getPropertyValue(this, propertyKey);
        },
        set(this: T & CoreInternalElement, input: unknown) {
          const oldValue = getPropertyValue(this, propertyKey) as U;
          const newValue = toPropertyValue.call(this, input, oldValue);

          if (newValue === oldValue) return;
          setPropertyValue(this, propertyKey, newValue);

          /**
           * Sync property value to HTML attribute before fire `propertyChangedCallback`,
           * to ensure the consistency between them.
           */

          if (
            !(this[StageKey] & CoreElementStage.SYNC_ATTRIBUTE_TO_PROPERTY) &&
            this[StageKey] & CoreElementStage.INITIALIZED
          ) {
            const attributeValue = toAttributeValue.call(this, newValue);

            if (attributeValue === null) {
              this.removeAttribute(attributeName);
            } else {
              this.setAttribute(attributeName, attributeValue);
            }
          }

          watcher?.call(this, oldValue, newValue);
          this.propertyChangedCallback?.call(this, propertyKey, oldValue, newValue);
        },
      });
    };
  };
}
