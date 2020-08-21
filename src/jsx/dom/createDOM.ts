import { MDWC } from '../../types/index';
import { Children } from '../children';
import { createDOMNodeAndApplyProperties } from './createDOMNodeAndApplyProperties';

export function createDOM(input: MDWC.MDWCNode): DocumentFragment {
  const children = Children.toArray(input);
  const root = document.createDocumentFragment();

  for (const child of children) {
    switch (typeof child) {
      case 'object': {
        const node = createDOMNodeAndApplyProperties(child);
        node.appendChild(createDOM(child.children));
        root.appendChild(node);
        break;
      }
      default: {
        root.appendChild(document.createTextNode(`${child}`));
        break;
      }
    }
  }

  return root;
}
