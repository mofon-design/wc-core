import { SuperLifecycleKey } from '../shared/privatePropertiesKey';
import { AnyConstructor, AnyFunction, ArgsType, PickPropertyKeysByExtends } from '../types';

type RewritedInstance<T, U> = T & { [key in typeof SuperLifecycleKey]?: Partial<U> };

const hasOwnProperty = Object.prototype.hasOwnProperty;

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
export function overrideLifecycle<T extends AnyConstructor, U>(Target: T, lifecycle: U) {
  if (!hasOwnProperty.call(Target.prototype, SuperLifecycleKey)) {
    Object.defineProperty(Target.prototype, SuperLifecycleKey, {
      value: { ...Target.prototype[SuperLifecycleKey] },
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  const superLifecycles = Target.prototype[SuperLifecycleKey];
  let superLifecycleDescriptor: PropertyDescriptor | undefined;

  for (const lifecycleKey in lifecycle) {
    if (!hasOwnProperty.call(lifecycle, lifecycleKey)) {
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
    superLifecycleDescriptor = Object.getOwnPropertyDescriptor(Target.prototype, lifecycleKey);
    if (superLifecycleDescriptor) {
      Object.defineProperty(superLifecycles, lifecycleKey, superLifecycleDescriptor);
    }

    Object.defineProperty(Target.prototype, lifecycleKey, {
      configurable: true,
      enumerable: false,
      get() {
        return lifecycle[lifecycleKey];
      },
      set(this: RewritedInstance<T, U>, value: U[typeof lifecycleKey]) {
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

        this[SuperLifecycleKey]![lifecycleKey] = value;
      },
    });
  }
}

export function callSuperLifecycle<
  T,
  U extends PickPropertyKeysByExtends<T, AnyFunction | undefined>
>(thisType: T, lifecycleKey: U, ...args: ArgsType<T[U]>): ReturnType<T[U]> | symbol {
  const superLifecycle = (thisType as RewritedInstance<T, T>)[SuperLifecycleKey];

  if (!superLifecycle || !superLifecycle[lifecycleKey]) {
    return callSuperLifecycle.NOT_EXISTS;
  }

  return (superLifecycle[lifecycleKey] as AnyFunction).apply(thisType, args);
}

callSuperLifecycle.NOT_EXISTS = {} as symbol;

callSuperLifecycle.returnValueIsExists = <T>(value: T | symbol): value is T =>
  value !== callSuperLifecycle.NOT_EXISTS;
