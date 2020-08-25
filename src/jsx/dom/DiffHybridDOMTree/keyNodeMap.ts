import {
  HybridDOMTreeChildNode,
  HybridDOMTreeChildNodeType,
  HybridDOMTreeFragmentNode,
  HybridDOMTreeHTMLElementNode,
  HybridDOMTreeNodeType,
  HybridDOMTreeTextNode,
  isHybridDOMTreeFragmentNode,
  // isHybridDOMTreeHTMLElementNode,
  isHybridDOMTreeTextNode,
} from '../HybridDOMTree';

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Construct the mapping from node characteristics to node.
 *
 * @description
 * At present, the characteristics considered include the type of node, formated MDWC key,
 * and tag name of HTML element (if any). If all the considered characteristics of
 * multiple nodes are the same, it is considered that these nodes can be converted to
 * each other by changing the attributes.
 */
export function createHybridDOMTreeKeyNodeMap(
  nodes: readonly HybridDOMTreeChildNode[],
): HybridDOMTreeKeyNodeMap {
  const rootMap: HybridDOMTreeKeyNodeMap = {
    [HybridDOMTreeNodeType.FRAGMENT]: {},
    [HybridDOMTreeNodeType.HTML_ELEMENT]: {},
    [HybridDOMTreeNodeType.TEXT]: {},
  };

  let index: number;
  let node: HybridDOMTreeChildNode;
  let submap: HybridDOMTreeKeyNodeMap[HybridDOMTreeChildNodeType];
  let subsubmap: HybridDOMTreeKeyNodeMap[HybridDOMTreeChildNodeType][string];

  for (index = 0; index < nodes.length; index += 1) {
    node = nodes[index];

    if (isHybridDOMTreeTextNode(node)) {
      submap = rootMap[node.type];

      if (!hasOwnProperty.call(submap, node.textContent)) {
        submap[node.textContent] = [[node, index]];
      } else {
        submap[node.textContent].push([node, index]);
      }
    } else if (isHybridDOMTreeFragmentNode(node)) {
      submap = rootMap[node.type];

      if (!hasOwnProperty.call(submap, node.key)) {
        submap[node.key] = [[node, index]];
      } else {
        submap[node.key].push([node, index]);
      }
    } else {
      submap = rootMap[node.type];

      if (!hasOwnProperty.call(submap, node.tagName)) {
        submap[node.tagName] = { [node.key]: [[node, index]] };
      } else {
        subsubmap = submap[node.tagName];

        if (!hasOwnProperty.call(submap, node.key)) {
          subsubmap[node.key] = [[node, index]];
        } else {
          subsubmap[node.key].push([node, index]);
        }
      }
    }
  }

  return rootMap;
}

/**
 * Given multiple characteristics, match the first existing node in the map.
 */
function shiftHybridDOMTreeNodeFromKeyNodeMap(
  map: HybridDOMTreeKeyNodeMap,
  type: HybridDOMTreeNodeType.FRAGMENT,
  key: string,
): [HybridDOMTreeFragmentNode, number] | undefined;
function shiftHybridDOMTreeNodeFromKeyNodeMap(
  map: HybridDOMTreeKeyNodeMap,
  type: HybridDOMTreeNodeType.HTML_ELEMENT,
  tagName: string,
  key: string,
): [HybridDOMTreeHTMLElementNode, number] | undefined;
function shiftHybridDOMTreeNodeFromKeyNodeMap(
  map: HybridDOMTreeKeyNodeMap,
  type: HybridDOMTreeNodeType.TEXT,
  textContent: string,
): [HybridDOMTreeTextNode, number] | undefined;
function shiftHybridDOMTreeNodeFromKeyNodeMap(
  map: HybridDOMTreeKeyNodeMap,
  type: HybridDOMTreeChildNodeType,
  firstCharacteristic: string,
  secondCharacteristic?: string,
): [HybridDOMTreeChildNode, number] | undefined {
  if (type === HybridDOMTreeNodeType.FRAGMENT) {
    return map[type][firstCharacteristic].shift();
  }

  if (type === HybridDOMTreeNodeType.TEXT) {
    return map[type][firstCharacteristic].shift();
  }

  return map[type][firstCharacteristic][secondCharacteristic!].shift();
}

export { shiftHybridDOMTreeNodeFromKeyNodeMap };

export interface HybridDOMTreeKeyNodeMap {
  [HybridDOMTreeNodeType.FRAGMENT]: Record<string, [HybridDOMTreeFragmentNode, number][]>;
  [HybridDOMTreeNodeType.HTML_ELEMENT]: Record<
    string,
    Record<string, [HybridDOMTreeHTMLElementNode, number][]>
  >;
  [HybridDOMTreeNodeType.TEXT]: Record<string, [HybridDOMTreeTextNode, number][]>;
}
