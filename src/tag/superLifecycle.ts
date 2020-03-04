/* eslint-disable no-underscore-dangle */
import { AnyConstructor, AnyFunction, ArgsType, PickPropertyKeysByExtends } from '../types/index';

type RewritedInstance<T, U> = T & { __superLifecycle?: Partial<U> };

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
export function rewriteLifecycle<T extends AnyConstructor, U>(Target: T, lifecycle: U) {
  const lifecycleKeys = Object.keys(lifecycle) as (keyof U)[];

  if (!Target.prototype.hasOwnProperty('__superLifecycle')) {
    Object.defineProperty(Target.prototype, '__superLifecycle', {
      value: { ...Target.prototype.__superLifecycle },
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
    Target.prototype.__superLifecycle[lifecycleKey] = Target.prototype[lifecycleKey];

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
        if (!this.hasOwnProperty('__superLifecycle'))
          Object.defineProperty(this, '__superLifecycle', {
            value: { ...this.__superLifecycle },
            configurable: true,
            enumerable: false,
            writable: false,
          });
        this.__superLifecycle![lifecycleKey as V] = value;
      },
    });
  });
}

export function callSuperLifecycle<
  T,
  U extends PickPropertyKeysByExtends<T, AnyFunction | undefined>
>(thisType: T, lifecycleKey: U, ...args: ArgsType<T[U]>): ReturnType<T[U]> | symbol {
  const superLifecycle = (thisType as { __superLifecycle?: Partial<T> }).__superLifecycle;

  if (!superLifecycle || !superLifecycle[lifecycleKey]) {
    return callSuperLifecycle.NOT_EXISTS;
  }

  return (superLifecycle[lifecycleKey] as AnyFunction).apply(thisType, args);
}

callSuperLifecycle.NOT_EXISTS = {} as symbol;

callSuperLifecycle.returnValueIsExists = <T>(value: T | symbol): value is Exclude<T, symbol> =>
  value !== callSuperLifecycle.NOT_EXISTS;
