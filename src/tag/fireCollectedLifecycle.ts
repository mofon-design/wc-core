import { LifecyclesKey } from '../shared/privatePropertyKeys';
import { AnyFunction, ArgsType, CoreElementLifecycle, CoreInternalElement } from '../types';

declare const NOT_EXISTS: unique symbol;

/**
 * Fire the original lifecycle that has not been wrapped by the decorator.
 */
export function fireCollectedLifecycle<T extends keyof CoreElementLifecycle>(
  self: CoreInternalElement,
  lifecycleKey: T,
  args: ArgsType<Required<CoreElementLifecycle>[T]>,
): ReturnType<Required<CoreElementLifecycle>[T]> | typeof NOT_EXISTS {
  const lifecycle = self[LifecyclesKey];

  if (
    !lifecycle ||
    !Object.prototype.hasOwnProperty.call(lifecycle, lifecycleKey) ||
    !lifecycle[lifecycleKey]
  ) {
    return fireCollectedLifecycle.NOT_EXISTS;
  }

  return (lifecycle[lifecycleKey] as AnyFunction).apply(self, args);
}

fireCollectedLifecycle.NOT_EXISTS = {} as typeof NOT_EXISTS;

fireCollectedLifecycle.isExists = <T>(value: T | typeof NOT_EXISTS): value is T =>
  value !== fireCollectedLifecycle.NOT_EXISTS;
