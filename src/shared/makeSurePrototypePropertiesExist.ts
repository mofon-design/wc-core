import { CoreElementStage, CoreInternalElement } from '../types';
import { MapAttrsToPropsKey, StageKey } from './privatePropertiesKey';

/**
 * Make sure that the necessary properties of the prototype already exist.
 * The initial property values of the instance also need to be defined on the prototype.
 *
 * @description
 * Property decorator always fired before element class decorator, so it is necessary
 * to check whether the necessary properties have been initialized.
 */
export function makeSurePrototypePropertiesExist<T extends CoreInternalElement>(
  ProtoType: T,
): void {
  if (!Object.prototype.hasOwnProperty.call(ProtoType, MapAttrsToPropsKey)) {
    Object.defineProperty(ProtoType, MapAttrsToPropsKey, {
      value: { ...ProtoType[MapAttrsToPropsKey] },
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  if (!(StageKey in ProtoType)) {
    Object.defineProperty(ProtoType, StageKey, {
      value: CoreElementStage.NULL,
      configurable: true,
      enumerable: false,
      writable: true,
    });
  }
}
