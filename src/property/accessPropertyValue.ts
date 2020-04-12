/**
 * There are two situations:
 * - `prototype.properties`: `self` will refer to prototype.
 *
 * It is expected that `__properties` in the prototype is a constant which stores
 * the fallback value, and the prototype of the child class will shallow copy
 * a new `__properties` instead of maintaining a reference to the parent one.
 *
 * - `instance.properties`: `self` will refer to instance.
 *
 * To avoid tampering with the prototype `__properties`, `__properties` of each instance
 * is a shallow copy from its own prototype,
 */

/* eslint-disable no-param-reassign */
import { PropertiesKey } from '../tag/privatePropertiesKey';
import { CoreInternalElement, NonFunctionPropertyKeys } from '../types/index';

export function getPropertyValue<T, U extends NonFunctionPropertyKeys<T>>(
  self: CoreInternalElement<T>,
  key: U,
): T[U] | undefined {
  if (!self.hasOwnProperty(PropertiesKey)) {
    self[PropertiesKey] = { ...self[PropertiesKey] };
  }

  return self[PropertiesKey][key];
}

export function setPropertyValue<T, U extends NonFunctionPropertyKeys<T>>(
  self: CoreInternalElement<T>,
  key: U,
  value: T[U],
): void {
  if (!self.hasOwnProperty(PropertiesKey)) {
    self[PropertiesKey] = { ...self[PropertiesKey] };
  }

  self[PropertiesKey][key] = value;
}
