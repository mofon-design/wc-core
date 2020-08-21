import { MDWC } from '../../types';
import { ReservedProperty, ReservedPropertiesMap } from '../shared/reservedProperties';
import { setValueForStyles } from './CSSPropertyOperations';
import { setValueForProperty } from './DOMPropertyOperations';

function hasOwnProperty<T, U extends keyof T>(object: T, key: keyof any): key is U {
  return Object.prototype.hasOwnProperty.call(object, key);
}

/**
 * Handle `ref` and apply style and non-reserved attributes to the DOM node.
 */
export function applyMDWCProperties(element: MDWC.MDWCElement, node: HTMLElement): void {
  let propKey: string;
  const { props } = element;

  for (propKey in props) {
    if (!hasOwnProperty(props, propKey)) {
      continue;
    }

    if (propKey === ReservedProperty.STYLE) {
      setValueForStyles(node, props[propKey]);
      continue;
    }

    if (hasOwnProperty(ReservedPropertiesMap, propKey)) {
      continue;
    }

    setValueForProperty(node, propKey, props[propKey]);
  }

  applyMDWCElementRef(element, node);
}

/**
 * If there is a `ref` property, pass or assign a reference of the DOM node to `ref`.
 */
function applyMDWCElementRef(element: MDWC.MDWCElement, node: Node): void {
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
