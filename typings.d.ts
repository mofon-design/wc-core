import * as CSS from './node_modules/csstype/index';
import { Fragment } from './src/dom/MDWCFragment';
import { CoreElementConstructor } from './src/types/tag';

declare namespace MDWC {
  type Key = string | number;

  interface RefObject<T> {
    readonly current: T | null;
  }

  interface RefCallback<T> {
    (instance: T | null): void;
  }

  type Ref<T> = RefCallback<T> | RefObject<T> | null;

  // type LegacyRef<T> = string | Ref<T>;

  type MDWCElementType = string | CoreElementConstructor | Fragment;

  interface MDWCElement {
    children?: MDWCNode;
    key?: Key;
    props: object;
    ref?: Ref<unknown>;
    type: MDWCElementType;
  }

  type MDWCText = string | number;

  type MDWCNode = MDWCElement | MDWCText | boolean | null | undefined | MDWCNode[];

  interface Props<T> {
    key?: Key;
    ref?: Ref<T>;
  }

  interface Attributes {
    key?: Key;
  }

  interface ClassAttributes<T> extends Attributes {
    ref?: Ref<T>;
  }

  // type OmitMayNotBeHTMLAttributes<T extends HTMLElement> = Partial<
  //   Pick<
  //     T,
  //     {
  //       [K in keyof T]: T[K] extends ((...args: any[]) => any) | null | undefined ? never : K;
  //     }[keyof T]
  //   >
  // >;

  type MayNotBeHTMLAttributeKeys =
    | keyof (WindowEventHandlers & DocumentAndElementEventHandlers & GlobalEventHandlers)
    | 'children';

  type OmitMayNotBeHTMLAttributes<T extends {}> = Partial<
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
  interface CSSProperties extends CSS.Properties {}

  type CSSPropertiesWithCustoms = CSSProperties & Record<string, unknown>;

  interface DetailedHTMLProps<T extends {}, U> extends T, ClassAttributes<U> {
    children?: MDWCNode;
    style?: CSSProperties;
  }

  interface SVGProps<T> extends SVGAttributes, ClassAttributes<T> {}

  type Booleanish = boolean | 'true' | 'false';

  /**
   * All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
   *
   * @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts|types/react}
   */
  interface AriaAttributes {
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
  interface SVGAttributes extends AriaAttributes {
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

export = MDWC;
export as namespace MDWC;

declare global {
  namespace JSX {
    interface Element extends MDWC.MDWCElement {}

    interface ElementChildrenAttribute {
      children: {};
    }

    interface IntrinsicAttributes extends MDWC.Attributes {}
    interface IntrinsicClassAttributes<T extends {}>
      extends MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<T>, T> {}

    interface IntrinsicElements {
      // HTML
      a: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >;
      abbr: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      address: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      area: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLAreaElement>,
        HTMLAreaElement
      >;
      article: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      aside: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      audio: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLAudioElement>,
        HTMLAudioElement
      >;
      b: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      base: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLBaseElement>,
        HTMLBaseElement
      >;
      bdi: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      bdo: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      big: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      blockquote: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      body: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLBodyElement>,
        HTMLBodyElement
      >;
      br: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLBRElement>, HTMLBRElement>;
      button: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >;
      canvas: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLCanvasElement>,
        HTMLCanvasElement
      >;
      caption: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      cite: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      code: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      col: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLTableColElement>,
        HTMLTableColElement
      >;
      colgroup: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLTableColElement>,
        HTMLTableColElement
      >;
      data: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLDataElement>,
        HTMLDataElement
      >;
      datalist: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLDataListElement>,
        HTMLDataListElement
      >;
      dd: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      del: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      details: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      dfn: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      dialog: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLDialogElement>,
        HTMLDialogElement
      >;
      div: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      dl: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLDListElement>,
        HTMLDListElement
      >;
      dt: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      em: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      embed: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLEmbedElement>,
        HTMLEmbedElement
      >;
      fieldset: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLFieldSetElement>,
        HTMLFieldSetElement
      >;
      figcaption: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      figure: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      footer: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      form: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLFormElement>,
        HTMLFormElement
      >;
      fragment: MDWC.DetailedHTMLProps<{}, {}>;
      h1: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h2: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h3: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h4: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h5: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      h6: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
      head: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLHeadElement>,
        HTMLHeadElement
      >;
      header: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      hgroup: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      hr: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLHRElement>, HTMLHRElement>;
      html: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLHtmlElement>,
        HTMLHtmlElement
      >;
      i: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      iframe: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLIFrameElement>,
        HTMLIFrameElement
      >;
      img: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
      >;
      input: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
      ins: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLModElement>, HTMLModElement>;
      kbd: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      keygen: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      label: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLLabelElement>,
        HTMLLabelElement
      >;
      legend: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLLegendElement>,
        HTMLLegendElement
      >;
      li: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
      link: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLLinkElement>,
        HTMLLinkElement
      >;
      main: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      map: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLMapElement>, HTMLMapElement>;
      mark: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      menu: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      menuitem: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      meta: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLMetaElement>,
        HTMLMetaElement
      >;
      meter: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      nav: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      noindex: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      noscript: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      object: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLObjectElement>,
        HTMLObjectElement
      >;
      ol: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLOListElement>,
        HTMLOListElement
      >;
      optgroup: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLOptGroupElement>,
        HTMLOptGroupElement
      >;
      option: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLOptionElement>,
        HTMLOptionElement
      >;
      output: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      p: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLParagraphElement>,
        HTMLParagraphElement
      >;
      param: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLParamElement>,
        HTMLParamElement
      >;
      picture: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      pre: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLPreElement>, HTMLPreElement>;
      progress: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLProgressElement>,
        HTMLProgressElement
      >;
      q: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLQuoteElement>,
        HTMLQuoteElement
      >;
      rp: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      rt: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      ruby: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      s: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      samp: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      slot: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLSlotElement>,
        HTMLSlotElement
      >;
      script: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLScriptElement>,
        HTMLScriptElement
      >;
      section: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      select: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
      >;
      small: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      source: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLSourceElement>,
        HTMLSourceElement
      >;
      span: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
      >;
      strong: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      style: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLStyleElement>,
        HTMLStyleElement
      >;
      sub: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      summary: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      sup: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      table: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
      >;
      template: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLTemplateElement>,
        HTMLTemplateElement
      >;
      tbody: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLTableSectionElement>,
        HTMLTableSectionElement
      >;
      td: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLTableDataCellElement>,
        HTMLTableDataCellElement
      >;
      textarea: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
      >;
      tfoot: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLTableSectionElement>,
        HTMLTableSectionElement
      >;
      th: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLTableHeaderCellElement>,
        HTMLTableHeaderCellElement
      >;
      thead: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLTableSectionElement>,
        HTMLTableSectionElement
      >;
      time: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      title: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLTitleElement>,
        HTMLTitleElement
      >;
      tr: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
      >;
      track: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLTrackElement>,
        HTMLTrackElement
      >;
      u: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      ul: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLUListElement>,
        HTMLUListElement
      >;
      var: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      video: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLVideoElement>,
        HTMLVideoElement
      >;
      wbr: MDWC.DetailedHTMLProps<MDWC.OmitMayNotBeHTMLAttributes<HTMLElement>, HTMLElement>;
      webview: MDWC.DetailedHTMLProps<
        MDWC.OmitMayNotBeHTMLAttributes<HTMLWebViewElement>,
        HTMLWebViewElement
      >;

      // SVG
      svg: MDWC.SVGProps<SVGSVGElement>;

      animate: MDWC.SVGProps<SVGAnimateElement>;
      animateMotion: MDWC.SVGProps<SVGElement>;
      animateTransform: MDWC.SVGProps<SVGAnimateTransformElement>;
      circle: MDWC.SVGProps<SVGCircleElement>;
      clipPath: MDWC.SVGProps<SVGClipPathElement>;
      defs: MDWC.SVGProps<SVGDefsElement>;
      desc: MDWC.SVGProps<SVGDescElement>;
      ellipse: MDWC.SVGProps<SVGEllipseElement>;
      feBlend: MDWC.SVGProps<SVGFEBlendElement>;
      feColorMatrix: MDWC.SVGProps<SVGFEColorMatrixElement>;
      feComponentTransfer: MDWC.SVGProps<SVGFEComponentTransferElement>;
      feComposite: MDWC.SVGProps<SVGFECompositeElement>;
      feConvolveMatrix: MDWC.SVGProps<SVGFEConvolveMatrixElement>;
      feDiffuseLighting: MDWC.SVGProps<SVGFEDiffuseLightingElement>;
      feDisplacementMap: MDWC.SVGProps<SVGFEDisplacementMapElement>;
      feDistantLight: MDWC.SVGProps<SVGFEDistantLightElement>;
      feDropShadow: MDWC.SVGProps<SVGFEDropShadowElement>;
      feFlood: MDWC.SVGProps<SVGFEFloodElement>;
      feFuncA: MDWC.SVGProps<SVGFEFuncAElement>;
      feFuncB: MDWC.SVGProps<SVGFEFuncBElement>;
      feFuncG: MDWC.SVGProps<SVGFEFuncGElement>;
      feFuncR: MDWC.SVGProps<SVGFEFuncRElement>;
      feGaussianBlur: MDWC.SVGProps<SVGFEGaussianBlurElement>;
      feImage: MDWC.SVGProps<SVGFEImageElement>;
      feMerge: MDWC.SVGProps<SVGFEMergeElement>;
      feMergeNode: MDWC.SVGProps<SVGFEMergeNodeElement>;
      feMorphology: MDWC.SVGProps<SVGFEMorphologyElement>;
      feOffset: MDWC.SVGProps<SVGFEOffsetElement>;
      fePointLight: MDWC.SVGProps<SVGFEPointLightElement>;
      feSpecularLighting: MDWC.SVGProps<SVGFESpecularLightingElement>;
      feSpotLight: MDWC.SVGProps<SVGFESpotLightElement>;
      feTile: MDWC.SVGProps<SVGFETileElement>;
      feTurbulence: MDWC.SVGProps<SVGFETurbulenceElement>;
      filter: MDWC.SVGProps<SVGFilterElement>;
      foreignObject: MDWC.SVGProps<SVGForeignObjectElement>;
      g: MDWC.SVGProps<SVGGElement>;
      image: MDWC.SVGProps<SVGImageElement>;
      line: MDWC.SVGProps<SVGLineElement>;
      linearGradient: MDWC.SVGProps<SVGLinearGradientElement>;
      marker: MDWC.SVGProps<SVGMarkerElement>;
      mask: MDWC.SVGProps<SVGMaskElement>;
      metadata: MDWC.SVGProps<SVGMetadataElement>;
      mpath: MDWC.SVGProps<SVGElement>;
      path: MDWC.SVGProps<SVGPathElement>;
      pattern: MDWC.SVGProps<SVGPatternElement>;
      polygon: MDWC.SVGProps<SVGPolygonElement>;
      polyline: MDWC.SVGProps<SVGPolylineElement>;
      radialGradient: MDWC.SVGProps<SVGRadialGradientElement>;
      rect: MDWC.SVGProps<SVGRectElement>;
      stop: MDWC.SVGProps<SVGStopElement>;
      switch: MDWC.SVGProps<SVGSwitchElement>;
      symbol: MDWC.SVGProps<SVGSymbolElement>;
      text: MDWC.SVGProps<SVGTextElement>;
      textPath: MDWC.SVGProps<SVGTextPathElement>;
      tspan: MDWC.SVGProps<SVGTSpanElement>;
      use: MDWC.SVGProps<SVGUseElement>;
      view: MDWC.SVGProps<SVGViewElement>;
    }
  }
}
