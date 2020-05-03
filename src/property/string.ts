import { CoreInternalElement, PropertyStringDecorator } from '../types';
import { getPropertyValue, setPropertyValue } from './accessPropertyValue';
import { createAttrPropMap } from './createAttrPropMap';

export function getPropertyStringDecorator(customAttribute?: string): PropertyStringDecorator {
  const decorator: PropertyStringDecorator = (ProtoType, unknownPropertyKey) => {
    const [propertyKey, attributeName] = createAttrPropMap(
      ProtoType,
      unknownPropertyKey,
      customAttribute,
      decorator,
    );

    Object.defineProperty(ProtoType, propertyKey, {
      enumerable: true,
      configurable: true,
      get(this: CoreInternalElement<typeof ProtoType>) {
        // return convertAnyToString(this.getAttribute(attributeName), decorator);
        return getPropertyValue(this, propertyKey);
      },
      set(this: CoreInternalElement<typeof ProtoType>, stringLike: unknown) {
        const newValue = convertAnyToString(stringLike, decorator);
        const oldValue = (getPropertyValue(this, propertyKey) as unknown) as string | undefined;

        if (newValue === oldValue) return;
        setPropertyValue(this, propertyKey, newValue as any);

        /**
         * Sync property value to HTML attribute before fire `propertyChangedCallback`,
         * to ensure the consistency between them.
         */

        if (this.shouldSyncPropertyToAttribute(propertyKey, oldValue, newValue, attributeName)) {
          if (newValue !== undefined) {
            this.setAttribute(attributeName, newValue);
          } else {
            this.removeAttribute(attributeName);
          }
        }

        this.propertyChangedCallback?.call(this, propertyKey, oldValue, newValue);
      },
    });
  };

  decorator.fallback = value => {
    decorator.fallbackValue = value;
    return decorator;
  };

  decorator.only = (...value) => {
    decorator.oneOf = (decorator.oneOf || []).concat(value);
    return decorator;
  };

  return decorator;
}

function convertAnyToString(value: any, decorator: PropertyStringDecorator): string | undefined {
  if (value === null || value === undefined) {
    return decorator.fallbackValue;
  }

  const stringifiedValue = value ? String(value) : '';

  if (decorator.oneOf) {
    if (decorator.oneOf.indexOf(stringifiedValue) >= 0) {
      return stringifiedValue;
    }

    // return fallback one while value is invalid
    return decorator.fallbackValue;
  }

  return stringifiedValue;
}
