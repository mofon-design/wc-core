export interface Constructor<T> {
  new (...args: any[]): T;
}

export type PickPropertyKeysByExtends<T, U> = {
  [V in keyof T]: T[V] extends U ? V : never;
}[keyof T];

export type OmitPropertyKeysByExtends<T, U> = {
  [V in keyof T]: T[V] extends U ? never : V;
}[keyof T];

export type PickPropertiesByExtends<T, U> = Pick<T, PickPropertyKeysByExtends<T, U>>;

export type OmitPropertiesByExtends<T, U> = Pick<T, OmitPropertyKeysByExtends<T, U>>;
