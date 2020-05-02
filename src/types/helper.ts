import { AnyFunction } from './any';

export interface Constructor<T, U extends any[] = any[]> {
  new (...args: U): T;
}

export interface ClassType<T, U extends any[] = any[]> {
  new (...args: U): T;
  prototype: T;
}

export type PickPropertyKeysByExtends<T, U> = {
  [V in keyof T]: T[V] extends U ? V : never;
}[keyof T];

export type OmitPropertyKeysByExtends<T, U> = {
  [V in keyof T]: T[V] extends U ? never : V;
}[keyof T];

export type PickPropertiesByExtends<T, U> = Pick<T, PickPropertyKeysByExtends<T, U>>;

export type OmitPropertiesByExtends<T, U> = Pick<T, OmitPropertyKeysByExtends<T, U>>;

export type NonFunctionPropertyKeys<T> = OmitPropertyKeysByExtends<T, AnyFunction | undefined>;

export type OmitUnion<T, U> = T & Pick<U, Exclude<keyof U, keyof T>>;

export type ArgsType<T extends AnyFunction> = T extends (...args: infer U) => any ? U : never;
