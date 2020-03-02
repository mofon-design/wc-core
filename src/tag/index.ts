import { makeSureCorePropertiesExist } from '../property/makeSureCorePropertiesExist';
import { CoreElement, CoreInternalElement, Constructor, CoreElementStage } from '../types/index';

export function tag(tagName: string, options?: ElementDefinitionOptions) {
  return <T extends Constructor<CoreElement>>(constructor: T): T => {
    const wrappedClass = class extends constructor implements CoreInternalElement<InstanceType<T>> {
      // @ts-ignore
      mapAttrsToProps: CoreInternalElement<InstanceType<T>>['mapAttrsToProps'];

      // @ts-ignore
      properties: CoreInternalElement<InstanceType<T>>['properties'];

      stage: CoreElementStage = CoreElementStage.NULL;

      constructor(...args: any[]) {
        super(...args);

        /** in case property decorator is not called at least once */
        makeSureCorePropertiesExist(this);
      }

      attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (oldValue === newValue) return;
        this.stage |= CoreElementStage.ATTRIBUTE_CHANGED;
        this.properties[this.mapAttrsToProps[name]] = newValue as any;
        super.attributeChangedCallback?.(name, oldValue, newValue);
        this.stage &= ~CoreElementStage.ATTRIBUTE_CHANGED;
      }

      connectedCallback() {
        this.setElementConnected();
        super.connectedCallback?.();
      }

      disconnectedCallback() {
        this.setElementConnected();
        super.disconnectedCallback?.();
      }

      /**
       * Determine whether the element has been connected to the document according to
       * `Node.isConnected`, and update the current stage.
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected
       */
      private setElementConnected() {
        if (this.isConnected) {
          this.stage |= CoreElementStage.CONNECTED;
        } else {
          this.stage &= ~CoreElementStage.CONNECTED;
        }
      }
    };

    window.customElements.define(tagName, wrappedClass, options);

    return wrappedClass;
  };
}
