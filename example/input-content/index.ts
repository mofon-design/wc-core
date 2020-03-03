import { CoreElement, property, tag } from '../../es/index';

@tag('input-content')
export class InputContent extends HTMLElement implements CoreElement {
  @(property('string').fallback('Empty.'))
  value = '';

  input = document.createElement('input');

  paragraph = document.createElement('p');

  shadow = this.attachShadow({ mode: 'open' });

  constructor() {
    super();
    this.shadow.appendChild(this.input);
    this.shadow.appendChild(this.paragraph);
    this.input.addEventListener('input', this.onInput);
  }

  onInput = () => {
    this.value = this.input.value;
  };

  propertyChangedCallback = () => {
    this.paragraph.innerText = this.value;
  };
}
