/* eslint-disable no-underscore-dangle */
import { makeSureCorePropertiesExist } from '../property/makeSureCorePropertiesExist';
import {
  CoreElementConstructor,
  CoreElementLifecycle,
  CoreElementStage,
  CoreInternalElement,
} from '../types/index';
import { callSuperLifecycle, rewriteLifecycle } from './superLifecycle';

export function tag(tagName: string, options?: ElementDefinitionOptions) {
  return <T extends CoreElementConstructor>(Target: T): T => {
    /**
     * In case property decorator is not called at least once.
     */
    makeSureCorePropertiesExist(Target.prototype);

    const privateMethods = {
      __setElementConnected(this: CoreInternalElement<InstanceType<T>>): void {
        if (this.isConnected) {
          this.stage |= CoreElementStage.CONNECTED;
        } else {
          this.stage &= ~CoreElementStage.CONNECTED;
        }
      },
    };

    const privateMethodKeys = Object.keys(privateMethods) as (keyof typeof privateMethods)[];

    privateMethodKeys.forEach(privateMethodKey => {
      Object.defineProperty(Target.prototype, privateMethodKey, {
        configurable: true,
        enumerable: false,
        value: privateMethods[privateMethodKey],
        writable: false,
      });
    });

    const lifecycle: ThisType<CoreInternalElement<InstanceType<T>>> & CoreElementLifecycle = {
      attributeChangedCallback(
        name: string,
        oldValue: string | null,
        newValue: string | null,
      ): void {
        if (oldValue === newValue) return;

        if (Target.prototype.mapAttrsToProps[name] !== undefined) {
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

          this.stage |= CoreElementStage.SYNC_ATTRIBUTE;
          (this as any)[Target.prototype.mapAttrsToProps[name]] = newValue;
          this.stage &= ~CoreElementStage.SYNC_ATTRIBUTE;
        }

        callSuperLifecycle(this, 'attributeChangedCallback', name, oldValue, newValue);
      },

      connectedCallback(): void {
        this.__setElementConnected();

        if (!(this.stage & CoreElementStage.INITIALIZED)) {
          this.stage |= CoreElementStage.INITIALIZED;
          this.initialize?.();
        }

        callSuperLifecycle(this, 'connectedCallback');
      },

      disconnectedCallback(): void {
        this.__setElementConnected();
        callSuperLifecycle(this, 'disconnectedCallback');
      },

      shouldSyncPropertyToAttribute(
        property: keyof any,
        oldValue: unknown | undefined,
        newValue: unknown | undefined,
        attribute: string,
      ): boolean {
        const superResult = callSuperLifecycle(
          this,
          'shouldSyncPropertyToAttribute',
          property,
          oldValue,
          newValue,
          attribute,
        );

        if (callSuperLifecycle.returnValueIsExists(superResult)) {
          return superResult;
        }

        return !!(
          !(this.stage & CoreElementStage.SYNC_ATTRIBUTE) &&
          this.stage & CoreElementStage.INITIALIZED
        );
      },
    };

    rewriteLifecycle(Target, lifecycle);

    if (!Target.hasOwnProperty('observedAttributes')) {
      Object.defineProperty(Target, 'observedAttributes', {
        configurable: true,
        enumerable: true,
        get() {
          return Object.keys(Target.prototype.mapAttrsToProps);
        },
      });
    }

    window.customElements.define(tagName, Target, options);

    return Target;
  };
}
