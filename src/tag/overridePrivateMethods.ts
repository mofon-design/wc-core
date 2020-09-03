import { SetElementConnectedKey, StageKey } from '../shared/privatePropertiesKey';
import { CoreElementStage, CoreInternalElement } from '../types';

/**
 * Add private methods used internally for component class prototypes.
 */
export function overridePrivateMethods(Prototype: Partial<CoreInternalElement>): void {
  /**
   * Name the function for locating when an error occurs.
   */
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

  let key: typeof privateMethods extends Readonly<Readonly<[infer K, any]>[]> ? K : never;
  let method: typeof privateMethods extends Readonly<Readonly<[any, infer V]>[]> ? V : never;

  for ([key, method] of privateMethods) {
    Object.defineProperty(Prototype, key, {
      configurable: true,
      enumerable: false,
      value: method,
      writable: false,
    });
  }
}
