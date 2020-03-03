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
  UnsafeTarget: T,
): CoreInternalElementConstructor<InstanceType<T>> {
  const Target = (UnsafeTarget as {}) as CoreInternalElementConstructor<InstanceType<T>>;

  if (!('mapAttrsToProps' in Target)) {
    Object.defineProperty(Target, 'mapAttrsToProps', {
      value: {},
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  if (!('observedAttributes' in Target)) {
    Object.defineProperty(Target, 'observedAttributes', {
      configurable: true,
      enumerable: true,
      get() {
        return Object.keys(Target.mapAttrsToProps);
      },
    });
  }

  if (!('properties' in Target.prototype)) {
    Object.defineProperty(Target.prototype, 'properties', {
      value: {},
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  if (!('stage' in Target.prototype)) {
    Object.defineProperty(Target.prototype, 'stage', {
      value: CoreElementStage.NULL,
      configurable: true,
      enumerable: false,
      writable: true,
    });
  }

  return Target;
}
