import { PickPropertyKeysByExtends } from './helper';

interface PropertyDecorator {
  <T, U extends PickPropertyKeysByExtends<T, this['fallbackValue']>>(
    target: T,
    propertyKey: U,
  ): void;
  /**
   * When the value passed in is `undefined` or `null` or not in the options specified by
   * `only(...)`, the property value will fallback to this one.
   */
  fallback(value: this['fallbackValue']): this;
  /**
   * The fallback value of the property.
   */
  fallbackValue?: unknown;
}

export interface PropertyBooleanDecorator extends PropertyDecorator {
  fallbackValue?: boolean;
}

export interface PropertyNumberDecorator extends PropertyDecorator {
  fallbackValue?: number;
  /**
   * The value must be at least equal to one of the members of the array.
   */
  oneOf?: number[];
  /**
   * Indicate that the value passed in the assignment must be the specified value or values.
   */
  only(...numbers: number[]): this;
}

export interface PropertyStringDecorator extends PropertyDecorator {
  fallbackValue?: string;
  /**
   * The value must be at least equal to one of the members of the array.
   */
  oneOf?: string[];
  /**
   * Indicate that the value passed in the assignment must be the specified value or values.
   */
  only(...strings: string[]): this;
}

export interface PropertyDecoratorMap {
  boolean: PropertyBooleanDecorator;
  number: PropertyNumberDecorator;
  string: PropertyStringDecorator;
}
