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
import { CoreInternalElement, NonFunctionPropertyKeys } from '../types';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function getPropertyValue<T, U extends NonFunctionPropertyKeys<T>>(
  self: CoreInternalElement<T>,
  key: U,
): T[U] | undefined {
  makeSurePrivatePropertiesStoreExists(self);

  if (!hasOwnProperty.call(self[PropertiesKey], key)) {
    return undefined;
  }

  return self[PropertiesKey][key];
}

export function setPropertyValue<T, U extends NonFunctionPropertyKeys<T>>(
  self: CoreInternalElement<T>,
  key: U,
  value: T[U],
): void {
  makeSurePrivatePropertiesStoreExists(self);

  self[PropertiesKey][key] = value;
}

function makeSurePrivatePropertiesStoreExists<T>(self: CoreInternalElement<T>): void {
  if (!hasOwnProperty.call(self, PropertiesKey)) {
    Object.defineProperty(self, PropertiesKey, {
      configurable: true,
      enumerable: false,
      value: { ...self[PropertiesKey] },
      writable: true,
    });
  }
}
