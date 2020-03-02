import { property, tag } from '../es';

class MyExample extends HTMLElement {
  value = '';

  /**
   * @type {HTMLInputElement}
   */
  input = null;

  /**
   * @type {HTMLParagraphElement}
   */
  paragraph = null;

  constructor() {
    super();
    property('string')(this, 'value');

    this.input = document.createElement('input');
    this.paragraph = document.createElement('p');

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

tag('my-example')(MyExample);
