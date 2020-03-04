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

    console.log('constructed, this.value =', this.value);
  }

  attributeChangedCallback = () => {
    console.log('attribute changed, this.value =', this.value);
  };

  initialize = () => {
    this.appendChild(this.input);
    this.appendChild(this.paragraph);

    console.log('initialized, this.value =', this.value);
  };

  onInput = () => {
    this.value = this.input.value;
  };

  propertyChangedCallback = () => {
    this.paragraph.innerText = this.value;

    console.log('property changed, this.value =', this.value);
  };
}
