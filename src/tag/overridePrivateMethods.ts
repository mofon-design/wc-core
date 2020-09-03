import { CoreElementStage, CoreInternalElement, CoreElementConstructor } from '../types';
import { SetElementConnectedKey, StageKey } from './privatePropertiesKey';

/**
 * Add private methods used internally for component class prototypes.
 */
export function overridePrivateMethods(Target: CoreElementConstructor): void {
  const privateMethods = [
    [
      SetElementConnectedKey,
      {
        setElementConnected(this: CoreInternalElement): void {
          if (this.isConnected) {
            this[StageKey] |= CoreElementStage.CONNECTED;
          } else {
            this[StageKey] &= ~CoreElementStage.CONNECTED;
          }
        },
      }.setElementConnected,
    ],
  ] as const;

  privateMethods.forEach(([privateMethodKey, privateMethod]) => {
    Object.defineProperty(Target.prototype, privateMethodKey, {
      configurable: true,
      enumerable: false,
      value: privateMethod,
      writable: false,
    });
  });
}
