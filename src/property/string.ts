import { CoreElementStage, CoreInternalElement, PropertyStringDecorator } from '../types/index';
import { createAttrPropMap } from './createAttrPropMap';

export function getPropertyStringDecorator(customAttribute?: string): PropertyStringDecorator {
  const decorator: PropertyStringDecorator = (target, unknownPropertyKey) => {
    const [propertyKey, attributeName] = createAttrPropMap(
      target,
      unknownPropertyKey,
      customAttribute,
    );

    Object.defineProperty(target, propertyKey, {
      enumerable: true,
      configurable: true,
      get(this: CoreInternalElement<typeof target>) {
        return this.properties[propertyKey];
      },
      set(this: CoreInternalElement<typeof target>, stringLike: unknown = decorator.defaultValue) {
        const newValue = covertAnyToString(stringLike, decorator);
        const oldValue = (this.properties[propertyKey] as unknown) as string | null;

        if (newValue === oldValue) return;
        this.properties[propertyKey] = newValue as any;
        this.propertyChangedCallback?.(propertyKey as any, oldValue, newValue);

        if (this.stage & CoreElementStage.ATTRIBUTE_CHANGED) return;

        if (newValue !== null) {
          this.setAttribute(attributeName, newValue);
        } else {
          this.removeAttribute(attributeName);
        }
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

function covertAnyToString(value: any, decorator: PropertyStringDecorator) {
  if (value === null && decorator.isOptional) {
    return null;
  }

  const stringifiedValue = value ? String(value) : '';

  if (decorator.oneOf) {
    if (decorator.oneOf.indexOf(stringifiedValue) >= 0) {
      return stringifiedValue;
    }

    // return default one while value is invalid
    return decorator.defaultValue;
  }

  return stringifiedValue;
}
