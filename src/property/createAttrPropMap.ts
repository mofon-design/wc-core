import { makeSureCorePropertiesExist } from '../tag/makeSureCorePropertiesExist';
import { MapAttrsToPropsKey } from '../tag/privatePropertiesKey';
import { CoreInternalElement } from '../types';

/**
 * Initialize the mapping of HTML attribute names to class property keys for custom elements,
 * and assign `fallbackValue` to `CoreInternalElement.prototype.properties[propertyKey]` as
 * initial value of property.
 *
 * @param customAttribute HTML attribute name, the default value is `propertyName`.
 * When the type of `attribute` is not string, such as number or symbol, the value will be
 * converted to `${typeof attribute}-${String(propertyName)}`.
 */
export function createAttrPropMap<T extends CoreInternalElement>(
  ProtoType: T,
  propertyKey: keyof any,
  customAttribute: keyof any = propertyKey,
): readonly [propertyKey: keyof any, attributeName: string] {
  makeSureCorePropertiesExist(ProtoType);

  // * ASSERT `typeof customAttribute === 'string'`
  const attributeName =
    typeof customAttribute === 'string' ? customAttribute : String(customAttribute);

  /** map HTML attribute name to class property key */
  // * ASSERT `!Object.prototype.hasOwnProperty.call(ProtoType[MapAttrsToPropsKey], attributeName)`
  // eslint-disable-next-line no-param-reassign
  ProtoType[MapAttrsToPropsKey][attributeName] = propertyKey;

  return [propertyKey, attributeName];
}
