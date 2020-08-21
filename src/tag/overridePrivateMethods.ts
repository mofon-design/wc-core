import { CoreElementStage, CoreInternalElement, CoreElementConstructor } from '../types';
import { SetElementConnectedKey } from './privatePropertiesKey';

/**
 * Add private methods used internally for component class prototypes.
 */
export function overridePrivateMethods<T extends string, U extends CoreElementConstructor<T>>(
  Target: U,
): void {
  const privateMethods = [
    [
      SetElementConnectedKey,
      {
        setElementConnected(this: CoreInternalElement<InstanceType<U>>): void {
          if (this.isConnected) {
            this.stage |= CoreElementStage.CONNECTED;
          } else {
            this.stage &= ~CoreElementStage.CONNECTED;
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
