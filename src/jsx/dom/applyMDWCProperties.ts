import { MDWC } from '../../types';
import { ReservedProperty, ReservedPropertiesMap } from '../shared/reservedProperties';
import { setValueForStyles } from './CSSPropertyOperations';
import { setValueForProperty } from './DOMPropertyOperations';
import { applyMDWCElementRef } from './applyMDWCElementRef';

function hasOwnProperty<T, U extends keyof T>(object: T, key: keyof any): key is U {
  return Object.prototype.hasOwnProperty.call(object, key);
}

/**
 * Handle `ref` and apply style and non-reserved attributes to the DOM node.
 */
export function applyMDWCProperties(element: MDWC.MDWCElement, node: HTMLElement): void {
  let propKey: string;
  const props = element.props;

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
