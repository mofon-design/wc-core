import { CoreElementStage, CoreInternalElement, PropertyBooleanDecorator } from '../types/index';
import { createAttrPropMap } from './createAttrPropMap';

export function getPropertyBooleanDecorator(customAttribute?: string): PropertyBooleanDecorator {
  const decorator: PropertyBooleanDecorator = (Target, unknownPropertyKey) => {
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
        // return covertAnyToBoolean(this.getAttribute(attributeName), decorator);
        return this.properties[propertyKey];
      },
      set(this: Instance, booleanLike: unknown = decorator.defaultValue) {
        const newValue = covertAnyToBoolean(booleanLike, this.stage);
        const oldValue = (this.properties[propertyKey] as unknown) as boolean | null;

        if (newValue === oldValue) return;
        this.properties[propertyKey] = newValue as any;

        /**
         * Sync property value to HTML attribute before fire `propertyChangedCallback`,
         * to ensure the consistency between them.
         */

        if (!(this.stage & CoreElementStage.SYNC_PROPERTY)) {
          if (newValue) {
            this.setAttribute(attributeName, '');
          } else {
            this.removeAttribute(attributeName);
          }
        }

        this.propertyChangedCallback?.(propertyKey as any, oldValue, newValue);
      },
    });
  };

  decorator.defaultValue = null;

  decorator.default = value => {
    decorator.defaultValue = value;
    return decorator;
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
function covertAnyToBoolean(value: any, stage: CoreElementStage) {
  if (typeof value === 'string' && stage & CoreElementStage.SYNC_PROPERTY) {
    return true;
  }

  return Boolean(value);
}
