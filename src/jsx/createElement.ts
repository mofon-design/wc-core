/* eslint-disable no-param-reassign */
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
  props = { ...props };

  let children: MDWC.MDWCNode = rest;
  const ref = props[ReservedProperty.REF];
  const key = props[ReservedProperty.KEY];

  delete props[ReservedProperty.KEY];

  // * ASSERT `!children.length || !Object.prototype.hasOwnProperty.call(props, ReservedProperty.CHILDREN)`
  if (!children.length && Object.prototype.hasOwnProperty.call(props, ReservedProperty.CHILDREN)) {
    children = props[ReservedProperty.CHILDREN] as MDWC.MDWCNode;
    delete props[ReservedProperty.CHILDREN];
  }

  return { children, key, props, ref, type };
}
