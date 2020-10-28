import { LifecyclesKey } from '../shared/privatePropertyKeys';
import { ClassType, CoreElement, CoreElementLifecycle, CoreInternalElement } from '../types';

/**
 * Copy un-decorated lifecycles of class.
 *
 * @description
 * When a custom element is created and inherited from another custom element
 * that has been decorated by the `@tag()` decorator, if any lifecycle
 * of the parent class is fired within the lifecycle of a child class,
 * `super.lifecyle()` cannot be used. Since the lifecycles of the child class
 * and the parent class have been decorated, `super.lifecyle()` will enter
 * the processing logic of the `@tag()` decorator more than once,
 * thus causing some unexpected errors.
 */
export function getUndecoratedLifecycles<T extends ClassType<CoreElement>>(
  Target: T,
): Partial<CoreElementLifecycle> {
  const prototype: Partial<CoreInternalElement> = Target.prototype;
  const undecoratedLifecycles: Partial<CoreElementLifecycle> = {};

  if (Object.prototype.hasOwnProperty.call(prototype, LifecyclesKey) && prototype[LifecyclesKey]) {
    Object.defineProperties(
      undecoratedLifecycles,
      Object.getOwnPropertyDescriptors(prototype[LifecyclesKey]),
    );
  }

  return undecoratedLifecycles;
}
