import { AnyConstructor, AnyFunction, ArgsType, PickPropertyKeysByExtends } from '../types/index';
import { SuperLifecycleKey } from './privatePropertiesKey';

type RewritedInstance<T, U> = T & { [key in typeof SuperLifecycleKey]?: Partial<U> };

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
  const lifecycleKeys = Object.keys(lifecycle) as (keyof U)[];

  if (!Object.prototype.hasOwnProperty.call(Target.prototype, SuperLifecycleKey)) {
    Object.defineProperty(Target.prototype, SuperLifecycleKey, {
      value: { ...Target.prototype[SuperLifecycleKey] },
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }

  lifecycleKeys.forEach(lifecycleKey => {
    /**
     * @example
     * class ChildClass extends ParentClass {
     *   anyLifecycle() {
     *     console.log('lifecycle has been rewrited.');
     *   }
     * }
     */
    // eslint-disable-next-line no-param-reassign
    Target.prototype[SuperLifecycleKey][lifecycleKey] = Target.prototype[lifecycleKey];

    /**
     * @example
     * class ChildClass extends ParentClass {
     *   anyLifecycle = () => {
     *     console.log('lifecycle has been rewrited.');
     *   }
     * }
     */
    Object.defineProperty(Target.prototype, lifecycleKey, {
      configurable: true,
      enumerable: false,
      get() {
        return lifecycle[lifecycleKey];
      },
      set<V extends keyof U>(this: RewritedInstance<T, U>, value: U[V]) {
        if (!Object.prototype.hasOwnProperty.call(this, SuperLifecycleKey))
          Object.defineProperty(this, SuperLifecycleKey, {
            value: { ...this[SuperLifecycleKey] },
            configurable: true,
            enumerable: false,
            writable: false,
          });
        this[SuperLifecycleKey]![lifecycleKey as V] = value;
      },
    });
  });
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

callSuperLifecycle.returnValueIsExists = <T>(value: T | symbol): value is Exclude<T, symbol> =>
  value !== callSuperLifecycle.NOT_EXISTS;