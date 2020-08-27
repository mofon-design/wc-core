import { MDWC } from '../../../types';

/**
 * If there is a `ref` property, pass or assign a reference of the DOM node to `ref`.
 */
export function applyMDWCRef<T>(ref: MDWC.Ref<T> | undefined, node: T | null): void {
  if (ref === null || ref === undefined) return;

  switch (typeof ref) {
    case 'function':
      ref(node);
      break;
    case 'object':
      // eslint-disable-next-line no-param-reassign
      (ref as MDWC.MutableRefObject<unknown>).current = node;
      break;
    default:
      break;
  }
}
