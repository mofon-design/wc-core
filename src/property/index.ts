import { PropertyDecoratorMap } from '../types';
import { getPropertyBooleanDecorator } from './boolean';
import { getPropertyNumberDecorator } from './number';
import { getPropertyStringDecorator } from './string';

export function property<T extends keyof PropertyDecoratorMap>(
  type: T,
  attribute?: string,
): PropertyDecoratorMap[T] {
  let decorator: PropertyDecoratorMap[keyof PropertyDecoratorMap];

  if (type === 'boolean') {
    decorator = getPropertyBooleanDecorator(attribute);
  } else if (type === 'number') {
    decorator = getPropertyNumberDecorator(attribute);
  } else {
    decorator = getPropertyStringDecorator(attribute);
  }

  return decorator as PropertyDecoratorMap[T];
}
