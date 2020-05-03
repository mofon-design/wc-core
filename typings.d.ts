import { MDWC } from './src/types/jsx';

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
      extends MDWC.DetailedClassComponentProps<Partial<T>> {}

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
