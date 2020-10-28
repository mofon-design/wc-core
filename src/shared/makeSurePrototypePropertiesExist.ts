import { assignOwnProperties } from '../helpers/Object.assignOwnProperties';
import { CoreElementStage, CoreInternalElement } from '../types';
import { MapAttrsToPropsKey, StageKey } from './privatePropertyKeys';

/**
 * Make sure that the necessary properties of the prototype already exist.
 * The initial property values of the instance also need to be defined on the prototype.
 *
 * @description
 * Property decorator always fired before element class decorator, so it is necessary
 * to check whether the necessary properties have been initialized.
 */
export function makeSurePrototypePropertiesExist(Prototype: Partial<CoreInternalElement>): void {
  if (!Object.prototype.hasOwnProperty.call(Prototype, MapAttrsToPropsKey)) {
    const mapAttrsToProps: CoreInternalElement['__mapAttrsToProps'] = Object.create(null);

    if (Prototype[MapAttrsToPropsKey]) {
      assignOwnProperties(mapAttrsToProps, Prototype[MapAttrsToPropsKey]);
    }

    Object.defineProperty(Prototype, MapAttrsToPropsKey, {
      value: mapAttrsToProps,
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  if (!(StageKey in Prototype)) {
    Object.defineProperty(Prototype, StageKey, {
      value: CoreElementStage.NULL,
      configurable: true,
      enumerable: false,
      writable: true,
    });
  }
}
