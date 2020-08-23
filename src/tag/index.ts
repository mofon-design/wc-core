import {
  CoreElementConstructor,
  CoreElementLifecycle,
  CoreElementStage,
  CoreInternalElement,
  // CoreInternalElementConstructor,
} from '../types';
import { makeSureCorePropertiesExist } from './makeSureCorePropertiesExist';
import { overridePrivateMethods } from './overridePrivateMethods';
import { SetElementConnectedKey } from './privatePropertiesKey';
import { callSuperLifecycle, overrideLifecycle } from './superLifecycle';

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @param tagName
 * Name for the new custom element.
 * Note that custom element names must contain a hyphen.
 * @param options
 * Object that controls how the element is defined.
 * One option is currently supported:
 * - `extends`: String specifying the name of a built-in element to extend.
 *              Used to create a customized built-in element.
 */
export function tag<U extends string>(tagName: U, options?: ElementDefinitionOptions) {
  return <T extends CoreElementConstructor<U>>(Target: T): T => {
    /**
     * In case property decorator is not called at least once.
     */
    makeSureCorePropertiesExist(Target.prototype);

    // const WrappedTarget = Target as {} as CoreInternalElementConstructor<T>;

    overridePrivateMethods(Target);

    const lifecycle: ThisType<CoreInternalElement<InstanceType<T>>> & CoreElementLifecycle = {
      attributeChangedCallback(
        name: string,
        oldValue: string | null,
        newValue: string | null,
      ): void {
        // if (oldValue === newValue) return;

        if (hasOwnProperty.call(Target.prototype.mapAttrsToProps, name)) {
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
           *   if (value === null) this.removeAttribute('example');
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
        this[SetElementConnectedKey]();

        if (!(this.stage & CoreElementStage.INITIALIZED)) {
          this.stage |= CoreElementStage.INITIALIZED;
          this.initialize?.call(this);
        }

        callSuperLifecycle(this, 'connectedCallback');
      },

      disconnectedCallback(): void {
        this[SetElementConnectedKey]();
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

    overrideLifecycle(Target, lifecycle);

    if (!hasOwnProperty.call(Target, 'observedAttributes')) {
      Object.defineProperty(Target, 'observedAttributes', {
        configurable: true,
        enumerable: true,
        get() {
          return Object.keys(Target.prototype.mapAttrsToProps);
        },
      });
    }

    if (!hasOwnProperty.call(Target, 'tagName') || Target.tagName !== tagName) {
      Object.defineProperty(Target, 'tagName', {
        configurable: true,
        enumerable: true,
        value: tagName,
        writable: false,
      });
    }

    customElements.define(tagName, Target, options);

    return Target;
  };
}
