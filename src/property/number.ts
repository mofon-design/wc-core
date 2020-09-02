import {
  CoreInternalElement,
  InternalPropertyNumberDecorator,
  PropertyNumberDecorator,
} from '../types';
import { getPropertyValue, setPropertyValue } from './accessPropertyValue';
import { createAttrPropMap } from './createAttrPropMap';

export function getPropertyNumberDecorator(customAttribute?: string): PropertyNumberDecorator {
  const decorator: InternalPropertyNumberDecorator = <T>(
    ProtoType: T,
    unknownPropertyKey: keyof T,
  ) => {
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
        // return decorator.formatter.call(this, this.getAttribute(attributeName));
        return getPropertyValue(this, propertyKey);
      },
      set(this: CoreInternalElement<typeof ProtoType>, numberLike: unknown) {
        const newValue = decorator.formatter.call(this, numberLike);
        const oldValue = (getPropertyValue(this, propertyKey) as unknown) as number | undefined;

        if (newValue === oldValue) return;
        setPropertyValue(this, propertyKey, newValue as any);

        /**
         * Sync property value to HTML attribute before fire `propertyChangedCallback`,
         * to ensure the consistency between them.
         */

        if (this.shouldSyncPropertyToAttribute(propertyKey, oldValue, newValue, attributeName)) {
          if (newValue !== undefined) {
            this.setAttribute(attributeName, String(newValue));
          } else {
            this.removeAttribute(attributeName);
          }
        }

        decorator.listener?.call(this, oldValue, newValue);
        this.propertyChangedCallback?.call(this, propertyKey, oldValue, newValue);
      },
    });
  };

  decorator.fallback = (value) => {
    decorator.fallbackValue = value;
    return decorator;
  };

  decorator.format = (formatter) => {
    decorator.formatter = formatter;
    return decorator;
  };

  decorator.listen = (listener) => {
    decorator.listener = listener;
    return decorator;
  };

  decorator.only = (...value) => {
    decorator.oneOf = (decorator.oneOf || []).concat(value);
    return decorator;
  };

  decorator.formatter = function defaultFormatter(this: CoreInternalElement<unknown>, value) {
    return convertAnyToNumber.call(this, value, decorator);
  };

  return decorator;
}

/**
 * Convert any type of value to a number.
 *
 * @description
 * `null` and `''` will be treated as `undefined`, and return fallback value.
 */
function convertAnyToNumber(
  this: CoreInternalElement<unknown>,
  value: unknown,
  decorator: InternalPropertyNumberDecorator,
): number | undefined {
  /**
   * - Number('') === 0
   * - Number(null) === 0
   */
  if (value === null || value === undefined || value === '') {
    return decorator.fallbackValue;
  }

  const numberifiedValue = Number(value);

  if (decorator.oneOf) {
    if (decorator.oneOf.indexOf(numberifiedValue) >= 0) {
      return numberifiedValue;
    }

    // return fallback one while value is invalid
    return decorator.fallbackValue;
  }

  return Number.isNaN(numberifiedValue) ? decorator.fallbackValue : numberifiedValue;
}
