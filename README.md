# mofon-design-wc-core

Web components core of Mofon Design.

## Examples

See [example](https://github.com/imhele/mofon-design-wc-core/tree/master/example) directory.

Or [visit preview site](https://wc-core.netlify.com/).

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
