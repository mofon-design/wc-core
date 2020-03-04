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
export interface CoreElementLifecycle {
  /**
   * Invoked each time one of the custom element's properties is changed.
   * Which properties to notice change for is decorated by `@property(type)`.
   */
  propertyChangedCallback?<T extends NonFunctionPropertyKeys<this>>(
    property: T,
    oldValue?: this[T],
    newValue?: this[T],
  ): void;
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
   * and should not be used as a property of any instance.
   */
  mapAttrsToProps: Record<string, NonFunctionPropertyKeys<T>>;
  /**
   * The actual storage location of the element property value for the element property accessor.
   *
   * @note
   * DO NOT access `properties` directly or modify the value, otherwise it will cause the problem
   * of inconsistency between HTML attributes and element properties.
   */
  properties: Pick<T, NonFunctionPropertyKeys<T>>;
  /**
   * Indicate the state of the current element.
   */
  stage: CoreElementStage;
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
   * Indicate whether the node is connected (directly or indirectly) to the context object.
   */
  CONNECTED = 1 << 0,
  /**
   * Reserved value.
   */
  UPDATING = 1 << 1,
  /**
   * Indicate that the HTML attribute value is being synchronized to the element property,
   * preventing the property setter from firing `setAttribute()` or `removeAttribute()`
   * which causes loop calls.
   */
  SYNC_PROPERTY = 1 << 2,
}
