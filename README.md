# Mofon Design WC Core

Web components core of Mofon Design.

[![NPM version](https://img.shields.io/npm/v/@mofon-design/wc-core.svg?style=flat)](https://www.npmjs.com/package/@mofon-design/wc-core) [![Install size](https://packagephobia.com/badge?p=@mofon-design/wc-core)](https://packagephobia.com/result?p=@mofon-design/wc-core) [![Netlify Status](https://api.netlify.com/api/v1/badges/9b26eba9-d88f-41f7-b838-9a5da66e473a/deploy-status)](https://app.netlify.com/sites/wc-core/deploys)

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
