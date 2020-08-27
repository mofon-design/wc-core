import MDWC from '../../src';
import { HybridDOMTreeRootNode } from '../../src/jsx/dom';

@MDWC.tag('search-input')
export class SearchInput extends HTMLElement implements MDWC.CoreElement {
  @MDWC.property('string')
  value!: string;

  hybridDOMTree?: HybridDOMTreeRootNode;

  button = MDWC.createRef<HTMLButtonElement>();

  input = MDWC.createRef<HTMLInputElement>();

  attributeChangedCallback() {
    console.log('attribute changed, this.value =', this.value);
    this.forceUpdate();
  }

  initialize() {
    this.forceUpdate();
    this.input.current?.addEventListener('input', this.onInput);
    this.button.current?.addEventListener('click', this.onClickButton);

    console.log('initialized, refs:', this.input, this.button);
  }

  forceUpdate() {
    const [diffQueue, hybridDOMTree] = MDWC.diffHybridDOMTree(this.render(), this, this.hybridDOMTree);
    this.hybridDOMTree = hybridDOMTree;
    MDWC.applyHybridDOMTreeDiff(diffQueue);
  }

  onInput = () => {
    if (this.input.current) {
      this.value = this.input.current.value;
    }
  };

  onClickButton = () => {
    // eslint-disable-next-line no-alert
    alert(`Search '${this.value}'`);
  };

  render() {
    return (
      <MDWC.Fragment>
        <input ref={this.input} />
        <button ref={this.button} type="button">
          Search
        </button>
        <p>{this.value}</p>
      </MDWC.Fragment>
    );
  }
}
