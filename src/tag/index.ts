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
import { fireCollectedLifecycle } from './fireCollectedLifecycle';
import { getParentClassLifecycles } from './getParentClassLifecycles';

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
     * into `__lifecycles` so that child classes can use `tag.getSuperLifecycles`
     * to get the lifecycles of current class.
     */
    const lifecycle: ThisType<CoreInternalElement> & Required<CoreElementLifecycle> = {
      adoptedCallback(): void {
        fireCollectedLifecycle(this, 'adoptedCallback', []);
      },

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

        fireCollectedLifecycle(this, 'attributeChangedCallback', [name, oldValue, newValue]);
      },

      connectedCallback(): void {
        if (!(this[StageKey] & CoreElementStage.INITIALIZED)) {
          this[StageKey] |= CoreElementStage.INITIALIZED;
          this.initialize?.call(this);
        }

        fireCollectedLifecycle(this, 'connectedCallback', []);
      },

      disconnectedCallback(): void {
        fireCollectedLifecycle(this, 'disconnectedCallback', []);
      },

      initialize(): void {
        fireCollectedLifecycle(this, 'initialize', []);
      },

      propertyChangedCallback(property, oldValue, newValue): void {
        fireCollectedLifecycle(this, 'propertyChangedCallback', [property, oldValue, newValue]);
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

tag.getParentClassLifecycles = getParentClassLifecycles;
