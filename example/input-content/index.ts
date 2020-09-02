import { CoreElement, property, tag } from '../../src';

@tag('input-content')
export class InputContent extends HTMLElement implements CoreElement {
  @(property('string').fallback('Attribute does not exists'))
  value!: string;

  button = document.createElement('button');

  input = document.createElement('input');

  paragraph = document.createElement('p');

  constructor() {
    super();
    this.paragraph.innerText = this.value;
    this.button.innerText = 'Remove Attribute';
    this.input.addEventListener('input', this.onInput);
    this.button.addEventListener('click', this.onClickButton);

    console.log('constructed, this.value =', this.value);
  }

  attributeChangedCallback() {
    console.log('attribute changed, this.value =', this.value);
  }

  initialize() {
    this.appendChild(this.input);
    this.appendChild(this.button);
    this.appendChild(this.paragraph);

    console.log('initialized, this.value =', this.value);
  }

  onInput = () => {
    this.value = this.input.value;
  };

  onClickButton = () => {
    this.value = null!;
  };

  propertyChangedCallback() {
    this.paragraph.innerText = this.value;

    console.log('property changed, this.value =', this.value);
  }
}
