import { CheckBox } from '../check-box';
import { tag } from '../../src';

@tag('extended-check-box')
export class ExtendedCheckBox extends CheckBox {
  constructor() {
    super();
    this.div.style.border = '1px solid #d9d9d9';
  }

  initialize() {
    tag.getSuperLifecycles(this).initialize?.();

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
      this.div.style.borderColor = '';
    }
  }
}
