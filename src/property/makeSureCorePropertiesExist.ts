import { Constructor, CoreInternalElementConstructor } from '../types/index';

/**
 * Property decorator always fired before element class decorator, so it is necessary
 * to check whether the necessary properties have been initialized.
 */
export function makeSureCorePropertiesExist<T extends Constructor<any>>(
  target: T,
): CoreInternalElementConstructor<InstanceType<T>> & T {
  if (!('mapAttrsToProps' in target)) {
    Object.defineProperty(target, 'mapAttrsToProps', {
      value: {},
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  if (!('properties' in target.prototype)) {
    Object.defineProperty(target.prototype, 'properties', {
      value: {},
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  if (!('stage' in target.prototype)) {
    Object.defineProperty(target.prototype, 'stage', {
      configurable: true,
      enumerable: false,
      writable: true,
    });
  }

  return target as CoreInternalElementConstructor<InstanceType<T>> & T;
}
