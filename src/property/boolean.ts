import { CoreElementStage, CoreInternalElement, PropertyBooleanDecorator } from '../types/index';
import { createAttrPropMap } from './createAttrPropMap';

export function getPropertyBooleanDecorator(customAttribute?: string): PropertyBooleanDecorator {
  const decorator: PropertyBooleanDecorator = (target, unknownPropertyKey) => {
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
      set(this: CoreInternalElement<typeof target>, booleanLike: unknown = decorator.defaultValue) {
        const newValue = covertAnyToBoolean(booleanLike, decorator);
        const oldValue = (this.properties[propertyKey] as unknown) as boolean | null;

        if (newValue === oldValue) return;
        this.properties[propertyKey] = newValue as any;
        this.propertyChangedCallback?.(propertyKey as any, oldValue, newValue);

        if (this.stage & CoreElementStage.SYNC_PROPERTY) return;

        if (newValue) {
          this.setAttribute(attributeName, '');
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

  return decorator;
}

function covertAnyToBoolean(value: any, decorator: PropertyBooleanDecorator) {
  if (value === null && decorator.isOptional) {
    return null;
  }

  return Boolean(value);
}
