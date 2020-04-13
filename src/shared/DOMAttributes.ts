export const enum DOMAttributeMark {
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
  USE_PROPERTY = 1 << 2,
}

export const SpecialAttributes: Record<string, DOMAttributeMark> = {
  // These are "enumerated" HTML attributes that accept "true" and "false".
  // In React, we let users pass `true` and `false` even though technically
  // these aren't boolean attributes (they are coerced to strings).
  contenteditable: DOMAttributeMark.BOOLEANISH_STRING,
  draggable: DOMAttributeMark.BOOLEANISH_STRING,
  spellcheck: DOMAttributeMark.BOOLEANISH_STRING,
  value: DOMAttributeMark.BOOLEANISH_STRING,

  // These are "enumerated" SVG attributes that accept "true" and "false".
  // In React, we let users pass `true` and `false` even though technically
  // these aren't boolean attributes (they are coerced to strings).
  // Since these are SVG attributes, their attribute names are case-sensitive.
  autoReverse: DOMAttributeMark.BOOLEANISH_STRING,
  checked: DOMAttributeMark.BOOLEAN & DOMAttributeMark.USE_PROPERTY,
  externalResourcesRequired: DOMAttributeMark.BOOLEANISH_STRING,
  focusable: DOMAttributeMark.BOOLEANISH_STRING,
  preserveAlpha: DOMAttributeMark.BOOLEANISH_STRING,

  // These are HTML boolean attributes.
  allowfullscreen: DOMAttributeMark.BOOLEAN,
  async: DOMAttributeMark.BOOLEAN,
  autofocus: DOMAttributeMark.BOOLEAN,
  autoplay: DOMAttributeMark.BOOLEAN,
  controls: DOMAttributeMark.BOOLEAN,
  default: DOMAttributeMark.BOOLEAN,
  defer: DOMAttributeMark.BOOLEAN,
  disabled: DOMAttributeMark.BOOLEAN,
  disablepictureinpicture: DOMAttributeMark.BOOLEAN,
  formnovalidate: DOMAttributeMark.BOOLEAN,
  hidden: DOMAttributeMark.BOOLEAN,
  itemscope: DOMAttributeMark.BOOLEAN, // Microdata
  loop: DOMAttributeMark.BOOLEAN,
  multiple: DOMAttributeMark.BOOLEAN & DOMAttributeMark.USE_PROPERTY,
  muted: DOMAttributeMark.BOOLEAN & DOMAttributeMark.USE_PROPERTY,
  nomodule: DOMAttributeMark.BOOLEAN,
  novalidate: DOMAttributeMark.BOOLEAN,
  open: DOMAttributeMark.BOOLEAN,
  playsinline: DOMAttributeMark.BOOLEAN,
  readonly: DOMAttributeMark.BOOLEAN,
  required: DOMAttributeMark.BOOLEAN,
  reversed: DOMAttributeMark.BOOLEAN,
  scoped: DOMAttributeMark.BOOLEAN,
  seamless: DOMAttributeMark.BOOLEAN,
  selected: DOMAttributeMark.BOOLEAN & DOMAttributeMark.USE_PROPERTY,

  // These are HTML attributes that are "overloaded booleans": they behave like
  // booleans, but can also accept a string value.
  capture: DOMAttributeMark.OVERLOADED_BOOLEAN,
  download: DOMAttributeMark.OVERLOADED_BOOLEAN,
};
