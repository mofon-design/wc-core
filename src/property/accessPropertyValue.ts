import { PropertiesKey } from '../shared/privatePropertiesKey';
import { CoreElement, CoreInternalElement } from '../types';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function getPropertyValue<T extends CoreElement, U extends keyof any>(
  self: T & CoreInternalElement,
  key: U,
): unknown {
  let properties: CoreInternalElement['__properties'];

  if (hasOwnProperty.call(self, PropertiesKey)) {
    properties = self[PropertiesKey]!;
  } else {
    properties = {};

    Object.defineProperty(self, PropertiesKey, {
      configurable: true,
      enumerable: false,
      value: properties,
      writable: false,
    });
  }

  if (hasOwnProperty.call(properties, key)) {
    return properties[key];
  }
}

export function setPropertyValue<T extends CoreElement, U extends keyof any>(
  self: T & CoreInternalElement,
  key: U,
  value: unknown,
): void {
  let properties: CoreInternalElement['__properties'];

  if (hasOwnProperty.call(self, PropertiesKey)) {
    properties = self[PropertiesKey]!;
  } else {
    properties = {};

    Object.defineProperty(self, PropertiesKey, {
      configurable: true,
      enumerable: false,
      value: properties,
      writable: false,
    });
  }

  properties[key] = value;
}
