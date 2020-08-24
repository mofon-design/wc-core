import { MDWC } from '../../types';
import { Children } from '../children';
import { isMDWCFragmentType } from '../shared/MDWCFragment';

/**
 * Take an MDWC node and build it into a virtual DOM tree for diff.
 */
export function buildVirtualDOMTree(input: MDWC.MDWCNode): VirtualDOMTreeChildren {
  const root: VirtualDOMTreeChildren = [];

  let top: QueueItem | undefined;
  let node: VirtualDOMTreeNode;
  let element: MDWC.MDWCElement | MDWC.MDWCText;
  const queue: QueueItem[] = [{ origin: Children.toArray(input), target: root }];

  // eslint-disable-next-line no-cond-assign
  while ((top = queue.shift())) {
    for (element of top.origin) {
      if (typeof element !== 'object') {
        top.target.push(`${element}`);
        continue;
      }

      node = {
        ...element,
        children: [],
        key: formatMDWCElementKey(element),
      };

      queue.push({
        origin: Children.toArray(element.children),
        target: node.children,
      });

      top.target.push(node);
    }
  }

  return root;
}

function formatMDWCElementKey(element: MDWC.MDWCElement): string {
  let key: string;
  let type: string;

  switch (typeof element.key) {
    case 'undefined':
      key = '0:';
      break;
    case 'string':
      key = `1:${element.key}`;
      break;
    case 'number':
      key = `2:${element.key}`;
      break;
    default:
      if (element.key === null) {
        key = '0:';
      } else {
        key = `3:${element.key}`;
      }
      break;
  }

  switch (typeof element.type) {
    case 'string':
      // type = `$string:${element.type}`;
      type = `0:${element.type}`;
      break;
    default:
      if (isMDWCFragmentType(element.type)) {
        // type = `$builtin:fragment`;
        type = '1:fragment';
      } else {
        // type = `$custom:${element.type.tagName}`;
        type = `2:${element.type.tagName}`;
      }
      break;
  }

  return `${type}:${key}`;
}

export type VirtualDOMTreeChildNode = VirtualDOMTreeNode | string;
export type VirtualDOMTreeChildren = VirtualDOMTreeChildNode[];

export interface VirtualDOMTreeNode extends Omit<MDWC.MDWCElement, 'children' | 'key'> {
  children: VirtualDOMTreeChildren;
  key: string;
}

interface QueueItem {
  origin: (MDWC.MDWCElement | MDWC.MDWCText)[];
  target: VirtualDOMTreeChildren;
}
