import {
  HybridDOMTreeChildNode,
  HybridDOMTreeChildNodeDescribedPropKeys,
  HybridDOMTreeChildNodeProps,
  HybridDOMTreeChildNodeType,
  HybridDOMTreeChildNodeTypeMap,
  HybridDOMTreeNodeType,
} from './types';

const HybridDOMTreeChildNodePropertyDescriptors: {
  [T in HybridDOMTreeChildNodeDescribedPropKeys]: PropertyDescriptor & {
    get: () => HybridDOMTreeChildNodeProps[T];
  } & ThisType<HybridDOMTreeChildNode>;
} = {
  childInstances: {
    configurable: true,
    enumerable: true,
    get() {
      if (!('children' in this)) {
        return [];
      }

      const childInstances: Node[] = [];
      const children: HybridDOMTreeChildNode[] = Array.prototype.slice.call(this.children, 0);

      let child: HybridDOMTreeChildNode | undefined;

      // eslint-disable-next-line no-cond-assign
      while ((child = children.shift())) {
        if (child.type === HybridDOMTreeNodeType.FRAGMENT) {
          Array.prototype.unshift.apply(children, child.children);
        } else {
          childInstances.push(child.instance);
        }
      }

      return childInstances;
    },
  },
  nextSiblingInstance: {
    configurable: true,
    enumerable: true,
    get() {
      let self: HybridDOMTreeChildNode | null = this;

      let isBeforeSelf: boolean;
      let children: readonly HybridDOMTreeChildNode[];

      let child: HybridDOMTreeChildNode;
      let siblingInstance: Node | null = null;

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

          if (child.type === HybridDOMTreeNodeType.FRAGMENT) {
            fragmentChildrenQueue = Array.prototype.slice.call(child.children, 0);

            // eslint-disable-next-line no-cond-assign
            while ((fragmentChild = fragmentChildrenQueue.shift())) {
              if (fragmentChild.type === HybridDOMTreeNodeType.FRAGMENT) {
                Array.prototype.unshift.apply(fragmentChildrenQueue, fragmentChild.children);
              } else {
                siblingInstance = fragmentChild.instance;
                break;
              }
            }
          } else {
            siblingInstance = child.instance;
          }

          if (siblingInstance !== null) {
            break;
          }
        }

        if (siblingInstance === null && self.parent.type === HybridDOMTreeNodeType.FRAGMENT) {
          self = self.parent;
        } else {
          self = null;
        }
      } while (self !== null);

      return siblingInstance;
    },
  },
  parentInstance: {
    configurable: true,
    enumerable: true,
    get() {
      let parent = this.parent;

      // * ASSERT circular structure (weak set)
      while (parent.type === HybridDOMTreeNodeType.FRAGMENT) {
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
