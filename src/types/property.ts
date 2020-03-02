import { PickPropertyKeysByExtends } from './helper';

interface PropertyDecorator {
  default(value: this['defaultValue']): this;
  defaultValue?: unknown;
  isRequired?: boolean;
  required(): this;
}

export interface PropertyBooleanDecorator extends PropertyDecorator {
  <T, U extends PickPropertyKeysByExtends<T, boolean>>(target: T, propertyKey: U): void;
  defaultValue?: boolean;
}

export interface PropertyNumberDecorator extends PropertyDecorator {
  <T, U extends PickPropertyKeysByExtends<T, number>>(target: T, propertyKey: U): void;
  defaultValue?: number;
  oneOf?: number[];
  only(...numbers: number[]): this;
}

export interface PropertyStringDecorator extends PropertyDecorator {
  <T, U extends PickPropertyKeysByExtends<T, string>>(target: T, propertyKey: U): void;
  defaultValue?: string;
  oneOf?: string[];
  only(...strings: string[]): this;
}

export interface PropertyDecoratorMap {
  boolean: PropertyBooleanDecorator;
  number: PropertyNumberDecorator;
  string: PropertyStringDecorator;
}
