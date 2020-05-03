// eslint-disable-next-line import/no-extraneous-dependencies
import * as CSS from 'csstype';
import { ClassType } from './helper';
import { CoreElementConstructor } from './tag';

declare namespace MDWC {
  /**
   * Keys help MDWC identify which items have changed, are added, or are removed.
   *
   * @description
   * Keys used within arrays should be unique among their siblings.
   * However they don’t need to be globally unique.
   */
  export type Key = string | number;

  export interface RefObject<T> {
    readonly current: T | null;
  }

  export interface RefCallback<T> {
    (instance: T | null): void;
  }

  export type Ref<T> = RefCallback<T> | RefObject<T> | null;

  export type Fragment = ClassType<{ children?: MDWCNode }, [{}]>;

  export type MDWCElementType = string | CoreElementConstructor | Fragment;

  export interface MDWCElement {
    children?: MDWCNode;
    key?: Key;
    props: object;
    ref?: Ref<unknown>;
    type: MDWCElementType;
  }

  export type MDWCText = string | number;

  export type MDWCNode = MDWCElement | MDWCText | boolean | null | undefined | MDWCNode[];

  export interface Props<T> {
    key?: Key;
    ref?: Ref<T>;
  }

  export interface Attributes {
    key?: Key;
  }

  export interface ClassAttributes<T> extends Attributes {
    ref?: Ref<T>;
  }

  export type MayNotBeHTMLAttributeKeys =
    | keyof (WindowEventHandlers & DocumentAndElementEventHandlers & GlobalEventHandlers)
    | 'children';

  export type OmitMayNotBeHTMLAttributes<T extends {}> = Partial<
    Pick<T, Exclude<keyof T, MayNotBeHTMLAttributeKeys>>
  >;

  /**
   * The index signature was removed to enable closed typing for style
   * using CSSType. You're able to use type assertion or module augmentation
   * to add properties or an index signature of your own.
   *
   * For examples and more information, visit:
   * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
   */
  export interface CSSProperties extends CSS.Properties {}

  export type CSSPropertiesWithCustoms = CSSProperties & Record<string, unknown>;

  // @ts-ignore
  export interface DetailedHTMLProps<T extends {}, U> extends T, ClassAttributes<U> {
    children?: MDWCNode;
    style?: CSSProperties;
  }

  // @ts-ignore
  export interface DetailedClassComponentProps<T extends {}> extends T, ClassAttributes<T> {}

  export interface SVGProps<T> extends SVGAttributes, ClassAttributes<T> {}

  export type Booleanish = boolean | 'true' | 'false';

  /**
   * All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
   *
   * @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts|types/react}
   */
  export interface AriaAttributes {
    /**
     * Identifies the currently active element when DOM focus is on a composite widget,
     * textbox, group, or application.
     */
    'aria-activedescendant'?: string;
    /**
     * Indicates whether assistive technologies will present all, or only parts of,
     * the changed region based on the change notifications defined by the aria-relevant attribute.
     */
    'aria-atomic'?: boolean | 'false' | 'true';
    /**
     * Indicates whether inputting text could trigger display of one or more predictions
     * of the user's intended value for an input and specifies how predictions would be
     * presented if they are made.
     */
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
    /**
     * Indicates an element is being modified and that assistive technologies MAY want to
     * wait until the modifications are complete before exposing them to the user.
     */
    'aria-busy'?: boolean | 'false' | 'true';
    /**
     * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
     *
     * @see aria-pressed @see aria-selected.
     */
    'aria-checked'?: boolean | 'false' | 'mixed' | 'true';
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     *
     * @see aria-colindex.
     */
    'aria-colcount'?: number;
    /**
     * Defines an element's column index or position with respect to the total number
     * of columns within a table, grid, or treegrid.
     *
     * @see aria-colcount @see aria-colspan.
     */
    'aria-colindex'?: number;
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
     *
     * @see aria-colindex @see aria-rowspan.
     */
    'aria-colspan'?: number;
    /**
     * Identifies the element (or elements) whose contents or presence are controlled
     * by the current element.
     *
     * @see aria-owns.
     */
    'aria-controls'?: string;
    /**
     * Indicates the element that represents the current item within a container or set
     * of related elements.
     */
    'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time';
    /**
     * Identifies the element (or elements) that describes the object.
     *
     * @see aria-labelledby
     */
    'aria-describedby'?: string;
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     *
     * @see aria-describedby.
     */
    'aria-details'?: string;
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable
     * or otherwise operable.
     *
     * @see aria-hidden @see aria-readonly.
     */
    'aria-disabled'?: boolean | 'false' | 'true';
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop target.
     *
     * @deprecated in ARIA 1.1
     */
    'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup';
    /**
     * Identifies the element that provides an error message for the object.
     *
     * @see aria-invalid @see aria-describedby.
     */
    'aria-errormessage'?: string;
    /**
     * Indicates whether the element, or another grouping element it controls,
     * is currently expanded or collapsed.
     */
    'aria-expanded'?: boolean | 'false' | 'true';
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which,
     * at the user's discretion, allows assistive technology to override the general default
     * of reading in document source order.
     */
    'aria-flowto'?: string;
    /**
     * Indicates an element's "grabbed" state in a drag-and-drop operation.
     *
     * @deprecated in ARIA 1.1
     */
    'aria-grabbed'?: boolean | 'false' | 'true';
    /**
     * Indicates the availability and type of interactive popup element, such as menu or dialog,
     * that can be triggered by an element.
     */
    'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    /**
     * Indicates whether the element is exposed to an accessibility API.
     *
     * @see aria-disabled.
     */
    'aria-hidden'?: boolean | 'false' | 'true';
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     *
     * @see aria-errormessage.
     */
    'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
    /**
     * Indicates keyboard shortcuts that an author has implemented to activate
     * or give focus to an element.
     */
    'aria-keyshortcuts'?: string;
    /**
     * Defines a string value that labels the current element.
     *
     * @see aria-labelledby.
     */
    'aria-label'?: string;
    /**
     * Identifies the element (or elements) that labels the current element.
     *
     * @see aria-describedby.
     */
    'aria-labelledby'?: string;
    /**
     * Defines the hierarchical level of an element within a structure.
     */
    'aria-level'?: number;
    /**
     * Indicates that an element will be updated, and describes the types of updates the user agents,
     * assistive technologies, and user can expect from the live region.
     */
    'aria-live'?: 'off' | 'assertive' | 'polite';
    /**
     * Indicates whether an element is modal when displayed.
     */
    'aria-modal'?: boolean | 'false' | 'true';
    /**
     * Indicates whether a text box accepts multiple lines of input or only a single line.
     */
    'aria-multiline'?: boolean | 'false' | 'true';
    /**
     * Indicates that the user may select more than one item from the current selectable descendants.
     */
    'aria-multiselectable'?: boolean | 'false' | 'true';
    /**
     * Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.
     */
    'aria-orientation'?: 'horizontal' | 'vertical';
    /**
     * Identifies an element (or elements) in order to define a visual, functional,
     * or contextual parent / child relationship between DOM elements where the DOM hierarchy
     * cannot be used to represent the relationship.
     * @see aria-controls.
     */
    'aria-owns'?: string;
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry
     * when the control has no value. A hint could be a sample value or a brief description
     * of the expected format.
     */
    'aria-placeholder'?: string;
    /**
     * Defines an element's number or position in the current set of listitems or treeitems.
     * Not required if all elements in the set are present in the DOM.
     *
     * @see aria-setsize.
     */
    'aria-posinset'?: number;
    /**
     * Indicates the current "pressed" state of toggle buttons.
     *
     * @see aria-checked @see aria-selected.
     */
    'aria-pressed'?: boolean | 'false' | 'mixed' | 'true';
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     *
     * @see aria-disabled.
     */
    'aria-readonly'?: boolean | 'false' | 'true';
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree
     * within a live region is modified.
     *
     * @see aria-atomic.
     */
    'aria-relevant'?: 'additions' | 'additions text' | 'all' | 'removals' | 'text';
    /**
     * Indicates that user input is required on the element before a form may be submitted.
     */
    'aria-required'?: boolean | 'false' | 'true';
    /**
     * Defines a human-readable, author-localized description for the role of an element.
     */
    'aria-roledescription'?: string;
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     *
     * @see aria-rowindex.
     */
    'aria-rowcount'?: number;
    /**
     * Defines an element's row index or position with respect to the total number
     * of rows within a table, grid, or treegrid.
     *
     * @see aria-rowcount @see aria-rowspan.
     */
    'aria-rowindex'?: number;
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     *
     * @see aria-rowindex @see aria-colspan.
     */
    'aria-rowspan'?: number;
    /**
     * Indicates the current "selected" state of various widgets.
     *
     * @see aria-checked @see aria-pressed.
     */
    'aria-selected'?: boolean | 'false' | 'true';
    /**
     * Defines the number of items in the current set of listitems or treeitems.
     * Not required if all elements in the set are present in the DOM.
     *
     * @see aria-posinset.
     */
    'aria-setsize'?: number;
    /**
     * Indicates if items in a table or grid are sorted in ascending or descending order.
     */
    'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
    /**
     * Defines the maximum allowed value for a range widget.
     */
    'aria-valuemax'?: number;
    /**
     * Defines the minimum allowed value for a range widget.
     */
    'aria-valuemin'?: number;
    /**
     * Defines the current value for a range widget.
     *
     * @see aria-valuetext.
     */
    'aria-valuenow'?: number;
    /**
     * Defines the human readable text alternative of aria-valuenow for a range widget.
     */
    'aria-valuetext'?: string;
  }

  /**
   * @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts|types/react}
   */
  export interface SVGAttributes extends AriaAttributes {
    // Attributes which also defined in HTMLAttributes
    className?: string;
    color?: string;
    height?: number | string;
    id?: string;
    lang?: string;
    max?: number | string;
    media?: string;
    method?: string;
    min?: number | string;
    name?: string;
    style?: Partial<CSSStyleDeclaration>;
    target?: string;
    type?: string;
    width?: number | string;

    // Other HTML properties supported by SVG elements in browsers
    role?: string;
    tabIndex?: number;
    crossOrigin?: 'anonymous' | 'use-credentials' | '';

    // SVG Specific attributes
    accentHeight?: number | string;
    accumulate?: 'none' | 'sum';
    additive?: 'replace' | 'sum';
    alignmentBaseline?:
      | 'auto'
      | 'baseline'
      | 'before-edge'
      | 'text-before-edge'
      | 'middle'
      | 'central'
      | 'after-edge'
      | 'text-after-edge'
      | 'ideographic'
      | 'alphabetic'
      | 'hanging'
      | 'mathematical'
      | 'inherit';
    allowReorder?: 'no' | 'yes';
    alphabetic?: number | string;
    amplitude?: number | string;
    arabicForm?: 'initial' | 'medial' | 'terminal' | 'isolated';
    ascent?: number | string;
    attributeName?: string;
    attributeType?: string;
    autoReverse?: Booleanish;
    azimuth?: number | string;
    baseFrequency?: number | string;
    baselineShift?: number | string;
    baseProfile?: number | string;
    bbox?: number | string;
    begin?: number | string;
    bias?: number | string;
    by?: number | string;
    calcMode?: number | string;
    capHeight?: number | string;
    clip?: number | string;
    clipPath?: string;
    clipPathUnits?: number | string;
    clipRule?: number | string;
    colorInterpolation?: number | string;
    colorInterpolationFilters?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit';
    colorProfile?: number | string;
    colorRendering?: number | string;
    contentScriptType?: number | string;
    contentStyleType?: number | string;
    cursor?: number | string;
    cx?: number | string;
    cy?: number | string;
    d?: string;
    decelerate?: number | string;
    descent?: number | string;
    diffuseConstant?: number | string;
    direction?: number | string;
    display?: number | string;
    divisor?: number | string;
    dominantBaseline?: number | string;
    dur?: number | string;
    dx?: number | string;
    dy?: number | string;
    edgeMode?: number | string;
    elevation?: number | string;
    enableBackground?: number | string;
    end?: number | string;
    exponent?: number | string;
    externalResourcesRequired?: Booleanish;
    fill?: string;
    fillOpacity?: number | string;
    fillRule?: 'nonzero' | 'evenodd' | 'inherit';
    filter?: string;
    filterRes?: number | string;
    filterUnits?: number | string;
    floodColor?: number | string;
    floodOpacity?: number | string;
    focusable?: Booleanish | 'auto';
    fontFamily?: string;
    fontSize?: number | string;
    fontSizeAdjust?: number | string;
    fontStretch?: number | string;
    fontStyle?: number | string;
    fontVariant?: number | string;
    fontWeight?: number | string;
    format?: number | string;
    from?: number | string;
    fx?: number | string;
    fy?: number | string;
    g1?: number | string;
    g2?: number | string;
    glyphName?: number | string;
    glyphOrientationHorizontal?: number | string;
    glyphOrientationVertical?: number | string;
    glyphRef?: number | string;
    gradientTransform?: string;
    gradientUnits?: string;
    hanging?: number | string;
    horizAdvX?: number | string;
    horizOriginX?: number | string;
    href?: string;
    ideographic?: number | string;
    imageRendering?: number | string;
    in2?: number | string;
    in?: string;
    intercept?: number | string;
    k1?: number | string;
    k2?: number | string;
    k3?: number | string;
    k4?: number | string;
    k?: number | string;
    kernelMatrix?: number | string;
    kernelUnitLength?: number | string;
    kerning?: number | string;
    keyPoints?: number | string;
    keySplines?: number | string;
    keyTimes?: number | string;
    lengthAdjust?: number | string;
    letterSpacing?: number | string;
    lightingColor?: number | string;
    limitingConeAngle?: number | string;
    local?: number | string;
    markerEnd?: string;
    markerHeight?: number | string;
    markerMid?: string;
    markerStart?: string;
    markerUnits?: number | string;
    markerWidth?: number | string;
    mask?: string;
    maskContentUnits?: number | string;
    maskUnits?: number | string;
    mathematical?: number | string;
    mode?: number | string;
    numOctaves?: number | string;
    offset?: number | string;
    opacity?: number | string;
    operator?: number | string;
    order?: number | string;
    orient?: number | string;
    orientation?: number | string;
    origin?: number | string;
    overflow?: number | string;
    overlinePosition?: number | string;
    overlineThickness?: number | string;
    paintOrder?: number | string;
    panose1?: number | string;
    path?: string;
    pathLength?: number | string;
    patternContentUnits?: string;
    patternTransform?: number | string;
    patternUnits?: string;
    pointerEvents?: number | string;
    points?: string;
    pointsAtX?: number | string;
    pointsAtY?: number | string;
    pointsAtZ?: number | string;
    preserveAlpha?: Booleanish;
    preserveAspectRatio?: string;
    primitiveUnits?: number | string;
    r?: number | string;
    radius?: number | string;
    refX?: number | string;
    refY?: number | string;
    renderingIntent?: number | string;
    repeatCount?: number | string;
    repeatDur?: number | string;
    requiredExtensions?: number | string;
    requiredFeatures?: number | string;
    restart?: number | string;
    result?: string;
    rotate?: number | string;
    rx?: number | string;
    ry?: number | string;
    scale?: number | string;
    seed?: number | string;
    shapeRendering?: number | string;
    slope?: number | string;
    spacing?: number | string;
    specularConstant?: number | string;
    specularExponent?: number | string;
    speed?: number | string;
    spreadMethod?: string;
    startOffset?: number | string;
    stdDeviation?: number | string;
    stemh?: number | string;
    stemv?: number | string;
    stitchTiles?: number | string;
    stopColor?: string;
    stopOpacity?: number | string;
    strikethroughPosition?: number | string;
    strikethroughThickness?: number | string;
    string?: number | string;
    stroke?: string;
    strokeDasharray?: string | number;
    strokeDashoffset?: string | number;
    strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';
    strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit';
    strokeMiterlimit?: number | string;
    strokeOpacity?: number | string;
    strokeWidth?: number | string;
    surfaceScale?: number | string;
    systemLanguage?: number | string;
    tableValues?: number | string;
    targetX?: number | string;
    targetY?: number | string;
    textAnchor?: string;
    textDecoration?: number | string;
    textLength?: number | string;
    textRendering?: number | string;
    to?: number | string;
    transform?: string;
    u1?: number | string;
    u2?: number | string;
    underlinePosition?: number | string;
    underlineThickness?: number | string;
    unicode?: number | string;
    unicodeBidi?: number | string;
    unicodeRange?: number | string;
    unitsPerEm?: number | string;
    vAlphabetic?: number | string;
    values?: string;
    vectorEffect?: number | string;
    version?: string;
    vertAdvY?: number | string;
    vertOriginX?: number | string;
    vertOriginY?: number | string;
    vHanging?: number | string;
    vIdeographic?: number | string;
    viewBox?: string;
    viewTarget?: number | string;
    visibility?: number | string;
    vMathematical?: number | string;
    widths?: number | string;
    wordSpacing?: number | string;
    writingMode?: number | string;
    x1?: number | string;
    x2?: number | string;
    x?: number | string;
    xChannelSelector?: string;
    xHeight?: number | string;
    xlinkActuate?: string;
    xlinkArcrole?: string;
    xlinkHref?: string;
    xlinkRole?: string;
    xlinkShow?: string;
    xlinkTitle?: string;
    xlinkType?: string;
    xmlBase?: string;
    xmlLang?: string;
    xmlns?: string;
    xmlnsXlink?: string;
    xmlSpace?: string;
    y1?: number | string;
    y2?: number | string;
    y?: number | string;
    yChannelSelector?: string;
    z?: number | string;
    zoomAndPan?: string;
  }
}

export { MDWC };
