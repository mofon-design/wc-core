import MDWC from '../../src';
import { HybridDOMTreeRootNode } from '../../src/jsx/dom';

@MDWC.tag('random-order-list', { extends: 'ul' })
export class RandomOrderList extends HTMLUListElement implements MDWC.CoreElement {
  items = [
    'Modify the contents of any input',
    'Click anywhere else on the page',
    'The inputs will be reordered',
    'But the modified input will still exist',
    'That is, when reordering, the inputs are not recreated',
    'Because MDWC recognizes elements by the property `key`',
  ];

  hybridDOMTree?: HybridDOMTreeRootNode;

  connectedCallback() {
    document.body.addEventListener('click', this.onReorder);
  }

  disconnectedCallback() {
    document.body.removeEventListener('click', this.onReorder);
  }

  forceUpdate() {
    const [diffQueue, hybridDOMTree] = MDWC.diffHybridDOMTree(
      this.render(),
      this,
      this.hybridDOMTree,
    );
    this.hybridDOMTree = hybridDOMTree;
    MDWC.applyHybridDOMTreeDiff(diffQueue);
  }

  initialize() {
    this.forceUpdate();
    this.style.width = '54ex';
    this.addEventListener('click', (event) => event.stopPropagation(), { capture: true });
  }

  onReorder = () => {
    const reordered: string[] = [];

    for (const item of this.items) {
      reordered.splice(Math.trunc(Math.random() * reordered.length), 0, item);
    }

    console.log(`reordered: ${reordered.join(', ')}`);

    this.items = reordered;
    this.forceUpdate();
  };

  render() {
    return this.items.map((item) => (
      <li key={item}>
        <input style={{ width: '54ex' }} value={item} />
      </li>
    ));
  }
}
