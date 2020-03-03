import { CoreElement, property, tag } from '../../es/index';

@tag('input-content')
export class InputContent extends HTMLElement implements CoreElement {
  @(property('string').fallback('Empty.'))
  value = '';

  input = document.createElement('input');

  paragraph = document.createElement('p');

  constructor() {
    super();

    const fragment = new DocumentFragment();
    fragment.appendChild(this.input);
    fragment.appendChild(this.paragraph);

    this.input.addEventListener('input', () => {
      this.value = this.input.value;
    });

    this.appendChild(fragment);
  }

  propertyChangedCallback() {
    this.paragraph.innerText = this.value;
  }
}
