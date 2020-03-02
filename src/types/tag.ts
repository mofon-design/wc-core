import { AnyFunction } from './any';
import { OmitPropertiesByExtends, OmitPropertyKeysByExtends } from './helper';

export interface CustomElement extends HTMLElement {
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

export interface CoreElement<T> extends HTMLElement {
  mapAttrsToProps: Record<string, OmitPropertyKeysByExtends<T, AnyFunction>>;
  mapPropsToAttrs: Record<OmitPropertyKeysByExtends<T, AnyFunction>, string>;
  properties: OmitPropertiesByExtends<T, AnyFunction>;
  stage: CoreElementStage;
}

export const enum CoreElementStage {
  NULL = 0,
  CONSTRUCTED = 1 << 0,
  CONNECTED = 1 << 1,
  UPDATING = 1 << 2,
}
