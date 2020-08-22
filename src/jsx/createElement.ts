import { MDWC } from '../types';
import { ReservedProperty } from './shared/reservedProperties';

/**
 * Create a WDWC element.
 * @returns An ordinary object, which will eventually be mapped to the DOM tree by MDWC.
 */
export function createElement(
  type: MDWC.MDWCElementType,
  props: (MDWC.Props<unknown> & Record<keyof any, unknown>) | null,
  ...rest: MDWC.MDWCNode[]
): MDWC.MDWCElement {
  // eslint-disable-next-line no-param-reassign
  props = props ?? {};

  let children: MDWC.MDWCNode = rest;
  const ref = props[ReservedProperty.REF];
  // const style = props[ReservedProperty.STYLE];
  // // eslint-disable-next-line no-param-reassign
  // delete props[ReservedProperty.REF];
  // // eslint-disable-next-line no-param-reassign
  // delete props[ReservedProperty.STYLE];

  if (!children.length && ReservedProperty.CHILDREN in props) {
    children = props[ReservedProperty.CHILDREN] as MDWC.MDWCNode;
    // // eslint-disable-next-line no-param-reassign
    // delete props[ReservedProperty.CHILDREN];
  }

  return { children, props, ref, type };
}
