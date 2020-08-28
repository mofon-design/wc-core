import MDWC from '../../src';
import { HybridDOMTreeRootNode } from '../../src/jsx/dom';

@MDWC.tag('random-order-list', { extends: 'ul' })
export class RandomOrderList extends HTMLUListElement implements MDWC.CoreElement {
  items = [
    'Click To Reorder',
    'Random Order List',
    'Mofon Design',
    'Web Components',
    'JSX',
  ] as const;

  hybridDOMTree?: HybridDOMTreeRootNode;

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
    this.addEventListener('click', this.forceUpdate);
  }

  render() {
    const reordered: string[] = [];

    for (const item of this.items) {
      reordered.splice(Math.trunc(Math.random() * reordered.length), 0, item);
    }

    console.log(`reordered: ${reordered.join(', ')}`);

    return reordered.map((item, index) => (
      <li
        key={item}
        style={{
          height: '32px',
          lineHeight: '32px',
          position: 'absolute',
          top: `${index * 32}px`,
          transition: 'all ease-in-out 0.32s 0s',
        }}
      >
        {item}
      </li>
    ));
  }
}
