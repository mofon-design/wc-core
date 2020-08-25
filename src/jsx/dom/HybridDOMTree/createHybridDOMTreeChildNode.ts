import { isHybridDOMTreeFragmentNode } from './assert';
import {
  HybridDOMTreeChildNode,
  HybridDOMTreeChildNodeDescribedPropKeys,
  HybridDOMTreeChildNodeProps,
  HybridDOMTreeChildNodeType,
  HybridDOMTreeChildNodeTypeMap,
} from './types';

const HybridDOMTreeChildNodePropertyDescriptors: {
  [T in HybridDOMTreeChildNodeDescribedPropKeys]: PropertyDescriptor & {
    get: () => HybridDOMTreeChildNodeProps[T];
  } & ThisType<HybridDOMTreeChildNode>;
} = {
  childNodes: {
    configurable: true,
    enumerable: true,
    get() {
      let child: HybridDOMTreeChildNode;
      const childNodes: Node[] = [];

      if ('children' in this) {
        for (child of this.children) {
          if (isHybridDOMTreeFragmentNode(child)) {
            Array.prototype.push.apply(childNodes, child.childNodes);
          } else {
            childNodes.push(child.instance);
          }
        }
      }

      return childNodes;
    },
  },
  firstChildNode: {
    configurable: true,
    enumerable: true,
    get() {
      let child: HybridDOMTreeChildNode;
      let childNode: Node | null = null;

      if ('children' in this) {
        for (child of this.children) {
          if (isHybridDOMTreeFragmentNode(child)) {
            childNode = child.firstChildNode;
          } else {
            childNode = child.instance;
          }

          if (childNode !== null) {
            break;
          }
        }
      }

      return childNode;
    },
  },
  nextSiblingNode: {
    configurable: true,
    enumerable: true,
    get() {
      let parent = this.parent;

      while (isHybridDOMTreeFragmentNode(parent)) {
        parent = parent.parent;
      }

      const children = parent.children;
      let child: HybridDOMTreeChildNode;
      let siblingNode: Node | null = null;

      let isBeforeThis = true;

      for (child of children) {
        if (child === this) {
          isBeforeThis = false;
          continue;
        } else if (isBeforeThis) {
          continue;
        }

        if (isHybridDOMTreeFragmentNode(child)) {
          siblingNode = child.firstChildNode;
        } else {
          siblingNode = child.instance;
        }

        if (siblingNode !== null) {
          break;
        }
      }

      return siblingNode;
    },
  },
  parentNode: {
    configurable: true,
    enumerable: true,
    get() {
      let parent = this.parent;

      while (isHybridDOMTreeFragmentNode(parent)) {
        parent = parent.parent;
      }

      return parent.instance;
    },
  },
};

/**
 * Creates a node of the hybrid DOM tree with the given type and properties.
 * The main job is to configure accessors.
 */
export function createHybridDOMTreeChildNode<T extends HybridDOMTreeChildNodeType>(
  type: T,
  props: Omit<HybridDOMTreeChildNodeTypeMap[T], 'type' | HybridDOMTreeChildNodeDescribedPropKeys>,
): HybridDOMTreeChildNodeTypeMap[T] {
  const node = {
    ...props,
    type: type as HybridDOMTreeChildNodeTypeMap[T]['type'],
  } as HybridDOMTreeChildNodeTypeMap[T];
  Object.defineProperties(node, HybridDOMTreeChildNodePropertyDescriptors);
  return node;
}
