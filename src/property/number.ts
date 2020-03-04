import { CoreElementStage, CoreInternalElement, PropertyNumberDecorator } from '../types/index';
import { createAttrPropMap } from './createAttrPropMap';

export function getPropertyNumberDecorator(customAttribute?: string): PropertyNumberDecorator {
  const decorator: PropertyNumberDecorator = (ProtoType, unknownPropertyKey) => {
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
        // return covertAnyToNumber(this.getAttribute(attributeName), decorator);
        return this.properties[propertyKey];
      },
      set(this: CoreInternalElement<typeof ProtoType>, numberLike: unknown) {
        // make sure value is not `NaN`
        const newValue = covertAnyToNumber(numberLike, decorator);
        const oldValue = (this.properties[propertyKey] as unknown) as number | undefined;

        if (newValue === oldValue) return;
        this.properties[propertyKey] = newValue as any;

        /**
         * Sync property value to HTML attribute before fire `propertyChangedCallback`,
         * to ensure the consistency between them.
         */

        if (!(this.stage & CoreElementStage.SYNC_PROPERTY)) {
          if (newValue !== undefined) {
            this.setAttribute(attributeName, String(newValue));
          } else {
            this.removeAttribute(attributeName);
          }
        }

        this.propertyChangedCallback?.(propertyKey as any, oldValue, newValue);
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

/**
 * Covert any type of value to a number.
 *
 * @description
 * `null` and `''` will be treated as `undefined`, and return fallback value.
 */
function covertAnyToNumber(value: any, decorator: PropertyNumberDecorator): number | undefined {
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
