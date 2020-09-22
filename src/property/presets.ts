import { StageKey } from '../shared/privatePropertyKeys';
import { CoreElement, CoreElementStage, CoreInternalElement } from '../types';

export function attributeValueDefaultFormatter(value: unknown): string | null {
  return value === undefined || value === null ? null : String(value);
}

/**
 * Convert boolean to a html attribute value.
 *
 * @example
 * ```html
 * <my-element>False</my-element>
 * <my-element bool-attribute>True</my-element>
 * <my-element bool-attribute="">True</my-element>
 * ```
 */
export function booleanAttributeValueDefaultFormatter(value: boolean | undefined): string | null {
  return value ? '' : null;
}

/**
 * If the current value is an HTML attribute value,
 * the empty string is also treated as true.
 *
 * @example
 * ```html
 * <my-element>False</my-element>
 * <my-element bool-attribute>True</my-element>
 * <my-element bool-attribute="">True</my-element>
 * ```
 */
export function booleanPropertyValueDefaultFormatter<T extends CoreElement>(
  this: T & Partial<CoreInternalElement>,
  value: unknown,
): boolean | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (value === '') {
    const stage = this[StageKey];
    if (stage !== undefined && stage & CoreElementStage.SYNC_ATTRIBUTE) {
      return true;
    }
  }

  return Boolean(value);
}

/**
 * Convert any type of value to a number.
 *
 * @description
 * `null` and `''` will be treated as `undefined`, and return fallback value.
 */
export function numberPropertyValueDefaultFormatter<T extends CoreElement>(
  this: T & Partial<CoreInternalElement>,
  value: unknown,
  oldValue: number | undefined,
): number | undefined {
  /**
   * - Number(null) === 0
   */
  if (value === null || value === undefined) {
    return undefined;
  }

  /**
   * - Number('') === 0
   *
   * @or if (String(value) === '')
   */
  if (value === '') {
    return oldValue;
  }

  const numberifiedValue = Number(value);

  return Number.isNaN(numberifiedValue) ? oldValue : numberifiedValue;
}

/**
 * Convert any type of value to a string.
 */
export function stringPropertyValueDefaultFormatter<T extends CoreElement>(
  this: T & Partial<CoreInternalElement>,
  value: unknown,
): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  const stringifiedValue = value ? String(value) : '';

  return stringifiedValue;
}
