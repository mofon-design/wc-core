# mofon-design-wc-core

Web components core of Mofon Design.

## Examples

See [example](https://github.com/imhele/mofon-design-wc-core/tree/master/example) directory.

Or [visit preview site](https://wc-core.netlify.com/).

### Basic

```ts
import { CoreElement, property, tag } from '@mofon-design/wc-core';

@tag('my-element')
class InputContent extends HTMLElement implements CoreElement {
  @(property('string').fallback('Attribute does not exists'))
  value!: string;

  button = document.createElement('button');
  input = document.createElement('input');
  paragraph = document.createElement('p');

  constructor() {
    super();
    this.paragraph.innerText = this.value;
    this.button.innerText = 'Remove Attribute';
    this.input.addEventListener('input', () => (this.value = this.input.value));
    this.button.addEventListener('click', () => (this.value = null!));

    console.log('constructed, this.value =', this.value);
  }

  initialize() {
    this.appendChild(this.input);
    this.appendChild(this.button);
    this.appendChild(this.paragraph);
  }

  propertyChangedCallback() {
    this.paragraph.innerText = this.value;

    console.log('property changed, this.value =', this.value);
  }
}
```

### With JSX

```tsx
import * as MDWC from '@mofon-design/wc-core';

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
```
