import {
  DOMAttributeType,
  NonStringTypeAttributesInfo,
  SpecialAttributesNameMap,
} from '../shared/DOMAttributes';
import { CoreElement } from '../types/tag';

export function createElement(
  type: string | CoreElement,
  props: Record<string, unknown>,
  ...children: MDWC.MDWCNode[]
): MDWC.MDWCElement {
  let propName: string;
  const tagName = typeof type === 'string' ? type : type.tagName;
  const attributes: Record<string, string | null> = {};

  // eslint-disable-next-line guard-for-in
  for (propName in props) {
    if (propName in SpecialAttributesNameMap) {
      propName = SpecialAttributesNameMap[propName];
    }

    if (propName in NonStringTypeAttributesInfo) {
      if (NonStringTypeAttributesInfo[propName].type === DOMAttributeType.BOOLEAN) {
        attributes[propName] = props[propName] ? '' : null;
      } else if (
        NonStringTypeAttributesInfo[propName].type === DOMAttributeType.BOOLEANISH_STRING
      ) {
        attributes[propName] = props[propName] ? 'true' : 'false';
      } else if (
        NonStringTypeAttributesInfo[propName].type === DOMAttributeType.OVERLOADED_BOOLEAN
      ) {
        if (typeof props[propName] === 'boolean') {
          attributes[propName] = props[propName] ? '' : null;
        } else {
          attributes[propName] = `${props[propName]}`;
        }
      } else {
        attributes[propName] = `${props[propName]}`;
      }
    } else {
      attributes[propName] = `${props[propName]}`;
    }
  }

  return { attributes, children, tagName };
}

export { createElement as h };
