import { CoreElementStage, CoreInternalElement, PropertyStringDecorator } from '../types/index';
import { createAttrPropMap } from './createAttrPropMap';

export function getPropertyStringDecorator(customAttribute?: string): PropertyStringDecorator {
  const decorator: PropertyStringDecorator = (Target, unknownPropertyKey) => {
    const [propertyKey, attributeName] = createAttrPropMap(
      Target,
      unknownPropertyKey,
      customAttribute,
    );

    type Instance = CoreInternalElement<InstanceType<typeof Target>>;

    Object.defineProperty(Target.prototype, propertyKey, {
      enumerable: true,
      configurable: true,
      get(this: Instance) {
        // return covertAnyToString(this.getAttribute(attributeName), decorator);
        return this.properties[propertyKey];
      },
      set(this: Instance, stringLike: unknown) {
        const newValue = covertAnyToString(stringLike, decorator);
        const oldValue = (this.properties[propertyKey] as unknown) as string | null;

        if (newValue === oldValue) return;
        this.properties[propertyKey] = newValue as any;

        /**
         * Sync property value to HTML attribute before fire `propertyChangedCallback`,
         * to ensure the consistency between them.
         */

        if (!(this.stage & CoreElementStage.SYNC_PROPERTY)) {
          if (newValue !== null) {
            this.setAttribute(attributeName, newValue);
          } else {
            this.removeAttribute(attributeName);
          }
        }

        this.propertyChangedCallback?.(propertyKey as any, oldValue, newValue);
      },
    });
  };

  decorator.fallbackValue = null;

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

function covertAnyToString(value: any, decorator: PropertyStringDecorator) {
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
