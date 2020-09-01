import {
  // DOMAttributeInfo,
  // DOMAttributeType,
  // NonStringTypeAttributesInfo,
  SpecialAttributesNameMap,
} from './DOMAttributes';

/**
 * Assign the property to the corresponding attribute of the DOM element.
 * For some special properties, the incoming value will be converted first
 * to make it suitable for DOM attributes.
 */
export function setValueForProperty<T extends Element>(
  element: T,
  name: string,
  value: unknown,
): void {
  /* eslint-disable no-param-reassign */
  if (Object.prototype.hasOwnProperty.call(SpecialAttributesNameMap, name)) {
    name = SpecialAttributesNameMap[name];
  }

  // if (Object.prototype.hasOwnProperty.call(NonStringTypeAttributesInfo, name)) {
  //   const attributeInfo = NonStringTypeAttributesInfo[name];

  //   if (mustUseProperty(element, name, attributeInfo)) {
  //     element[name] = normalizePropertyValue(element, name, value, attributeInfo);
  //     return;
  //   }

  //   if (value !== undefined) {
  //     if (attributeInfo.type === DOMAttributeType.BOOLEAN) {
  //       value = value ? '' : null;
  //     } else if (attributeInfo.type === DOMAttributeType.BOOLEANISH_STRING) {
  //       value = value ? 'true' : 'false';
  //     } else if (attributeInfo.type === DOMAttributeType.OVERLOADED_BOOLEAN) {
  //       if (typeof value === 'boolean') value = value ? '' : null;
  //       else value = String(value);
  //     } else {
  //       value = String(value);
  //     }
  //   }
  // }

  if (value === null || value === undefined) {
    element.removeAttribute(name);
  } else {
    element.setAttribute(name, String(value));
  }
  /* eslint-enable no-param-reassign */
}

/**
 * Determine whether it must be assigned as a property of the element,
 * and make a type assertion.
 */
// function mustUseProperty<T extends Element>(
//   _element: T,
//   _name: string,
//   attributeInfo: DOMAttributeInfo,
// ): _name is keyof T & string {
//   return !!attributeInfo.mustUseProperty;
// }

/**
 * Convert unsafe values for assignment to element properties.
 */
// function normalizePropertyValue<T extends Element, U extends keyof T>(
//   _element: T,
//   _name: U,
//   value: unknown,
//   attributeInfo: DOMAttributeInfo,
// ): T[U] {
//   if (value === undefined) {
//     return value as never;
//   }

//   if (attributeInfo.type === DOMAttributeType.BOOLEAN) {
//     return !!value as never;
//   }

//   if (attributeInfo.type === DOMAttributeType.BOOLEANISH_STRING) {
//     return (value ? 'true' : 'false') as never;
//   }

//   return value as never;
// }
