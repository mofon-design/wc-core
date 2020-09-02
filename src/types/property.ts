import { PickPropertyKeysByExtends } from './helper';

interface PropertyDecorator {
  <T, U extends PickPropertyKeysByExtends<T, this['fallbackValue']>>(
    target: T,
    propertyKey: U,
  ): void;
  /**
   * The fallback value of the property.
   */
  readonly fallbackValue?: unknown;
  /**
   * When the value passed in is `undefined` or `null` or not in the options specified by
   * `only(...)`, the property value will fallback to this one.
   *
   * @description
   * It should be noted that custom formatter will override `.fallback()`.
   */
  fallback<T extends this['fallbackValue']>(value: T): this;
  /**
   * Accept a custom processing function, which can format the value passed into setter
   * as property value.
   *
   * @description
   * It should be noted that custom formatter will override `.fallback()` and `.only()`.
   */
  format<T extends this['fallbackValue']>(formatter: (unformatted: unknown) => T): this;
  /**
   * Accept a custom listener which will be triggered when the property value changes.
   */
  listen<T extends this['fallbackValue']>(listener: (oldValue: T, newValue: T) => void): this;
}

interface InternalPropertyDecorator extends PropertyDecorator {
  /**
   * A custom handler that formats the value passed into the setter as the property value.
   * Set by `.format()`.
   */
  formatter(unformatted: unknown): this['fallbackValue'];
  /**
   * A custom listener which will be triggered when the property value changes
   */
  listener?(oldValue: this['fallbackValue'], newValue: this['fallbackValue']): void;
}

export interface PropertyBooleanDecorator extends PropertyDecorator {
  readonly fallbackValue?: boolean;
}

export interface InternalPropertyBooleanDecorator
  extends InternalPropertyDecorator,
    PropertyBooleanDecorator {
  fallbackValue?: boolean;
}

export interface PropertyNumberDecorator extends PropertyDecorator {
  readonly fallbackValue?: number;
  /**
   * Indicate that the value passed in the assignment must be the specified value or values.
   *
   * @description
   * It should be noted that custom formatter will override `.only()`.
   */
  only(...numbers: number[]): this;
}

export interface InternalPropertyNumberDecorator
  extends InternalPropertyDecorator,
    PropertyNumberDecorator {
  fallbackValue?: number;
  /**
   * The value must be at least equal to one of the members of the array.
   */
  oneOf?: number[];
}

export interface PropertyStringDecorator extends PropertyDecorator {
  readonly fallbackValue?: string;
  /**
   * Indicate that the value passed in the assignment must be the specified value or values.
   *
   * @description
   * It should be noted that custom formatter will override `.only()`.
   */
  only(...strings: string[]): this;
}

export interface InternalPropertyStringDecorator
  extends InternalPropertyDecorator,
    PropertyStringDecorator {
  fallbackValue?: string;
  /**
   * The value must be at least equal to one of the members of the array.
   */
  oneOf?: string[];
}

export interface PropertyDecoratorMap {
  boolean: PropertyBooleanDecorator;
  number: PropertyNumberDecorator;
  string: PropertyStringDecorator;
}
