import { makeSurePrototypePropertiesExist } from '../shared/makeSurePrototypePropertiesExist';
import { MapAttrsToPropsKey } from '../shared/privatePropertyKeys';
import { CoreElement, CoreInternalElement } from '../types';

/**
 * Initialize the mapping of HTML attribute names to class property keys for custom elements.
 *
 * @param customAttribute HTML attribute name, the default value is `propertyName`.
 * When the type of `attribute` is not string, such as number or symbol, the value will be
 * converted to `String(propertyName)`.
 *
 * @returns Normalized attribute name.
 */
export function createAttributePropertyMap(
  UnsafePrototype: CoreElement,
  propertyKey: keyof any,
  customAttribute: keyof any = propertyKey,
): string {
  makeSurePrototypePropertiesExist(UnsafePrototype);

  const Prototype = UnsafePrototype as CoreInternalElement;

  // * ASSERT `typeof customAttribute === 'string'`
  const attributeName =
    typeof customAttribute === 'string' ? customAttribute : String(customAttribute);

  /** map HTML attribute name to class property key */
  // * ASSERT `!Object.prototype.hasOwnProperty.call(Prototype[MapAttrsToPropsKey], attributeName)`
  // eslint-disable-next-line no-param-reassign
  Object.defineProperty(Prototype[MapAttrsToPropsKey], attributeName, {
    configurable: true,
    enumerable: true,
    value: propertyKey,
    writable: false,
  });

  return attributeName;
}
