import { MDWC } from '../../../types';
import { Children } from '../../children';
import { isMDWCFragmentType } from '../../shared/MDWCFragment';
import { attachHybridDOMTreeFromMDWCNode } from './attachHybridDOMTreeFromMDWCNode';
import { createHybridDOMTreeChildNode } from './createHybridDOMTreeChildNode';
import { formatMDWCKey } from './formatMDWCKey';
import {
  HybridDOMTreeKeyNodeMap,
  createHybridDOMTreeKeyNodeMap,
  shiftHybridDOMTreeNodeFromKeyNodeMap,
  shiftRestNodesOfHybridDOMTreeKeyNodeMap,
} from './keyNodeMap';
import {
  DiffQueueItem,
  DiffType,
  HybridDOMTreeChildNode,
  HybridDOMTreeNodeType,
  HybridDOMTreeParentNode,
  HybridDOMTreeRootNode,
} from './types';

/**
 * Take an MDWC node and build it into a hybrid DOM tree,
 * and compare it with the old one to get the update task queue.
 */
export function diffHybridDOMTree(
  input: MDWC.MDWCNode,
  container: Node,
  prevTree?: HybridDOMTreeParentNode,
): [DiffQueueItem[], HybridDOMTreeParentNode] {
  const diffQueue: DiffQueueItem[] = [];
  const nextTree: HybridDOMTreeRootNode = {
    children: [],
    instance: container,
    type: HybridDOMTreeNodeType.ROOT,
  };
  const queue: TraversalQueueItem[] = [
    { prevTree, nextTree, nonEmptyMDWCNodes: Children.toArray(input) },
  ];

  let top: TraversalQueueItem | undefined;
  let keyNodeMap: HybridDOMTreeKeyNodeMap;

  let index: number;
  let node: HybridDOMTreeChildNode;
  let lastIndex: number | undefined;
  let parent: HybridDOMTreeParentNode;
  let removedNodes: HybridDOMTreeChildNode[];
  let existsNode: HybridDOMTreeChildNode | undefined;
  let nonEmptyMDWCNode: MDWC.MDWCElement | MDWC.MDWCText;

  let key: string;
  let tagName: string;
  let textContent: string;

  // eslint-disable-next-line no-cond-assign
  while ((top = queue.shift())) {
    parent = top.nextTree;
    keyNodeMap = createHybridDOMTreeKeyNodeMap(top.prevTree ? top.prevTree.children : []);

    for (index = 0; index < top.nonEmptyMDWCNodes.length; index += 1) {
      nonEmptyMDWCNode = top.nonEmptyMDWCNodes[index];

      if (typeof nonEmptyMDWCNode !== 'object') {
        textContent = `${nonEmptyMDWCNode}`;
        [existsNode, lastIndex] =
          shiftHybridDOMTreeNodeFromKeyNodeMap(
            keyNodeMap,
            HybridDOMTreeNodeType.TEXT,
            textContent,
          ) || [];

        node = createHybridDOMTreeChildNode(HybridDOMTreeNodeType.TEXT, {
          instance:
            existsNode === undefined ? document.createTextNode(textContent) : existsNode.instance,
          parent,
          textContent,
        });

        if (existsNode === undefined || lastIndex === undefined) {
          diffQueue.push({ node, type: DiffType.INSERT });
        } else if (lastIndex < index) {
          diffQueue.push({ node, type: DiffType.MOVE });
        }

        parent.children.push(node);
        continue;
      }

      key = formatMDWCKey(nonEmptyMDWCNode.key);

      if (isMDWCFragmentType(nonEmptyMDWCNode.type)) {
        [existsNode, lastIndex] =
          shiftHybridDOMTreeNodeFromKeyNodeMap(keyNodeMap, HybridDOMTreeNodeType.FRAGMENT, key) ||
          [];

        node = createHybridDOMTreeChildNode(HybridDOMTreeNodeType.FRAGMENT, {
          children: [],
          key,
          parent,
        });
      } else {
        // * ASSERT `element.type.tagName`
        tagName =
          typeof nonEmptyMDWCNode.type === 'string'
            ? nonEmptyMDWCNode.type
            : nonEmptyMDWCNode.type.tagName!;

        [existsNode, lastIndex] =
          shiftHybridDOMTreeNodeFromKeyNodeMap(
            keyNodeMap,
            HybridDOMTreeNodeType.HTML_ELEMENT,
            tagName,
            key,
          ) || [];

        node = createHybridDOMTreeChildNode(HybridDOMTreeNodeType.HTML_ELEMENT, {
          children: [],
          instance:
            existsNode === undefined ? document.createElement(tagName) : existsNode.instance,
          key,
          parent,
          props: nonEmptyMDWCNode.props,
          ref: nonEmptyMDWCNode.ref,
          style: nonEmptyMDWCNode.style,
          tagName,
        });
      }

      if (existsNode === undefined || lastIndex === undefined) {
        attachHybridDOMTreeFromMDWCNode(nonEmptyMDWCNode.children, node);
        diffQueue.push({ node, type: DiffType.INSERT });
      } else {
        // TODO property diff

        if (lastIndex < index) {
          diffQueue.push({ node, type: DiffType.MOVE });
        }

        queue.push({
          prevTree: existsNode,
          nextTree: node,
          nonEmptyMDWCNodes: Children.toArray(nonEmptyMDWCNode.children),
        });
      }

      parent.children.push(node);
    }

    removedNodes = shiftRestNodesOfHybridDOMTreeKeyNodeMap(keyNodeMap);

    for (node of removedNodes) {
      diffQueue.push({ node, type: DiffType.REMOVE });
    }
  }

  return [diffQueue, nextTree];
}

interface TraversalQueueItem {
  readonly prevTree?: HybridDOMTreeParentNode;
  readonly nextTree: HybridDOMTreeParentNode;
  readonly nonEmptyMDWCNodes: readonly (MDWC.MDWCElement | MDWC.MDWCText)[];
}
