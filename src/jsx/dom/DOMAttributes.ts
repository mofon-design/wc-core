export const enum DOMAttributeType {
  /**
   * A simple string attribute.
   * Attributes that aren't in the whitelist are presumed to have this type.
   */
  STRING = 0,
  /**
   * A real boolean attribute.
   * - When `true`, it should be present (set either to an empty string or its name).
   * - When `false`, it should be omitted.
   */
  BOOLEAN = 1,
  /**
   * A string attribute that accepts booleans in React. In HTML, these are called
   * "enumerated" attributes with `'true'` and `'false'` as possible values.
   * - When `true`, it should be set to a `'true'` string.
   * - When `false`, it should be set to a `'false'` string.
   */
  BOOLEANISH_STRING = 2,
  /**
   * An attribute that can be used as a flag as well as with a value.
   * - When `true`, it should be present (set either to an empty string or its name).
   * - When `false`, it should be omitted.
   * - For any other value, should be present with that value.
   */
  OVERLOADED_BOOLEAN = 3,
}

export interface DOMAttributeInfo {
  mustUseProperty?: boolean;
  type: DOMAttributeType;
}

export const SpecialAttributesNameMap: Record<string, string> = {
  htmlFor: 'for',
  className: 'class',
};

export const NonStringTypeAttributesInfo: Record<string, DOMAttributeInfo> = {
  // These are "enumerated" HTML attributes that accept "true" and "false".
  // Like React, we let users pass `true` and `false` even though technically
  // these aren't boolean attributes (they are coerced to strings).
  contenteditable: { type: DOMAttributeType.BOOLEANISH_STRING },
  draggable: { type: DOMAttributeType.BOOLEANISH_STRING },
  spellcheck: { type: DOMAttributeType.BOOLEANISH_STRING },
  value: { type: DOMAttributeType.BOOLEANISH_STRING },

  // These are "enumerated" SVG attributes that accept "true" and "false".
  // Like React, we let users pass `true` and `false` even though technically
  // these aren't boolean attributes (they are coerced to strings).
  // Since these are SVG attributes, their attribute names are case-sensitive.
  autoReverse: { type: DOMAttributeType.BOOLEANISH_STRING },
  checked: { mustUseProperty: true, type: DOMAttributeType.BOOLEAN },
  externalResourcesRequired: { type: DOMAttributeType.BOOLEANISH_STRING },
  focusable: { type: DOMAttributeType.BOOLEANISH_STRING },
  preserveAlpha: { type: DOMAttributeType.BOOLEANISH_STRING },

  // These are HTML boolean attributes.
  allowfullscreen: { type: DOMAttributeType.BOOLEAN },
  async: { type: DOMAttributeType.BOOLEAN },
  autofocus: { type: DOMAttributeType.BOOLEAN },
  autoplay: { type: DOMAttributeType.BOOLEAN },
  controls: { type: DOMAttributeType.BOOLEAN },
  default: { type: DOMAttributeType.BOOLEAN },
  defer: { type: DOMAttributeType.BOOLEAN },
  disabled: { type: DOMAttributeType.BOOLEAN },
  disablepictureinpicture: { type: DOMAttributeType.BOOLEAN },
  formnovalidate: { type: DOMAttributeType.BOOLEAN },
  hidden: { type: DOMAttributeType.BOOLEAN },
  itemscope: { type: DOMAttributeType.BOOLEAN }, // Microdata
  loop: { type: DOMAttributeType.BOOLEAN },
  multiple: { mustUseProperty: true, type: DOMAttributeType.BOOLEAN },
  muted: { mustUseProperty: true, type: DOMAttributeType.BOOLEAN },
  nomodule: { type: DOMAttributeType.BOOLEAN },
  novalidate: { type: DOMAttributeType.BOOLEAN },
  open: { type: DOMAttributeType.BOOLEAN },
  playsinline: { type: DOMAttributeType.BOOLEAN },
  readonly: { type: DOMAttributeType.BOOLEAN },
  required: { type: DOMAttributeType.BOOLEAN },
  reversed: { type: DOMAttributeType.BOOLEAN },
  scoped: { type: DOMAttributeType.BOOLEAN },
  seamless: { type: DOMAttributeType.BOOLEAN },
  selected: { mustUseProperty: true, type: DOMAttributeType.BOOLEAN },

  // These are HTML attributes that are "overloaded booleans": they behave like
  // booleans, but can also accept a string value.
  capture: { type: DOMAttributeType.OVERLOADED_BOOLEAN },
  download: { type: DOMAttributeType.OVERLOADED_BOOLEAN },
};
