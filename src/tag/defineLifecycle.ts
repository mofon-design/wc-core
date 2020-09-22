import { SuperLifecycleKey } from '../shared/privatePropertiesKey';
import {
  AnyFunction,
  ArgsType,
  CoreElement,
  CoreElementLifecycle,
  CoreInternalElement,
} from '../types';

const hasOwnProperty = Object.prototype.hasOwnProperty;

function isKeyof<T>(object: T, key: keyof any): key is keyof T {
  return hasOwnProperty.call(object, key);
}

/**
 * After being wrapped by the class decorator `tag`, the lifecycle callbacks will be
 * transferred to the property `__superLifecycle` in prototype as an accessor
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
export function defineLifecycle(
  Prototype: Partial<CoreInternalElement>,
  incomingLifecycles: Required<CoreElementLifecycle>,
) {
  let collectedLifecycles: Partial<CoreElementLifecycle>;
  let lifecycleDescriptor: PropertyDescriptor | undefined;

  if (hasOwnProperty.call(Prototype, SuperLifecycleKey)) {
    collectedLifecycles = Prototype[SuperLifecycleKey]!;
  } else {
    collectedLifecycles = {};

    Object.defineProperty(Prototype, SuperLifecycleKey, {
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
        if (!hasOwnProperty.call(this, SuperLifecycleKey)) {
          Object.defineProperty(this, SuperLifecycleKey, {
            value: { ...this[SuperLifecycleKey] },
            configurable: true,
            enumerable: false,
            writable: false,
          });
        }

        this[SuperLifecycleKey][lifecycleKey] = value;
      },
    });
  }
}

declare const NOT_EXISTS: unique symbol;

export function fireCollectedLifecycle<T extends keyof CoreElementLifecycle>(
  self: CoreInternalElement,
  lifecycleKey: T,
  args: ArgsType<Required<CoreElementLifecycle>[T]>,
): ReturnType<Required<CoreElementLifecycle>[T]> | typeof NOT_EXISTS {
  const lifecycle = self[SuperLifecycleKey];

  if (!lifecycle || !hasOwnProperty.call(lifecycle, lifecycleKey) || !lifecycle[lifecycleKey]) {
    return fireCollectedLifecycle.NOT_EXISTS;
  }

  return (lifecycle[lifecycleKey] as AnyFunction).apply(self, args);
}

fireCollectedLifecycle.NOT_EXISTS = {} as typeof NOT_EXISTS;

fireCollectedLifecycle.isExists = <T>(value: T | typeof NOT_EXISTS): value is T =>
  value !== fireCollectedLifecycle.NOT_EXISTS;

export function getSuperLifecycle<T extends CoreElement>(self: T): Partial<CoreElementLifecycle> {
  return (self as Partial<CoreInternalElement>)[SuperLifecycleKey] ?? {};
}
