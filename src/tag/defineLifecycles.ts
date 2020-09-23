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
  let lifecycleDescriptor: PropertyDescriptor | undefined;

  const undecoratedLifecycles = makeSureUndecoratedLifecyclesStoreExists(Prototype);

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
      // * ASSERT `!lifecycleDescriptor.get && !lifecycleDescriptor.set`;
      Object.defineProperty(undecoratedLifecycles, lifecycleKey, lifecycleDescriptor);
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
        const lifecycles = makeSureUndecoratedLifecyclesStoreExists(this);

        Object.defineProperty(lifecycles, lifecycleKey, {
          configurable: true,
          enumerable: true,
          value,
          writable: false,
        });
      },
    });
  }
}

function makeSureUndecoratedLifecyclesStoreExists(
  instanceOrPrototype: Partial<CoreInternalElement>,
): CoreElementLifecycle {
  let undecoratedLifecycles: CoreElementLifecycle;

  if (
    hasOwnProperty.call(instanceOrPrototype, LifecyclesKey) &&
    instanceOrPrototype[LifecyclesKey]
  ) {
    undecoratedLifecycles = instanceOrPrototype[LifecyclesKey]!;
  } else {
    undecoratedLifecycles = {};

    if (instanceOrPrototype[LifecyclesKey]) {
      Object.defineProperties(
        undecoratedLifecycles,
        Object.getOwnPropertyDescriptors(instanceOrPrototype[LifecyclesKey]),
      );
    }

    Object.defineProperty(instanceOrPrototype, LifecyclesKey, {
      value: undecoratedLifecycles,
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  return undecoratedLifecycles;
}
