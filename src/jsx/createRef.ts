import { MDWC } from '../types';

/**
 * Create a `RefObject` that can be passed to the `ref` attribute of the jsx element
 * to get the corresponding DOM element.
 * @returns An immutable object with a single readonly value.
 */
export function createRef<T = unknown>(): MDWC.RefObject<T> {
  const refObject: MDWC.RefObject<T> = { current: null };
  // Object.seal(refObject);
  return refObject;
}
