import { makeSurePrototypePropertiesExist } from '../shared/makeSurePrototypePropertiesExist';
import { MapAttrsToPropsKey, StageKey } from '../shared/privatePropertyKeys';
import {
  ClassType,
  CoreElement,
  CoreElementConstructor,
  CoreElementLifecycle,
  CoreElementStage,
  CoreInternalElement,
} from '../types';
import { defineLifecycles } from './defineLifecycles';
import { fireUndecoratedLifecycle } from './fireUndecoratedLifecycle';
import { getUndecoratedLifecycles } from './getUndecoratedLifecycles';

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

    /**
     * The purpose of defining some empty lifecycles is to transfer the current lifecycles
     * into `__lifecycles` so that child classes can use `tag.getUndecoratedLifecycles`
     * to get the lifecycles of current class.
     */
    const lifecycle: ThisType<CoreInternalElement> & Required<CoreElementLifecycle> = {
      adoptedCallback(_oldDocument, newDocument) {
        if (this.ownerDocument !== newDocument) return;

        // eslint-disable-next-line prefer-rest-params
        fireUndecoratedLifecycle(this, 'adoptedCallback', arguments);
      },

      attributeChangedCallback(
        name,
        _oldValue,
        newValue,
      ) {
        // if (oldValue === newValue) return;

        if (name in WrappedClass.prototype[MapAttrsToPropsKey]) {
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

          this[StageKey] |= CoreElementStage.SYNC_ATTRIBUTE_TO_PROPERTY;
          (this as any)[WrappedClass.prototype[MapAttrsToPropsKey][name]] = newValue;
          this[StageKey] &= ~CoreElementStage.SYNC_ATTRIBUTE_TO_PROPERTY;
        }

        // eslint-disable-next-line prefer-rest-params
        fireUndecoratedLifecycle(this, 'attributeChangedCallback', arguments);
      },

      connectedCallback() {
        if (!this.isConnected) return;

        if (!(this[StageKey] & CoreElementStage.INITIALIZED)) {
          this[StageKey] |= CoreElementStage.INITIALIZED;
          this.initialize?.call(this);
        }

        // eslint-disable-next-line prefer-rest-params
        fireUndecoratedLifecycle(this, 'connectedCallback', arguments);
      },

      disconnectedCallback() {
        if (this.isConnected) return;

        // eslint-disable-next-line prefer-rest-params
        fireUndecoratedLifecycle(this, 'disconnectedCallback', arguments);
      },

      initialize() {
        // eslint-disable-next-line prefer-rest-params
        fireUndecoratedLifecycle(this, 'initialize', arguments);
      },

      propertyChangedCallback() {
        // eslint-disable-next-line prefer-rest-params
        fireUndecoratedLifecycle(this, 'propertyChangedCallback', arguments);
      },
    };

    defineLifecycles(WrappedClass.prototype, lifecycle);

    if (!hasOwnProperty.call(WrappedClass, 'observedAttributes')) {
      Object.defineProperty(WrappedClass, 'observedAttributes', {
        configurable: true,
        enumerable: true,
        get(): string[] {
          // return Object.getOwnPropertyNames(this[MapAttrsToPropsKey]);
          return Object.getOwnPropertyNames(WrappedClass.prototype[MapAttrsToPropsKey]);
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

tag.getUndecoratedLifecycles = getUndecoratedLifecycles;
