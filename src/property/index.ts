import { CoreElement, PropertyDecoratorOptions } from '../types';
import { getPropertyDecoratorCreator } from './getPropertyDecoratorCreator';
import * as presets from './presets';

function property(customAttribute?: string) {
  const propertyDecoratorCreator = getPropertyDecoratorCreator(customAttribute);

  return {
    custom: propertyDecoratorCreator,
    boolean: function booleanPropertyDecoratorCreator<T extends CoreElement>(
      options?: PropertyDecoratorOptions<T, boolean | undefined>,
    ) {
      return propertyDecoratorCreator<T, boolean | undefined>(
        presets.booleanPropertyValueDefaultFormatter,
        presets.booleanAttributeValueDefaultFormatter,
        options,
      );
    },
    number: function numberPropertyDecoratorCreator<T extends CoreElement>(
      options?: PropertyDecoratorOptions<T, number | undefined>,
    ) {
      return propertyDecoratorCreator<T, number | undefined>(
        presets.numberPropertyValueDefaultFormatter,
        presets.attributeValueDefaultFormatter,
        options,
      );
    },
    string: function stringPropertyDecoratorCreator<T extends CoreElement>(
      options?: PropertyDecoratorOptions<T, string | undefined>,
    ) {
      return propertyDecoratorCreator<T, string | undefined>(
        presets.stringPropertyValueDefaultFormatter,
        presets.attributeValueDefaultFormatter,
        options,
      );
    },
  };
}

const propertyWithPresets = Object.assign(property, property());

export { propertyWithPresets as property };
