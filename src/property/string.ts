import {
  CoreInternalElement,
  InternalPropertyStringDecorator,
  PropertyStringDecorator,
} from '../types';
import { getPropertyValue, setPropertyValue } from './accessPropertyValue';
import { createAttrPropMap } from './createAttrPropMap';

export function getPropertyStringDecorator(customAttribute?: string): PropertyStringDecorator {
  const decorator: InternalPropertyStringDecorator = <T>(
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
      set(this: CoreInternalElement<typeof ProtoType>, stringLike: unknown) {
        const newValue = decorator.formatter.call(this, stringLike);
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
    return convertAnyToString.call(this, value, decorator);
  };

  return decorator;
}

function convertAnyToString(
  this: CoreInternalElement<unknown>,
  value: unknown,
  decorator: InternalPropertyStringDecorator,
): string | undefined {
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
