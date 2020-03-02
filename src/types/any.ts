import { Constructor } from './helper';

export type AnyConstructor = Constructor<any>;

export type AnyFunction = (...args: any[]) => any;
