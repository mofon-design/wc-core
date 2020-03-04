import { makeSureCorePropertiesExist } from '../property/makeSureCorePropertiesExist';
import {
  CoreElementConstructor,
  CoreElementStage,
  CoreInternalElement,
  NonFunctionPropertyKeys,
} from '../types/index';

export function tag(tagName: string, options?: ElementDefinitionOptions) {
  return <T extends CoreElementConstructor>(Target: T): T => {
    const WrappedTarget = class extends Target implements CoreInternalElement<InstanceType<T>> {
      // @ts-ignore
      mapAttrsToProps: CoreInternalElement<InstanceType<T>>['mapAttrsToProps'];

      // @ts-ignore
      properties: CoreInternalElement<InstanceType<T>>['properties'];

      // @ts-ignore
      stage: CoreInternalElement<InstanceType<T>>['stage'];

      attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (oldValue === newValue) return;

        /**
         * Prevent the property setter from loop calls.
         *
         * Do not change the stage when `setAttribute()` or `removeAttribute()` is fired
         * by the property setter to prevent `setAttribute()` or `removeAttribute()`
         * triggering `attributeChangedCallback()` in an asynchronous manner.
         *
         * @deprecated
         * ```ts
         * set property(value: string | null) {
         *   this.stage |= CoreElementStage.SYNC_ATTRIBUTE;
         *   if (value === null) this.removeAttribute();
         *   else this.setAttribute('example', value);
         *   this.stage &= ~CoreElementStage.SYNC_ATTRIBUTE;
         * }
         * ```
         */
        this.stage |= CoreElementStage.SYNC_PROPERTY;
        const propertyKey: NonFunctionPropertyKeys<InstanceType<T>> =
          WrappedTarget.prototype.mapAttrsToProps[name];
        this.properties[propertyKey] = newValue as any;
        this.stage &= ~CoreElementStage.SYNC_PROPERTY;

        super.attributeChangedCallback?.(name, oldValue, newValue);
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

    /**
     * In case property decorator is not called at least once.
     */
    makeSureCorePropertiesExist(WrappedTarget.prototype);

    if (!WrappedTarget.hasOwnProperty('observedAttributes')) {
      Object.defineProperty(WrappedTarget, 'observedAttributes', {
        configurable: true,
        enumerable: true,
        get() {
          return Object.keys(WrappedTarget.prototype.mapAttrsToProps);
        },
      });
    }

    window.customElements.define(tagName, WrappedTarget, options);

    return (WrappedTarget as unknown) as T;
  };
}
