import { AnyConstructor } from './any';
import { PickPropertyKeysByExtends } from './helper';

type PickThisPropKeys<
  T extends AnyConstructor,
  U extends { defaultValue?: unknown }
> = PickPropertyKeysByExtends<InstanceType<T>, U['defaultValue']>;

interface PropertyDecorator {
  <T extends AnyConstructor, U extends PickThisPropKeys<T, this>>(target: T, propertyKey: U): void;
  default(value: this['defaultValue']): this;
  defaultValue?: unknown;
  isOptional?: boolean;
  optional(): this;
}

export interface PropertyBooleanDecorator extends PropertyDecorator {
  defaultValue: boolean | null;
}

export interface PropertyNumberDecorator extends PropertyDecorator {
  defaultValue: number | null;
  oneOf?: number[];
  only(...numbers: number[]): this;
}

export interface PropertyStringDecorator extends PropertyDecorator {
  defaultValue: string | null;
  oneOf?: string[];
  only(...strings: string[]): this;
}

export interface PropertyDecoratorMap {
  boolean: PropertyBooleanDecorator;
  number: PropertyNumberDecorator;
  string: PropertyStringDecorator;
}
