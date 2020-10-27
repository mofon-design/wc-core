import { CoreElement, PropertyDecoratorOptions } from '../types';
import { getPropertyDecoratorCreator } from './getPropertyDecoratorCreator';
import {
  attributeValueDefaultFormatter,
  booleanAttributeValueDefaultFormatter,
  booleanPropertyValueDefaultFormatter,
  numberPropertyValueDefaultFormatter,
  stringPropertyValueDefaultFormatter,
} from './presets';

function property(customAttribute?: string) {
  const propertyDecoratorCreator = getPropertyDecoratorCreator(customAttribute);

  return {
    custom: propertyDecoratorCreator,
    /**
     * @example
     * ```html
     * <my-element>value is `false`</my-element>
     * <my-element bool-attribute>value is `true`</my-element>
     * <my-element bool-attribute="">value is `true`</my-element>
     * ```
     */
    boolean: function booleanPropertyDecoratorCreator<T extends CoreElement>(
      options?: PropertyDecoratorOptions<T, boolean | undefined>,
    ) {
      return propertyDecoratorCreator<T, boolean | undefined>(
        booleanPropertyValueDefaultFormatter,
        booleanAttributeValueDefaultFormatter,
        options,
      );
    },
    /**
     * @example
     * ```html
     * <my-element>value is `undefined`</my-element>
     * <my-element number-attribute="123">value is `123`</my-element>
     * ```
     */
    number: function numberPropertyDecoratorCreator<T extends CoreElement>(
      options?: PropertyDecoratorOptions<T, number | undefined>,
    ) {
      return propertyDecoratorCreator<T, number | undefined>(
        numberPropertyValueDefaultFormatter,
        attributeValueDefaultFormatter,
        options,
      );
    },
    /**
     * @example
     * ```html
     * <my-element>value is `undefined`</my-element>
     * <my-element string-attribute>value is `''`</my-element>
     * <my-element string-attribute="">value is `''`</my-element>
     * <my-element string-attribute="hello">value is `'hello'`</my-element>
     * ```
     */
    string: function stringPropertyDecoratorCreator<T extends CoreElement>(
      options?: PropertyDecoratorOptions<T, string | undefined>,
    ) {
      return propertyDecoratorCreator<T, string | undefined>(
        stringPropertyValueDefaultFormatter,
        attributeValueDefaultFormatter,
        options,
      );
    },
  };
}

const propertyWithPresets = Object.assign(property, property());

export { propertyWithPresets as property };
