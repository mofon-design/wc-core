import { CoreElement } from '../types/tag';
import { ReservedProperty } from './reservedProperties';

/**
 * Create a WDWC element.
 * @returns An ordinary object, which will eventually be mapped to the DOM tree by MDWC.
 */
export function createElement(
  type: string | CoreElement,
  props: MDWC.Props<unknown> & Record<keyof any, unknown>,
  ...rest: MDWC.MDWCNode[]
): MDWC.MDWCElement {
  let children: MDWC.MDWCNode = rest;
  const tagName = typeof type === 'string' ? type : type.tagName;
  const key = props[ReservedProperty.KEY];
  const ref = props[ReservedProperty.REF];
  // // eslint-disable-next-line no-param-reassign
  // delete props[ReservedProperty.KEY];
  // // eslint-disable-next-line no-param-reassign
  // delete props[ReservedProperty.REF];

  if (!children.length && ReservedProperty.CHILDREN in props) {
    children = props[ReservedProperty.CHILDREN] as MDWC.MDWCNode;
    // // eslint-disable-next-line no-param-reassign
    // delete props[ReservedProperty.CHILDREN];
  }

  return { children, key, props, ref, tagName };
}

export { createElement as h };
