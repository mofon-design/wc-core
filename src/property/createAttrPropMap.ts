import { CoreInternalElement, NonFunctionPropertyKeys } from '../types/index';
import { makeSureCorePropertiesExist } from './makeSureCorePropertiesExist';

/**
 * Initialize the mapping of HTML attribute names to class property keys for custom elements.
 *
 * @param customAttribute HTML attribute name, the default value is `propertyName`.
 * When the type of `attribute` is not string, such as number or symbol, the value will be
 * converted to `${typeof attribute}-${String(propertyName)}`.
 */
export function createAttrPropMap<T>(
  unsafeInstance: T,
  unknownPropertyKey: string | number | symbol,
  customAttribute: string | number | symbol = unknownPropertyKey,
) {
  const instance = makeSureCorePropertiesExist(
    unsafeInstance as Partial<CoreInternalElement<T>> & T,
  );

  const propertyKey = unknownPropertyKey as NonFunctionPropertyKeys<T>;

  const attributeName =
    typeof customAttribute === 'string'
      ? customAttribute
      : (typeof customAttribute).concat('-', String(customAttribute));

  instance.mapAttrsToProps[attributeName] = propertyKey;

  return [propertyKey, attributeName] as const;
}
