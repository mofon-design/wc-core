import {
  CoreElementConstructor,
  CoreElementStage,
  CoreInternalElementConstructor,
} from '../types/index';

/**
 * Property decorator always fired before element class decorator, so it is necessary
 * to check whether the necessary properties have been initialized.
 */
export function makeSureCorePropertiesExist<T extends CoreElementConstructor>(
  unsafeTarget: T,
): CoreInternalElementConstructor<InstanceType<T>> {
  const target = (unsafeTarget as {}) as CoreInternalElementConstructor<InstanceType<T>>;

  if (!('mapAttrsToProps' in target)) {
    Object.defineProperty(target, 'mapAttrsToProps', {
      value: {},
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  if (!('observedAttributes' in target)) {
    Object.defineProperty(target, 'observedAttributes', {
      configurable: true,
      enumerable: true,
      get() {
        return Object.keys(target.mapAttrsToProps);
      },
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
      value: CoreElementStage.NULL,
      configurable: true,
      enumerable: false,
      writable: true,
    });
  }

  return target;
}
