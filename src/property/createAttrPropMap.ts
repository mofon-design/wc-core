import { NonFunctionPropertyKeys, PropertyDecoratorMap } from '../types/index';
import { makeSureCorePropertiesExist } from '../tag/makeSureCorePropertiesExist';
import { setPropertyValue } from './accessPropertyValue';

/**
 * Initialize the mapping of HTML attribute names to class property keys for custom elements,
 * and assign `fallbackValue` to `CoreInternalElement.prototype.properties[propertyKey]` as
 * initial value of property.
 *
 * @param customAttribute HTML attribute name, the default value is `propertyName`.
 * When the type of `attribute` is not string, such as number or symbol, the value will be
 * converted to `${typeof attribute}-${String(propertyName)}`.
 */
export function createAttrPropMap<T>(
  UnsafeProtoType: T,
  unknownPropertyKey: string | number | symbol,
  customAttribute: string | number | symbol = unknownPropertyKey,
  decorator: PropertyDecoratorMap[keyof PropertyDecoratorMap],
) {
  const ProtoType = makeSureCorePropertiesExist<T>(UnsafeProtoType);

  const propertyKey = unknownPropertyKey as NonFunctionPropertyKeys<T>;

  const attributeName =
    typeof customAttribute === 'string'
      ? customAttribute
      : (typeof customAttribute).concat('-', String(customAttribute));

  /** map HTML attribute name to class property key */
  ProtoType.mapAttrsToProps[attributeName] = propertyKey;

  /** use `fallbackValue` as initial property */
  setPropertyValue(ProtoType, propertyKey, decorator.fallbackValue as any);

  return [propertyKey, attributeName] as const;
}
