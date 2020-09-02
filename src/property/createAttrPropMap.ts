import { makeSureCorePropertiesExist } from '../tag/makeSureCorePropertiesExist';
import { MapAttrsToPropsKey } from '../tag/privatePropertiesKey';
import { NonFunctionPropertyKeys, PropertyDecoratorMap } from '../types';
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
): readonly [propertyKey: NonFunctionPropertyKeys<T>, attributeName: string] {
  const ProtoType = makeSureCorePropertiesExist<T>(UnsafeProtoType);

  const propertyKey = unknownPropertyKey as NonFunctionPropertyKeys<T>;

  // * ASSERT `typeof customAttribute === 'string'`
  const attributeName =
    typeof customAttribute === 'string' ? customAttribute : String(customAttribute);

  /** map HTML attribute name to class property key */
  ProtoType[MapAttrsToPropsKey][attributeName] = propertyKey;

  /** use `fallbackValue` as initial property */
  setPropertyValue(ProtoType, propertyKey, decorator.fallbackValue as any);

  return [propertyKey, attributeName];
}
