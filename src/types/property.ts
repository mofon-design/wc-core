import { PickPropertyKeysByExtends } from './helper';

interface PropertyDecorator {
  default(value: this['defaultValue']): this;
  defaultValue?: unknown;
  isOptional?: boolean;
  optional(): this;
}

export interface PropertyBooleanDecorator extends PropertyDecorator {
  <T, U extends PickPropertyKeysByExtends<T, boolean | null>>(target: T, propertyKey: U): void;
  defaultValue: boolean | null;
}

export interface PropertyNumberDecorator extends PropertyDecorator {
  <T, U extends PickPropertyKeysByExtends<T, number | null>>(target: T, propertyKey: U): void;
  defaultValue: number | null;
  oneOf?: number[];
  only(...numbers: number[]): this;
}

export interface PropertyStringDecorator extends PropertyDecorator {
  <T, U extends PickPropertyKeysByExtends<T, string | null>>(target: T, propertyKey: U): void;
  defaultValue: string | null;
  oneOf?: string[];
  only(...strings: string[]): this;
}

export interface PropertyDecoratorMap {
  boolean: PropertyBooleanDecorator;
  number: PropertyNumberDecorator;
  string: PropertyStringDecorator;
}
