import { CoreElement, property, tag } from '../../es/index';

@tag('input-content')
export class InputContent extends HTMLElement implements CoreElement {
  @property('string')
  value = '';

  input = document.createElement('input');

  paragraph = document.createElement('p');

  constructor() {
    super();
    this.input.addEventListener('input', this.onInput);
  }

  initialize = () => {
    this.appendChild(this.input);
    this.appendChild(this.paragraph);
  };

  onInput = () => {
    this.value = this.input.value;
  };

  propertyChangedCallback = () => {
    this.paragraph.innerText = this.value;
  };
}
