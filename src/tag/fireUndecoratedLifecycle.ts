import { LifecyclesKey } from '../shared/privatePropertyKeys';
import { AnyFunction, ArgsType, CoreElementLifecycle, CoreInternalElement } from '../types';

declare const NOT_EXISTS: unique symbol;

/**
 * Fire the undecorated lifecycle that has not been wrapped by the decorator.
 */
export function fireUndecoratedLifecycle<T extends keyof CoreElementLifecycle>(
  self: CoreInternalElement,
  lifecycleKey: T,
  args: ArgsType<Required<CoreElementLifecycle>[T]>,
): ReturnType<Required<CoreElementLifecycle>[T]> | typeof NOT_EXISTS {
  const lifecycle = self[LifecyclesKey];

  if (!lifecycle || !lifecycle[lifecycleKey]) {
    return fireUndecoratedLifecycle.NOT_EXISTS;
  }

  return (lifecycle[lifecycleKey] as AnyFunction).apply(self, args);
}

fireUndecoratedLifecycle.NOT_EXISTS = {} as typeof NOT_EXISTS;

fireUndecoratedLifecycle.isExists = <T>(value: T | typeof NOT_EXISTS): value is T =>
  value !== fireUndecoratedLifecycle.NOT_EXISTS;
