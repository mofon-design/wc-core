import { makeSurePrototypePropertiesExist } from '../shared/makeSurePrototypePropertiesExist';
import {
  MapAttrsToPropsKey,
  SetElementConnectedKey,
  StageKey,
} from '../shared/privatePropertiesKey';
import {
  ClassType,
  CoreElement,
  CoreElementConstructor,
  CoreElementLifecycle,
  CoreElementStage,
  CoreInternalElement,
} from '../types';
import { overridePrivateMethods } from './overridePrivateMethods';
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
  return <T extends CoreElementConstructor<U>>(ClassObject: T): T => {
    const WrappedClass = (ClassObject as ClassType<CoreElement>) as ClassType<CoreInternalElement>;

    makeSurePrototypePropertiesExist(WrappedClass.prototype);

    overridePrivateMethods(WrappedClass.prototype);

    const lifecycle: ThisType<CoreInternalElement> & CoreElementLifecycle = {
      attributeChangedCallback(
        name: string,
        oldValue: string | null,
        newValue: string | null,
      ): void {
        // if (oldValue === newValue) return;

        if (hasOwnProperty.call(WrappedClass.prototype[MapAttrsToPropsKey], name)) {
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
           *   this[StageKey] |= CoreElementStage.SYNC_ATTRIBUTE;
           *   if (value === null) this.removeAttribute('example');
           *   else this.setAttribute('example', value);
           *   this[StageKey] &= ~CoreElementStage.SYNC_ATTRIBUTE;
           * }
           * ```
           */

          this[StageKey] |= CoreElementStage.SYNC_ATTRIBUTE;
          (this as any)[WrappedClass.prototype[MapAttrsToPropsKey][name]] = newValue;
          this[StageKey] &= ~CoreElementStage.SYNC_ATTRIBUTE;
        }

        callSuperLifecycle(this, 'attributeChangedCallback', [name, oldValue, newValue]);
      },

      connectedCallback(): void {
        this[SetElementConnectedKey]();

        if (!(this[StageKey] & CoreElementStage.INITIALIZED)) {
          this[StageKey] |= CoreElementStage.INITIALIZED;
          this.initialize?.call(this);
        }

        callSuperLifecycle(this, 'connectedCallback', []);
      },

      disconnectedCallback(): void {
        this[SetElementConnectedKey]();
        callSuperLifecycle(this, 'disconnectedCallback', []);
      },
    };

    overrideLifecycle(WrappedClass.prototype, lifecycle);

    if (!hasOwnProperty.call(WrappedClass, 'observedAttributes')) {
      Object.defineProperty(WrappedClass, 'observedAttributes', {
        configurable: true,
        enumerable: true,
        get() {
          // return Object.keys(this[MapAttrsToPropsKey]);
          return Object.keys(WrappedClass.prototype[MapAttrsToPropsKey]);
        },
      });
    }

    // * ASSERT `!hasOwnProperty.call(ClassObject, 'tagName')`
    if (!hasOwnProperty.call(WrappedClass, 'tagName')) {
      Object.defineProperty(WrappedClass, 'tagName', {
        configurable: true,
        enumerable: true,
        value: tagName,
        writable: false,
      });
    }

    customElements.define(tagName, WrappedClass, options);

    return (WrappedClass as ClassType<CoreElement>) as T;
  };
}
