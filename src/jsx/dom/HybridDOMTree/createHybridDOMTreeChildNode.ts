import { isHybridDOMTreeFragmentNode } from './asserts';
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
      if (!('children' in this)) {
        return [];
      }

      const childNodes: Node[] = [];
      const children: HybridDOMTreeChildNode[] = Array.prototype.slice.call(this.children, 0);

      let child: HybridDOMTreeChildNode | undefined;

      // eslint-disable-next-line no-cond-assign
      while ((child = children.shift())) {
        if (isHybridDOMTreeFragmentNode(child)) {
          Array.prototype.unshift.apply(children, child.children);
        } else {
          childNodes.push(child.instance);
        }
      }

      return childNodes;
    },
  },
  nextSiblingNode: {
    configurable: true,
    enumerable: true,
    get() {
      let self: HybridDOMTreeChildNode | null = this;

      let isBeforeSelf: boolean;
      let children: readonly HybridDOMTreeChildNode[];

      let child: HybridDOMTreeChildNode;
      let siblingNode: Node | null = null;

      let fragmentChildrenQueue: HybridDOMTreeChildNode[];
      let fragmentChild: HybridDOMTreeChildNode | undefined;

      do {
        isBeforeSelf = true;
        children = self.parent.children;

        for (child of children) {
          if (child === self) {
            isBeforeSelf = false;
            continue;
          } else if (isBeforeSelf) {
            continue;
          }

          if (isHybridDOMTreeFragmentNode(child)) {
            fragmentChildrenQueue = Array.prototype.slice.call(child.children, 0);

            // eslint-disable-next-line no-cond-assign
            while ((fragmentChild = fragmentChildrenQueue.shift())) {
              if (isHybridDOMTreeFragmentNode(fragmentChild)) {
                Array.prototype.unshift.apply(fragmentChildrenQueue, fragmentChild.children);
              } else {
                siblingNode = fragmentChild.instance;
                break;
              }
            }
          } else {
            siblingNode = child.instance;
          }

          if (siblingNode !== null) {
            break;
          }
        }

        if (siblingNode === null && isHybridDOMTreeFragmentNode(self.parent)) {
          self = self.parent;
        } else {
          self = null;
        }
      } while (self !== null);

      return siblingNode;
    },
  },
  parentNode: {
    configurable: true,
    enumerable: true,
    get() {
      let parent = this.parent;

      // * ASSERT circular structure (weak set)
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
