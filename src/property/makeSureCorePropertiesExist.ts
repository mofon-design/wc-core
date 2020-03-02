import { CoreElement } from '../types/index';

/**
 * Property decorator always fired before element class decorator, so it is necessary
 * to check whether the necessary properties have been initialized.
 */
export function makeSureCorePropertiesExist<T>(instance: Partial<CoreElement<T>>) {
  if (!('mapAttrsToProps' in instance)) {
    Object.defineProperty(instance, 'mapAttrsToProps', {
      value: {},
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  if (!('properties' in instance)) {
    Object.defineProperty(instance, 'properties', {
      value: {},
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  if (!('stage' in instance)) {
    Object.defineProperty(instance, 'stage', {
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }
}
