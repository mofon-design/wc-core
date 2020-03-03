import { CoreElementStage, CoreInternalElement, PropertyBooleanDecorator } from '../types/index';
import { createAttrPropMap } from './createAttrPropMap';

export function getPropertyBooleanDecorator(customAttribute?: string): PropertyBooleanDecorator {
  const decorator: PropertyBooleanDecorator = (ProtoType, unknownPropertyKey) => {
    const [propertyKey, attributeName] = createAttrPropMap(
      ProtoType,
      unknownPropertyKey,
      customAttribute,
    );

    Object.defineProperty(ProtoType, propertyKey, {
      enumerable: true,
      configurable: true,
      get(this: CoreInternalElement<typeof ProtoType>) {
        // return covertAnyToBoolean(this.getAttribute(attributeName), decorator);
        return this.properties[propertyKey];
      },
      set(this: CoreInternalElement<typeof ProtoType>, booleanLike: unknown) {
        const newValue = covertAnyToBoolean(booleanLike, decorator, this.stage);
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

  decorator.fallbackValue = null;

  decorator.fallback = value => {
    decorator.fallbackValue = value;
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
function covertAnyToBoolean(
  value: any,
  decorator: PropertyBooleanDecorator,
  stage: CoreElementStage,
): boolean | null {
  if (value === undefined) {
    return decorator.fallbackValue;
  }

  if (typeof value === 'string' && stage & CoreElementStage.SYNC_PROPERTY) {
    return true;
  }

  return Boolean(value);
}
