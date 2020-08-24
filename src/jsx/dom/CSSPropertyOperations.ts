import { MDWC } from '../../types';

/**
 * Assign styles to HTML elements.
 * Custom styles will take `setPropertyValue()`,
 * and others will be directly assigned to `element.style`.
 */
export function setValueForStyles<T extends Element>(
  element: T,
  styles: MDWC.CSSPropertiesWithCustoms,
) {
  if (!(element instanceof HTMLElement)) return;

  let styleName: string;
  const style = element.style;

  for (styleName in styles) {
    if (!Object.prototype.hasOwnProperty.call(style, styleName)) {
      continue;
    }

    if (isNotCustomProperty(styleName)) {
      style[styleName] = dangerousStyleValue(styles[styleName]);
    } else {
      style.setProperty(styleName, dangerousStyleValue(styles[styleName]));
    }
  }
}

function isNotCustomProperty(
  name: string,
): name is keyof MDWC.CSSProperties & keyof CSSStyleDeclaration {
  return name.slice(0, 2) !== '--';
}

function dangerousStyleValue(value: unknown): string {
  if (value === null || value === undefined || typeof value === 'boolean') return '';
  return `${value}`;
}
