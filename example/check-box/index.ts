import { CoreElement, property, tag } from '../../src';

@tag('check-box')
export class CheckBox extends HTMLElement implements CoreElement {
  @property.boolean<CheckBox>({
    watcher(oldValue, newValue) {
      this.onValueChange(oldValue, newValue);
    },
  })
  checked: boolean | undefined;

  @(property('default-checked').boolean({ enumerable: false }))
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
