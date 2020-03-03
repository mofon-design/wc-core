import { CoreElementStage, CoreInternalElement, PropertyNumberDecorator } from '../types/index';
import { createAttrPropMap } from './createAttrPropMap';

export function getPropertyNumberDecorator(customAttribute?: string): PropertyNumberDecorator {
  const decorator: PropertyNumberDecorator = (target, unknownPropertyKey) => {
    const [propertyKey, attributeName] = createAttrPropMap(
      target,
      unknownPropertyKey,
      customAttribute,
    );

    Object.defineProperty(target, propertyKey, {
      enumerable: true,
      configurable: true,
      get(this: CoreInternalElement<typeof target>) {
        // return covertAnyToNumber(this.getAttribute(attributeName), decorator);
        return this.properties[propertyKey];
      },
      set(this: CoreInternalElement<typeof target>, numberLike: unknown = decorator.defaultValue) {
        // make sure value is not `NaN`
        const newValue = covertAnyToNumber(numberLike, decorator);
        const oldValue = (this.properties[propertyKey] as unknown) as number | null;

        if (newValue === oldValue) return;
        this.properties[propertyKey] = newValue as any;

        /**
         * Sync property value to HTML attribute before fire `propertyChangedCallback`,
         * to ensure the consistency between them.
         */

        if (!(this.stage & CoreElementStage.SYNC_PROPERTY)) {
          if (newValue !== null) {
            this.setAttribute(attributeName, String(newValue));
          } else {
            this.removeAttribute(attributeName);
          }
        }

        this.propertyChangedCallback?.(propertyKey as any, oldValue, newValue);
      },
    });
  };

  decorator.defaultValue = null;

  decorator.optional = () => {
    decorator.isOptional = true;
    return decorator;
  };

  decorator.default = value => {
    decorator.defaultValue = value;
    return decorator;
  };

  decorator.only = (...value) => {
    decorator.oneOf = (decorator.oneOf || []).concat(value);
    return decorator;
  };

  return decorator;
}

function covertAnyToNumber(value: any, decorator: PropertyNumberDecorator) {
  if (value === null && decorator.isOptional) {
    return null;
  }

  const numberifiedValue = Number(value);

  if (decorator.oneOf) {
    if (decorator.oneOf.indexOf(numberifiedValue) >= 0) {
      return numberifiedValue;
    }

    // return default one while value is invalid
    return decorator.defaultValue;
  }

  return Number.isNaN(numberifiedValue) ? null : numberifiedValue;
}
