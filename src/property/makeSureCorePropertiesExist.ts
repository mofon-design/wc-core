import { CoreElementStage, CoreInternalElement } from '../types/index';

/**
 * Property decorator always fired before element class decorator, so it is necessary
 * to check whether the necessary properties have been initialized.
 */
export function makeSureCorePropertiesExist<T>(UnsafeProtoType: T): CoreInternalElement<T> & T {
  const ProtoType = UnsafeProtoType as CoreInternalElement<T> & T;

  if (!('mapAttrsToProps' in ProtoType)) {
    Object.defineProperty(ProtoType, 'mapAttrsToProps', {
      value: {},
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  if (!('properties' in ProtoType)) {
    Object.defineProperty(ProtoType, 'properties', {
      value: {},
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

  return ProtoType;
}
