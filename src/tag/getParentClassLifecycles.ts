import { LifecyclesKey } from '../shared/privatePropertyKeys';
import { ClassType, CoreElement, CoreElementLifecycle, CoreInternalElement } from '../types';

/**
 * Get un-decorated lifecycles of parent class.
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
export function getParentClassLifecycles<T extends ClassType<CoreElement>>(
  ParentClass: T,
): Partial<CoreElementLifecycle> {
  const prototype: Partial<CoreInternalElement> = ParentClass.prototype;

  if (
    !Object.prototype.hasOwnProperty.call(prototype, LifecyclesKey) ||
    !prototype[LifecyclesKey]
  ) {
    return {};
  }

  return prototype[LifecyclesKey]!;
}
