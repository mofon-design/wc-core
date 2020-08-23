import { MDWC } from '../../types';

/**
 * If there is a `ref` property, pass or assign a reference of the DOM node to `ref`.
 */
export function applyMDWCElementRef(element: MDWC.MDWCElement, node: Node | null): void {
  if (element.ref === null || element.ref === undefined) return;

  switch (typeof element.ref) {
    case 'function':
      element.ref(node);
      break;
    case 'object':
      // eslint-disable-next-line no-param-reassign
      (element.ref as MDWC.MutableRefObject<unknown>).current = node;
      break;
    default:
      break;
  }
}
