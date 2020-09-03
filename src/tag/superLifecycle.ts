import { SuperLifecycleKey } from '../shared/privatePropertiesKey';
import { AnyFunction, ArgsType, CoreElementLifecycle, CoreInternalElement } from '../types';

const hasOwnProperty = Object.prototype.hasOwnProperty;

function isKeyof<T>(object: T, key: keyof any): key is keyof T {
  return hasOwnProperty.call(object, key);
}

/**
 * After being wrapped by a class decorator, the lifecycle callbacks will be defined to
 * the prototype as an accessor to avoid overriding after the instance is constructed.
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
export function overrideLifecycle(
  Prototype: Partial<CoreInternalElement>,
  lifecycle: Partial<CoreElementLifecycle>,
) {
  let superLifecycles: Partial<CoreElementLifecycle>;
  let superLifecycleDescriptor: PropertyDescriptor | undefined;

  if (hasOwnProperty.call(Prototype, SuperLifecycleKey)) {
    superLifecycles = Prototype[SuperLifecycleKey]!;
  } else {
    /**
     * * ASSERT `!(SuperLifecycleKey in Prototype)`
     *
     * @description
     * The current class should not inherit from a parent class that has been wrapped
     * by the `@tag()` decorator, otherwise, a loop call may be raised.
     */
    Object.defineProperty(Prototype, SuperLifecycleKey, {
      value: superLifecycles = {},
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  for (const lifecycleKey in lifecycle) {
    if (!isKeyof(lifecycle, lifecycleKey)) {
      continue;
    }

    /**
     * @example
     * class ChildClass extends ParentClass {
     *   anyLifecycle() {
     *     console.log('lifecycle has been rewrited.');
     *   }
     * }
     */
    superLifecycleDescriptor = Object.getOwnPropertyDescriptor(Prototype, lifecycleKey);
    if (superLifecycleDescriptor) {
      Object.defineProperty(superLifecycles, lifecycleKey, superLifecycleDescriptor);
    }

    Object.defineProperty(Prototype, lifecycleKey, {
      configurable: true,
      enumerable: false,
      get() {
        return lifecycle[lifecycleKey];
      },
      set(this: CoreInternalElement, value: AnyFunction) {
        /**
         * @example
         * class ChildClass extends ParentClass {
         *   anyLifecycle = () => {
         *     console.log('lifecycle has been rewrited.');
         *   }
         * }
         */
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

export function callSuperLifecycle<T extends keyof CoreElementLifecycle>(
  self: CoreInternalElement,
  lifecycleKey: T,
  args: ArgsType<Required<CoreElementLifecycle>[T]>,
): ReturnType<Required<CoreElementLifecycle>[T]> | symbol {
  const superLifecycle = self[SuperLifecycleKey];

  if (
    !superLifecycle ||
    !hasOwnProperty.call(superLifecycle, lifecycleKey) ||
    !superLifecycle[lifecycleKey]
  ) {
    return callSuperLifecycle.NOT_EXISTS;
  }

  return (superLifecycle[lifecycleKey] as AnyFunction).apply(self, args);
}

callSuperLifecycle.NOT_EXISTS = {} as symbol;

callSuperLifecycle.returnValueIsExists = <T>(value: T | symbol): value is T =>
  value !== callSuperLifecycle.NOT_EXISTS;
