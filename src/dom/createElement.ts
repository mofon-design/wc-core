import { CoreElement } from '../types/tag';
import { ReservedProperties } from './reservedProperties';

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
  const key = props[ReservedProperties.KEY];
  const ref = props[ReservedProperties.REF];
  // eslint-disable-next-line no-param-reassign
  delete props[ReservedProperties.KEY];
  // eslint-disable-next-line no-param-reassign
  delete props[ReservedProperties.REF];

  if (!children.length && ReservedProperties.CHILDREN in props) {
    children = props[ReservedProperties.CHILDREN] as MDWC.MDWCNode;
    // eslint-disable-next-line no-param-reassign
    delete props[ReservedProperties.CHILDREN];
  }

  return { children, key, props, ref, tagName };
}

export { createElement as h };
