import { SuperLifecycleKey } from '../shared/privatePropertyKeys';
import { CoreElement, CoreElementLifecycle, CoreInternalElement } from '../types';

export function getSuperCollectedLifecycles<T extends CoreElement>(self: T): Partial<CoreElementLifecycle> {
  return (self as Partial<CoreInternalElement>)[SuperLifecycleKey] ?? {};
}
