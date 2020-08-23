import * as MDWC from '../../src';

@MDWC.tag('search-input')
export class SearchInput extends HTMLElement implements MDWC.CoreElement {
  @MDWC.property('string')
  value!: string;

  button = MDWC.createRef<HTMLButtonElement>();

  input = MDWC.createRef<HTMLInputElement>();

  paragraph = MDWC.createRef<HTMLParagraphElement>();

  attributeChangedCallback() {
    console.log('attribute changed, this.value =', this.value);
  }

  initialize() {
    // child must be rendered after ref created
    this.appendChild(this.renderDOM());
    this.input.current?.addEventListener('input', this.onInput);
    this.button.current?.addEventListener('click', this.onClickButton);

    console.log('initialized, refs:', this.input, this.button);
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

  propertyChangedCallback() {
    if (this.paragraph.current) {
      this.paragraph.current.innerText = this.value;
    }
  }

  // TODO Add `render` to the MDWC lifecycle
  renderDOM() {
    return MDWC.createDOM(
      <MDWC.Fragment>
        <input ref={this.input} />
        <button ref={this.button} type="button">
          Search
        </button>
        <p ref={this.paragraph}>{this.value}</p>
      </MDWC.Fragment>,
    );
  }
}
