/* eslint-disable no-underscore-dangle */
import {
  GetSuperLifecyclesKey,
  LifecyclesKey,
  SetElementConnectedKey,
  StageKey,
} from '../shared/privatePropertyKeys';
import { CoreElementStage, CoreInternalElement } from '../types';

/**
 * Define private methods used internally for component class prototypes.
 */
export function definePrivateMethods(Prototype: Partial<CoreInternalElement>): void {
  /**
   * Name the function for locating when an error occurs.
   */
  const privateMethods: ThisType<CoreInternalElement> &
    Pick<CoreInternalElement, '__getSuperLifecycles' | '__setElementConnected'> = {
    __getSuperLifecycles() {
      return { ...super[LifecyclesKey] };
    },
    __setElementConnected() {
      if (this.isConnected) {
        this[StageKey] |= CoreElementStage.CONNECTED;
      } else {
        this[StageKey] &= ~CoreElementStage.CONNECTED;
      }
    },
  };

  Object.defineProperty(Prototype, GetSuperLifecyclesKey, {
    configurable: true,
    enumerable: false,
    value: privateMethods.__getSuperLifecycles,
    writable: false,
  });

  Object.defineProperty(Prototype, SetElementConnectedKey, {
    configurable: true,
    enumerable: false,
    value: privateMethods.__setElementConnected,
    writable: false,
  });
}
