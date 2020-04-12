import { CoreElementStage, CoreInternalElement } from '../types/index';
import { PropertiesKey } from './privatePropertiesKey';

/**
 * Property decorator always fired before element class decorator, so it is necessary
 * to check whether the necessary properties have been initialized.
 */
export function makeSureCorePropertiesExist<T>(UnsafeProtoType: T): CoreInternalElement<T> & T {
  const ProtoType = UnsafeProtoType as CoreInternalElement<T> & T;

  if (!ProtoType.hasOwnProperty('mapAttrsToProps')) {
    Object.defineProperty(ProtoType, 'mapAttrsToProps', {
      value: { ...ProtoType.mapAttrsToProps },
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  if (!('stage' in ProtoType)) {
    Object.defineProperty(ProtoType, 'stage', {
      value: CoreElementStage.NULL,
      configurable: true,
      enumerable: false,
      writable: true,
    });
  }

  if (!('properties' in ProtoType)) {
    Object.defineProperty(ProtoType, 'properties', {
      configurable: true,
      enumerable: false,
      get(this: CoreInternalElement<T>) {
        /* eslint-disable no-underscore-dangle */

        /**
         * There are two situations:
         * - `prototype.properties`: `this` will refer to prototype.
         *
         * It is expected that `__properties` in the prototype is a constant which stores
         * the fallback value, and the prototype of the child class will shallow copy
         * a new `__properties` instead of maintaining a reference to the parent one.
         *
         * - `instance.properties`: `this` will refer to instance.
         *
         * To avoid tampering with the prototype `__properties`, `__properties` of each instance
         * is a shallow copy from its own prototype,
         */

        if (!this.hasOwnProperty(PropertiesKey))
          Object.defineProperty(this, PropertiesKey, {
            value: { ...this[PropertiesKey] },
            configurable: true,
            enumerable: false,
            writable: false,
          });
        return this[PropertiesKey];

        /* eslint-enable no-underscore-dangle */
      },
    });
  }

  return ProtoType;
}
