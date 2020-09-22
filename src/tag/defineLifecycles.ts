import { LifecyclesKey } from '../shared/privatePropertyKeys';
import { AnyFunction, CoreElementLifecycle, CoreInternalElement } from '../types';

const hasOwnProperty = Object.prototype.hasOwnProperty;

function isKeyof<T>(object: T, key: keyof any): key is keyof T {
  return hasOwnProperty.call(object, key);
}

/**
 * After being wrapped by the class decorator `tag`, the lifecycle callbacks will be
 * transferred to the property `__lifecycles` in prototype as an accessor
 * to avoid overriding after the instance is constructed.
 *
 * @example
 * ```ts
 * class MyElement extends HTMLElement {
 *   constructor() {
 *     super();
 *     this.anyLifecycle = () => console.log('lifecycle has been rewrited.');
 *   }
 * }
 * tag('my-element')(MyElement);
 * ```
 */
export function defineLifecycles(
  Prototype: Partial<CoreInternalElement>,
  incomingLifecycles: Required<CoreElementLifecycle>,
) {
  let collectedLifecycles: Partial<CoreElementLifecycle>;
  let lifecycleDescriptor: PropertyDescriptor | undefined;

  if (hasOwnProperty.call(Prototype, LifecyclesKey)) {
    collectedLifecycles = Prototype[LifecyclesKey]!;
  } else {
    collectedLifecycles = {};

    Object.defineProperty(Prototype, LifecyclesKey, {
      value: collectedLifecycles,
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  for (const lifecycleKey in incomingLifecycles) {
    if (!isKeyof(incomingLifecycles, lifecycleKey)) {
      continue;
    }

    /**
     * @example
     * class MyElement extends HTMLElement {
     *   anyLifecycle() {
     *     ...
     *   }
     * }
     */
    lifecycleDescriptor = Object.getOwnPropertyDescriptor(Prototype, lifecycleKey);
    if (lifecycleDescriptor) {
      // * ASSERT `lifecycleDescriptor.configurable !== false`;
      Object.defineProperty(collectedLifecycles, lifecycleKey, lifecycleDescriptor);
    }

    Object.defineProperty(Prototype, lifecycleKey, {
      configurable: true,
      enumerable: false,
      get() {
        return incomingLifecycles[lifecycleKey];
      },
      /**
       * @param this prototype or instance
       *
       * @example prototype
       * @tag('my-element')
       * class MyElement extends HTMLElement {
       *   anyLifecycle() {
       *     ...
       *   }
       * }
       *
       * MyElement.prototype.anyLifecycle = function anyLifecycle() {
       *   ...
       * };
       *
       * @example instance
       * @tag('my-element')
       * class MyElement extends HTMLElement {
       *   anyLifecycle = () => {
       *     ...
       *   }
       * }
       */
      set(this: CoreInternalElement, value: AnyFunction) {
        if (!hasOwnProperty.call(this, LifecyclesKey)) {
          Object.defineProperty(this, LifecyclesKey, {
            value: { ...this[LifecyclesKey] },
            configurable: true,
            enumerable: false,
            writable: false,
          });
        }

        this[LifecyclesKey][lifecycleKey] = value;
      },
    });
  }
}
