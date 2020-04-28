import { ReservedPropertiesMap, ReservedProperty } from './reservedProperties';

function hasOwnProperty<T>(target: T, property: any): property is keyof T {
  return Object.prototype.hasOwnProperty.call(target, property);
}

// Calculate the diff between the two objects.
export function diffProperties(lastProps: object, nextProps: object): [keyof any, unknown][] {
  const updatePayload: [keyof any, unknown][] = [];

  let propKey: keyof any;
  let styleName: string;
  let styleUpdates: MDWC.CSSPropertiesWithCustoms | undefined;

  // Removed properties
  for (propKey in lastProps) {
    if (
      (hasOwnProperty(nextProps, propKey) && nextProps[propKey] !== undefined) ||
      !(hasOwnProperty(lastProps, propKey) && lastProps[propKey] !== undefined)
    ) {
      continue;
    }

    // TODO bind events

    if (propKey === ReservedProperty.STYLE) {
      const lastStyle = lastProps[propKey] as MDWC.CSSPropertiesWithCustoms;
      for (styleName in lastStyle) {
        if (hasOwnProperty(lastStyle, styleName)) {
          if (!styleUpdates) styleUpdates = {};
          styleUpdates[styleName] = '';
        }
      }
    } else if (!hasOwnProperty(ReservedPropertiesMap, propKey)) {
      updatePayload.push([propKey, undefined]);
    }
  }

  // Updated or added properties
  for (propKey in nextProps) {
    if (!hasOwnProperty(nextProps, propKey)) {
      continue;
    }

    const nextProp = nextProps[propKey];
    const lastProp = lastProps[propKey];

    if (nextProp === lastProp || nextProp === undefined) {
      continue;
    }

    // TODO bind events

    if (propKey === ReservedProperty.STYLE) {
      const nextStyle = nextProp as MDWC.CSSPropertiesWithCustoms;
      const lastStyle = lastProp as MDWC.CSSPropertiesWithCustoms | undefined;
      if (lastStyle) {
        // Unset styles on `lastStyle` but not on `nextStyle`.
        for (styleName in lastStyle) {
          if (hasOwnProperty(lastStyle, styleName) && !hasOwnProperty(nextStyle, styleName)) {
            if (!styleUpdates) styleUpdates = {};
            styleUpdates[styleName] = '';
          }
        }

        // Update styles that changed since `lastStyle`.
        for (styleName in nextStyle) {
          if (
            hasOwnProperty(nextStyle, styleName) &&
            lastStyle[styleName] !== nextStyle[styleName]
          ) {
            if (!styleUpdates) styleUpdates = {};
            styleUpdates[styleName] = nextStyle[styleName];
          }
        }
      } else {
        styleUpdates = nextStyle;
      }
    } else if (!hasOwnProperty(ReservedPropertiesMap, propKey)) {
      updatePayload.push([propKey, nextProp]);
    }
  }

  if (styleUpdates) {
    updatePayload.push([ReservedProperty.STYLE, styleUpdates]);
  }

  return updatePayload;
}
