import { CoreElementStage, CoreInternalElement, PropertyBooleanDecorator } from '../types/index';
import { createAttrPropMap } from './createAttrPropMap';

export function getPropertyBooleanDecorator(customAttribute?: string): PropertyBooleanDecorator {
  const decorator: PropertyBooleanDecorator = (ProtoType, unknownPropertyKey) => {
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
        // return covertAnyToBoolean(this.getAttribute(attributeName), decorator);
        return this.properties[propertyKey];
      },
      set(this: CoreInternalElement<typeof ProtoType>, booleanLike: unknown) {
        const newValue = covertAnyToBoolean(booleanLike, decorator, this.stage);
        const oldValue = (this.properties[propertyKey] as unknown) as boolean | undefined;

        if (newValue === oldValue) return;
        this.properties[propertyKey] = newValue as any;

        /**
         * Sync property value to HTML attribute before fire `propertyChangedCallback`,
         * to ensure the consistency between them.
         */

        if (this.shouldSyncPropertyToAttribute(propertyKey, oldValue, newValue, attributeName)) {
          if (newValue) {
            this.setAttribute(attributeName, '');
          } else {
            this.removeAttribute(attributeName);
          }
        }

        this.propertyChangedCallback?.(propertyKey, oldValue, newValue);
      },
    });
  };

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
): boolean | undefined {
  if (value === undefined) {
    return decorator.fallbackValue;
  }

  if (typeof value === 'string' && stage & CoreElementStage.SYNC_ATTRIBUTE) {
    return true;
  }

  return Boolean(value);
}
