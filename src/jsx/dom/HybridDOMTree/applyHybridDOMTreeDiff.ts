import { ArgsType } from '../../../types';
import { applyMDWCRef } from './applyMDWCRef';
import { applyProperties, applyPropertyUpdateQueue } from './applyProperties';
import { DiffQueueItem, DiffType, HybridDOMTreeChildNode, HybridDOMTreeNodeType } from './types';

/**
 * Apply the comparison results of next hybrid DOM tree and the old one
 * to the browser DOM tree, and update the reference to the browser DOM tree node.
 */
export function applyHybridDOMTreeDiff(queue: DiffQueueItem[]): void {
  const fragment = document.createDocumentFragment();
  const refUpdatesQueue: ArgsType<typeof applyMDWCRef>[] = [];

  let instance: Node;
  let parentInstance: Node;
  let childInstances: Node[];
  let nextSiblingInstance: Node | null;

  let payload: DiffQueueItem;
  let node: HybridDOMTreeChildNode;
  let childrenQueue: HybridDOMTreeChildNode[];
  let child: HybridDOMTreeChildNode | undefined;
  let children: readonly HybridDOMTreeChildNode[];
  let refUpdate: ArgsType<typeof applyMDWCRef>;
  let refUpdatesQueueFragment: ArgsType<typeof applyMDWCRef>[];
  let childrenAndParentInstanceQueue: [readonly HybridDOMTreeChildNode[], Node][];
  let childrenAndParentInstanceQueueItem: [readonly HybridDOMTreeChildNode[], Node] | undefined;

  for (payload of queue) {
    switch (payload.type) {
      case DiffType.UPDATE:
        applyPropertyUpdateQueue(payload.updates, payload.node);
        break;
      case DiffType.INSERT:
        node = payload.node;

        if (node.type === HybridDOMTreeNodeType.TEXT) {
          // * ASSERT `node.nextSiblingInstance.parentNode.isSameNode(node.parentInstance)`
          node.parentInstance.insertBefore(node.instance, node.nextSiblingInstance);
          break;
        }

        if (node.type === HybridDOMTreeNodeType.FRAGMENT) {
          instance = fragment;
        } else {
          instance = node.instance;
          // includes ref
          applyProperties(node);
        }

        childrenAndParentInstanceQueue = [[node.children, instance]];

        // eslint-disable-next-line no-cond-assign
        while ((childrenAndParentInstanceQueueItem = childrenAndParentInstanceQueue.shift())) {
          [children, parentInstance] = childrenAndParentInstanceQueueItem;

          for (child of children) {
            switch (child.type) {
              case HybridDOMTreeNodeType.HTML_ELEMENT:
                // includes ref
                applyProperties(child);
                parentInstance.appendChild(child.instance);
                childrenAndParentInstanceQueue.push([child.children, child.instance]);
                break;
              case HybridDOMTreeNodeType.TEXT:
                parentInstance.appendChild(child.instance);
                break;
              case HybridDOMTreeNodeType.FRAGMENT:
                childrenAndParentInstanceQueue.push([child.children, parentInstance]);
                break;
              default:
                break;
            }
          }
        }

        // * ASSERT `node.nextSiblingInstance.parentNode.isSameNode(node.parentInstance)`
        node.parentInstance.insertBefore(instance, node.nextSiblingInstance);

        break;
      case DiffType.REMOVE:
        node = payload.node;

        if (node.type === HybridDOMTreeNodeType.TEXT) {
          // * ASSERT `node.instance.parentNode.isSameNode(node.parentInstance)`
          node.parentInstance.removeChild(node.instance);
          break;
        }

        refUpdatesQueueFragment = [];
        childrenQueue = Array.prototype.slice.call(node.children, 0);

        if (node.type === HybridDOMTreeNodeType.FRAGMENT) {
          childInstances = node.childInstances;

          if (childInstances.length) {
            parentInstance = node.parentInstance;

            for (instance of childInstances) {
              // * ASSERT `instance.parentNode.isSameNode(parentInstance)`
              parentInstance.removeChild(instance);
            }
          }
        } else {
          // * ASSERT `node.instance.parentNode.isSameNode(node.parentInstance)`
          node.parentInstance.removeChild(node.instance);

          if (node.ref) {
            refUpdatesQueueFragment.unshift([node.ref, null]);
          }
        }

        // eslint-disable-next-line no-cond-assign
        while ((child = childrenQueue.shift())) {
          switch (child.type) {
            case HybridDOMTreeNodeType.HTML_ELEMENT:
              if (child.ref) {
                refUpdatesQueueFragment.unshift([child.ref, null]);
              }
              Array.prototype.unshift.apply(childrenQueue, child.children);
              break;
            case HybridDOMTreeNodeType.FRAGMENT:
              Array.prototype.unshift.apply(childrenQueue, child.children);
              break;
            default:
              break;
          }
        }

        Array.prototype.push.apply(refUpdatesQueue, refUpdatesQueueFragment);

        break;
      case DiffType.MOVE:
        node = payload.node;

        if (node.type === HybridDOMTreeNodeType.FRAGMENT) {
          childInstances = node.childInstances;

          if (childInstances.length) {
            // for (instance of childInstances) {
            //   fragment.appendChild(instance);
            // }

            // node.parentInstance.insertBefore(fragment, node.nextSiblingInstance);

            // * ASSERT `nextSiblingInstance.parentNode.isSameNode(node.parentInstance)`
            childInstances = childInstances.reverse();
            nextSiblingInstance = node.nextSiblingInstance;

            for (instance of childInstances) {
              node.parentInstance.insertBefore(instance, nextSiblingInstance);
              nextSiblingInstance = instance;
            }
          }
        } else {
          // * ASSERT `node.nextSiblingInstance.parentNode.isSameNode(node.parentInstance)`
          node.parentInstance.insertBefore(node.instance, node.nextSiblingInstance);
        }

        if ('updates' in payload && payload.updates.length) {
          applyPropertyUpdateQueue(payload.updates, payload.node);
        }

        break;
      default:
        break;
    }
  }

  for (refUpdate of refUpdatesQueue) {
    applyMDWCRef(...refUpdate);
  }
}
