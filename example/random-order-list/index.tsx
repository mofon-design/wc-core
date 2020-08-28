import MDWC from '../../src';
import { HybridDOMTreeRootNode } from '../../src/jsx/dom';

@MDWC.tag('random-order-list', { extends: 'ul' })
export class RandomOrderList extends HTMLUListElement implements MDWC.CoreElement {
  items = [
    'Change the content of the input',
    'Click anywhere else on the page',
    'The inputs will be reordered',
    'But the focused input will still exist',
    'That is, when reordering, the inputs are not recreated',
    'Because MDWC recognizes elements by the property `key`',
  ] as const;

  hybridDOMTree?: HybridDOMTreeRootNode;

  connectedCallback() {
    document.body.addEventListener('click', this.forceUpdate);
  }

  disconnectedCallback() {
    document.body.removeEventListener('click', this.forceUpdate);
  }

  forceUpdate = () => {
    const [diffQueue, hybridDOMTree] = MDWC.diffHybridDOMTree(
      this.render(),
      this,
      this.hybridDOMTree,
    );
    this.hybridDOMTree = hybridDOMTree;
    MDWC.applyHybridDOMTreeDiff(diffQueue);
  };

  initialize() {
    this.forceUpdate();
    this.style.width = '54ex';
    this.style.marginBottom = '100vh';
    this.addEventListener('click', (event) => event.stopPropagation(), { capture: true });
  }

  render() {
    const reordered: string[] = [];

    for (const item of this.items) {
      reordered.splice(Math.trunc(Math.random() * reordered.length), 0, item);
    }

    console.log(`reordered: ${reordered.join(', ')}`);

    return reordered.map((item) => (
      <li key={item}>
        <input style={{ width: '54ex' }} value={item} />
      </li>
    ));
  }
}
