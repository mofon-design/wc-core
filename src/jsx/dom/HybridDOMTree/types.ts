/**
 * Enumerate the types of all kinds of nodes in the tree.
 */
export const enum HybridDOMTreeNodeType {
  FRAGMENT,
  HTML_ELEMENT,
  ROOT,
  TEXT,
}

/**
 * The type of node that can be a child of the hybrid DOM tree.
 */
export type HybridDOMTreeChildNodeType = Exclude<HybridDOMTreeNodeType, HybridDOMTreeNodeType.ROOT>;

/**
 * The common properties of child nodes.
 * Properties are *queried at access time*, and used when applying DOM updates,
 * except `parent`.
 */
export interface HybridDOMTreeChildNodeProps {
  readonly childNodes: Node[];
  readonly nextSiblingNode: Node | null;
  readonly parent: HybridDOMTreeParentNode;
  readonly parentNode: Node;
}

/**
 * The properties of the child node that need to be configured.
 */
export type HybridDOMTreeChildNodeDescribedPropKeys = Exclude<
  keyof HybridDOMTreeChildNodeProps,
  'parent'
>;

export interface HybridDOMTreeFragmentNode extends HybridDOMTreeChildNodeProps {
  readonly children: HybridDOMTreeChildNode[];
  readonly key: string;
  readonly type: HybridDOMTreeNodeType.FRAGMENT;
}

export interface HybridDOMTreeHTMLElementNode
  extends HybridDOMTreeChildNodeProps,
    Readonly<Pick<MDWC.MDWCElement, 'props' | 'ref'>> {
  readonly children: HybridDOMTreeChildNode[];
  readonly instance: HTMLElement;
  readonly key: string;
  readonly tagName: string;
  readonly type: HybridDOMTreeNodeType.HTML_ELEMENT;
}

export interface HybridDOMTreeTextNode extends HybridDOMTreeChildNodeProps {
  readonly instance: Text;
  readonly textContent: string;
  readonly type: HybridDOMTreeNodeType.TEXT;
}

export interface HybridDOMTreeRootNode {
  readonly children: HybridDOMTreeChildNode[];
  readonly instance: Node;
  readonly type: HybridDOMTreeNodeType.ROOT;
}

export interface HybridDOMTreeChildNodeTypeMap {
  [HybridDOMTreeNodeType.FRAGMENT]: HybridDOMTreeFragmentNode;
  [HybridDOMTreeNodeType.HTML_ELEMENT]: HybridDOMTreeHTMLElementNode;
  [HybridDOMTreeNodeType.TEXT]: HybridDOMTreeTextNode;
}

/**
 * Nodes that can be a child of the hybrid DOM tree.
 */
export type HybridDOMTreeChildNode =
  | HybridDOMTreeFragmentNode
  | HybridDOMTreeHTMLElementNode
  | HybridDOMTreeTextNode;

/**
 * Nodes that can be a parent of the hybrid DOM tree.
 */
export type HybridDOMTreeParentNode =
  | HybridDOMTreeFragmentNode
  | HybridDOMTreeHTMLElementNode
  | HybridDOMTreeRootNode;

/**
 * Nodes of the hybrid DOM tree.
 */
export type HybridDOMTreeNode =
  | HybridDOMTreeFragmentNode
  | HybridDOMTreeHTMLElementNode
  | HybridDOMTreeRootNode
  | HybridDOMTreeTextNode;

export const enum DiffType {
  INSERT,
  MOVE,
  MOVE_AND_UPDATE,
  REMOVE,
  UPDATE,
}

export interface DiffQueueInsertedItem {
  node: HybridDOMTreeChildNode;
  type: DiffType.INSERT;
}

export interface DiffQueueMovedItem {
  node: HybridDOMTreeChildNode;
  type: DiffType.MOVE;
}

export interface DiffQueueMovedAndUpdatedItem {
  node: HybridDOMTreeChildNode;
  type: DiffType.MOVE_AND_UPDATE;
  /** `[propertyKey, oldValue, newValue]` */
  updates: [string, unknown, unknown][];
}

export interface DiffQueueRemovedItem {
  node: HybridDOMTreeChildNode;
  type: DiffType.REMOVE;
}

export interface DiffQueueUpdatedItem {
  node: HybridDOMTreeChildNode;
  type: DiffType.UPDATE;
  /** `[propertyKey, oldValue, newValue]` */
  updates: [string, unknown, unknown][];
}

export type DiffQueueItem =
  | DiffQueueInsertedItem
  | DiffQueueMovedItem
  | DiffQueueMovedAndUpdatedItem
  | DiffQueueRemovedItem
  | DiffQueueUpdatedItem;
