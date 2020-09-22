/* eslint-disable max-classes-per-file */
import { GetSuperLifecyclesKey } from '../shared/privatePropertyKeys';
import { CoreElement, CoreElementLifecycle, CoreInternalElement } from '../types';

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
export function getSuperCollectedLifecycles<T extends CoreElement>(
  self: T,
): Partial<CoreElementLifecycle> {
  return (self as Partial<CoreInternalElement>)[GetSuperLifecyclesKey]?.() ?? {};
}
