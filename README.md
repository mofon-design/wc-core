# Mofon Design WC Core

Web components core of Mofon Design.

[![NPM version](https://img.shields.io/npm/v/@mofon-design/wc-core.svg?style=flat)](https://www.npmjs.com/package/@mofon-design/wc-core) [![Install size](https://packagephobia.com/badge?p=@mofon-design/wc-core)](https://packagephobia.com/result?p=@mofon-design/wc-core) [![Netlify Status](https://api.netlify.com/api/v1/badges/9b26eba9-d88f-41f7-b838-9a5da66e473a/deploy-status)](https://app.netlify.com/sites/wc-core/deploys)

## With JSX

See [mofon-design/wc-jsx](https://github.com/mofon-design/wc-jsx) repo.

## Examples

See [example](https://github.com/mofon-design/wc-core/tree/master/example) directory.

Or [visit preview site](https://wc-core.netlify.com/).

### Basic

```ts
import { CoreElement, property, tag } from '@mofon-design/wc-core';

@tag('input-content')
class InputContent extends HTMLElement implements CoreElement {
  @property.string<InputContent>({ watcher: InputContent.prototype.onValueChange })
  value: string | undefined;

  button = document.createElement('button');

  input = document.createElement('input');

  paragraph = document.createElement('p');

  constructor() {
    super();
    this.paragraph.innerText = this.value || '';
    this.button.innerText = 'Remove Attribute';
    this.input.addEventListener('input', this.onInput);
    this.button.addEventListener('click', this.onClickButton);

    console.log(`constructed, \`this.value\` = \`${this.value}\``);
  }

  initialize() {
    this.appendChild(this.input);
    this.appendChild(this.button);
    this.appendChild(this.paragraph);

    console.log(`initialized, \`this.value\` = \`${this.value}\``);
  }

  onInput = () => {
    this.value = this.input.value;
  };

  onClickButton = () => {
    this.value = null!;
  };

  onValueChange(oldValue: string | undefined, newValue: string = '') {
    this.paragraph.innerText = newValue;

    console.log(`property \`value\` changed from \`${oldValue}\` to \`${newValue}\``);
  }
}
```

### Custom Attribute Name

```ts
import { CoreElement, property, tag } from '@mofon-design/wc-core';

@tag('check-box')
class CheckBox extends HTMLElement implements CoreElement {
  @property.boolean<CheckBox>({
    watcher(oldValue, newValue) {
      this.onValueChange(oldValue, newValue);
    },
  })
  checked: boolean | undefined;

  @(property('default-checked').boolean<CheckBox>({ enumerable: false }))
  defaultChecked: boolean | undefined;

  div = document.createElement('div');

  constructor() {
    super();
    this.div.style.cssText = 'width: 16px; height: 16px; border: 1px solid grey;';
    console.log(`constructed, \`this.checked\` = \`${this.checked}\``);
  }

  initialize() {
    if (!this.checked) {
      this.checked = this.defaultChecked;
    }

    this.div.addEventListener('click', () => {
      this.checked = !this.checked;
    });

    this.appendChild(this.div);

    console.log(`initialized, \`this.checked\` = \`${this.checked}\``);
  }

  onValueChange(oldValue: boolean | undefined, newValue: boolean = false) {
    this.div.style.background = newValue ? 'grey' : '';

    console.log(`property \`checked\` changed from \`${oldValue}\` to \`${newValue}\``);
  }
}
```

### Extend Custom Element

```ts
@tag('extended-check-box')
class ExtendedCheckBox extends CheckBox {
  constructor() {
    super();
    this.div.style.border = '1px solid #d9d9d9';
  }

  // eslint-disable-next-line class-methods-use-this
  initialize() {
    tag.getUndecoratedLifecycles(CheckBox).initialize?.call(this);

    console.log('this is child class.');
  }

  onValueChange(oldValue: boolean | undefined, newValue: boolean = false) {
    this.updateStyle();

    console.log(`property \`checked\` changed from \`${oldValue}\` to \`${newValue}\``);
  }

  updateStyle() {
    if (this.checked) {
      this.div.style.background = '#1890ff';
      this.div.style.borderColor = '#1890ff';
    } else {
      this.div.style.background = '';
      this.div.style.borderColor = '#d9d9d9';
    }
  }
}
```
