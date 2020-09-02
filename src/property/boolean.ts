import { StageKey } from '../tag/privatePropertiesKey';
import {
  CoreElementStage,
  CoreInternalElement,
  InternalPropertyBooleanDecorator,
  PropertyBooleanDecorator,
} from '../types';
import { getPropertyValue, setPropertyValue } from './accessPropertyValue';
import { createAttrPropMap } from './createAttrPropMap';

export function getPropertyBooleanDecorator(customAttribute?: string): PropertyBooleanDecorator {
  const decorator: InternalPropertyBooleanDecorator = <T>(
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
      set(this: CoreInternalElement<typeof ProtoType>, booleanLike: unknown) {
        const newValue = decorator.formatter.call(this, booleanLike);
        const oldValue = (getPropertyValue(this, propertyKey) as unknown) as boolean | undefined;

        if (newValue === oldValue) return;
        setPropertyValue(this, propertyKey, newValue as any);

        /**
         * Sync property value to HTML attribute before fire `propertyChangedCallback`,
         * to ensure the consistency between them.
         */

        if (
          !(this[StageKey] & CoreElementStage.SYNC_ATTRIBUTE) &&
          this[StageKey] & CoreElementStage.INITIALIZED
        ) {
          if (newValue) {
            this.setAttribute(attributeName, '');
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

  decorator.formatter = function defaultFormatter(this: CoreInternalElement<unknown>, value) {
    return convertAnyToBoolean.call(this, value, decorator);
  };

  return decorator;
}

/**
 * If the current value is an HTML attribute value,
 * the empty string is also treated as true.
 *
 * @example
 * ```html
 * <my-element>False</my-element>
 * <my-element bool-attribute>True</my-element>
 * <my-element bool-attribute="">True</my-element>
 * ```
 */
function convertAnyToBoolean(
  this: CoreInternalElement<unknown>,
  value: unknown,
  decorator: InternalPropertyBooleanDecorator,
): boolean | undefined {
  if (value === undefined) {
    return decorator.fallbackValue;
  }

  if (typeof value === 'string' && this[StageKey] & CoreElementStage.SYNC_ATTRIBUTE) {
    return true;
  }

  return Boolean(value);
}
