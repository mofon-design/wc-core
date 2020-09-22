/* eslint-disable no-underscore-dangle */
import { SetElementConnectedKey, StageKey } from '../shared/privatePropertyKeys';
import { CoreElementStage, CoreInternalElement } from '../types';

/**
 * Define private methods used internally for component class prototypes.
 */
export function definePrivateMethods(Prototype: Partial<CoreInternalElement>): void {
  /**
   * Name the function for locating when an error occurs.
   */
  const privateMethods: ThisType<CoreInternalElement> &
    Pick<CoreInternalElement, '__setElementConnected'> = {
    __setElementConnected() {
      if (this.isConnected) {
        this[StageKey] |= CoreElementStage.CONNECTED;
      } else {
        this[StageKey] &= ~CoreElementStage.CONNECTED;
      }
    },
  };

  Object.defineProperty(Prototype, SetElementConnectedKey, {
    configurable: true,
    enumerable: false,
    value: privateMethods.__setElementConnected,
    writable: false,
  });
}
