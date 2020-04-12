import { AnyFunction } from './any';
import { Constructor, NonFunctionPropertyKeys } from './helper';

/**
 * HTML custom element native life cycle methods.
 */
export interface CustomElementLifecycle {
  /**
   * Invoked each time the custom element is moved to a new document.
   */
  adoptedCallback?(): void;
  /**
   * Invoked each time one of the custom element's attributes is added, removed,
   * or changed. Which attributes to notice change for is specified in a static
   * get `observedAttributes` method.
   */
  attributeChangedCallback?(name: string, oldValue: string | null, newValue: string | null): void;
  /**
   * Invoked each time the custom element is appended into a document-connected element.
   * This will happen each time the node is moved, and may happen before the element's
   * contents have been fully parsed.
   *
   * @note
   * `connectedCallback` may be called once your element is no longer connected,
   * use `Node.isConnected` to make sure.
   */
  connectedCallback?(): void;
  /**
   * Invoked each time the custom element is disconnected from the document's DOM.
   */
  disconnectedCallback?(): void;
}

/**
 * Customized built-in elements.
 */
export interface CustomElement extends HTMLElement, CustomElementLifecycle {}

export interface CustomElementClass {
  /**
   * A static accessor that specifies which attributes should be noted for changes.
   */
  observedAttributes?: string[];
}

/**
 * Non-native life cycle methods, which can be used with decorated by `@tag('tagName')`.
 */
export interface CoreElementLifecycle extends CustomElementLifecycle {
  /**
   * Invoked when the element is first connected to the document. The initialization of
   * DOM is usually performed here.
   *
   * @description
   * SHOULD NOT manipulate DOM in the constructor. In the standard for custom elements,
   * operations such as appending children or updating attributes are allowed only if
   * the element is connected to the document at least once.
   */
  initialize?(): void;
  /**
   * Invoked each time one of the custom element's properties is changed.
   * Which properties to notice change for is decorated by `@property(type)`.
   */
  propertyChangedCallback?(
    property: keyof any,
    oldValue: unknown | undefined,
    newValue: unknown | undefined,
  ): void;
  /**
   * Invoked each time one of the custom element's properties is changed.
   * Should return a boolean value indicating whether the new value needs to be
   * synchronized to the HTML attribute.
   *
   * @default
   * ```ts
   * (this.stage & CoreElementStage.INITIALIZED) && !(this.stage & CoreElementStage.SYNC_ATTRIBUTE)
   * ```
   */
  shouldSyncPropertyToAttribute?(
    property: keyof any,
    oldValue: unknown | undefined,
    newValue: unknown | undefined,
    attribute: string,
  ): boolean;
}

export interface CoreElement extends CustomElement, CoreElementLifecycle {}

export interface CoreElementConstructor extends Constructor<CoreElement>, CustomElementClass {}

/**
 * Custom element class decorated by `@tag(tagName)` class decorator.
 */
export interface CoreInternalElement<T> extends CoreElement {
  /**
   * Map HTML attribute names to element property keys.
   *
   * @deprecated
   * `mapAttrsToProps` is a **static constant** attach to the `CoreInternalElement.prototype`,
   * and SHOULD NOT be used as a property of any instance.
   */
  mapAttrsToProps: Record<string, NonFunctionPropertyKeys<T>>;
  /**
   * A **static constant** getter on the `CoreInternalElement.prototype` which forwards access to
   * `this.__properties`, SHOULD only be accessed in the element property accessor.
   */
  properties: Pick<T, NonFunctionPropertyKeys<T>>;
  shouldSyncPropertyToAttribute: Exclude<CoreElement['shouldSyncPropertyToAttribute'], undefined>;
  /**
   * Indicate the state of the current element.
   */
  stage: CoreElementStage;
  /**
   * The actual storage location of the element property value for the element property accessor.
   *
   * @deprecated
   * DO NOT access `__properties` directly or modify the value, otherwise it will cause the problem
   * of inconsistency between HTML attributes and element properties.
   */
  __properties?: Partial<Pick<T, NonFunctionPropertyKeys<T>>>;
  /**
   * @deprecated
   * Determine whether the element has been connected to the document according to
   * `Node.isConnected`, and update the current stage.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected
   */
  __setElementConnected(): void;
  /**
   * @deprecated
   * The life cycle function has been tamper-proofed, and `superLifecycle` is used to store
   * the original life cycle function of the wrapped class.
   */
  __superLifecycle: Record<string, AnyFunction>;
}

export interface CoreInternalElementConstructor<T>
  extends CustomElementClass,
    Constructor<CoreInternalElement<T>> {}

export const enum CoreElementStage {
  /**
   * Initial value.
   */
  NULL = 0,
  /**
   * Indicate whether the element is initialized (connected to the context object at lease once).
   */
  INITIALIZED = 1 << 0,
  /**
   * Indicate whether the element is connected (directly or indirectly) to the context object.
   */
  CONNECTED = 1 << 1,
  /**
   * Reserved value.
   */
  UPDATING = 1 << 2,
  /**
   * Indicate that the HTML attribute value is being synchronized to the element property,
   * preventing the property setter from firing `setAttribute()` or `removeAttribute()`
   * which causes loop calls.
   */
  SYNC_ATTRIBUTE = 1 << 3,
}
