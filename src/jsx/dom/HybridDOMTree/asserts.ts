import {
  HybridDOMTreeFragmentNode,
  HybridDOMTreeHTMLElementNode,
  HybridDOMTreeNode,
  HybridDOMTreeNodeType,
  HybridDOMTreeRootNode,
  HybridDOMTreeTextNode,
} from './types';

export function isHybridDOMTreeFragmentNode(
  node: HybridDOMTreeNode,
): node is HybridDOMTreeFragmentNode {
  return node.type === HybridDOMTreeNodeType.FRAGMENT;
}

export function isHybridDOMTreeHTMLElementNode(
  node: HybridDOMTreeNode,
): node is HybridDOMTreeHTMLElementNode {
  return node.type === HybridDOMTreeNodeType.HTML_ELEMENT;
}

export function isHybridDOMTreeRootNode(node: HybridDOMTreeNode): node is HybridDOMTreeRootNode {
  return node.type === HybridDOMTreeNodeType.ROOT;
}

export function isHybridDOMTreeTextNode(node: HybridDOMTreeNode): node is HybridDOMTreeTextNode {
  return node.type === HybridDOMTreeNodeType.TEXT;
}
