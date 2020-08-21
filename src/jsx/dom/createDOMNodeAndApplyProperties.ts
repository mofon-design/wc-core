import { MDWC } from '../../types/index';
import { isMDWCFragmentType } from '../shared/MDWCFragment';
import { applyMDWCProperties } from './applyMDWCProperties';

/**
 * Create a DOM node based on the information in the `MDWC.MDWCElement` type object and apply properties.
 */
export function createDOMNodeAndApplyProperties(element: MDWC.MDWCElement): Node {
  if (typeof element.type === 'string') {
    const node = document.createElement(element.type);
    applyMDWCProperties(element, node);
    return node;
  }

  if (isMDWCFragmentType(element.type)) {
    return document.createDocumentFragment();
  }

  const node = document.createElement(element.type.tagName!);
  applyMDWCProperties(element, node);
  return node;
}
