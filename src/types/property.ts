import { PickPropertyKeysByExtends } from './helper';
import { CoreElement } from './tag';

export interface PropertyDecorator<T extends CoreElement, U> {
  <V extends PickPropertyKeysByExtends<T, U>>(target: T, propertyKey: V): void;
}

export interface PropertyDecoratorOptions<T extends CoreElement, U> {
  enumerable?: boolean;
  watcher?(this: T, oldValue: U | undefined, newValue: U): void;
}
