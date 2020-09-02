# Mofon Design WC Core

Web components core of Mofon Design.

[![NPM version](https://img.shields.io/npm/v/@mofon-design/wc-core.svg?style=flat)](https://www.npmjs.com/package/@mofon-design/wc-core) [![Install size](https://packagephobia.com/badge?p=@mofon-design/wc-core)](https://packagephobia.com/result?p=@mofon-design/wc-core)

## Examples

See [example](https://github.com/mofon-design/wc-core/tree/master/example) directory.

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
import MDWC from '@mofon-design/wc-core';
import { HybridDOMTreeRootNode } from '@mofon-design/wc-core/src/jsx/dom';

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
    const [diffQueue, hybridDOMTree] = MDWC.diffHybridDOMTree(
      this.render(),
      this,
      this.hybridDOMTree,
    );
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
```
