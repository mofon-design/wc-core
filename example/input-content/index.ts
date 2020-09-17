import { CoreElement, property, tag } from '../../src';

@tag('input-content')
export class InputContent extends HTMLElement implements CoreElement {
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

  onValueChange(oldValue: string, newValue: string) {
    this.paragraph.innerText = newValue;

    console.log(`property \`value\` changed from \`${oldValue}\` to \`${newValue}\``);
  }
}
