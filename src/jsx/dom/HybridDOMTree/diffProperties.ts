import { ReservedProperty } from '../../shared/reservedProperties';
import { PropertyUpdateQueue, PropertyUpdateQueueItem } from './types';

function hasOwnProperty<T>(target: T, property: keyof any): property is keyof T {
  return Object.prototype.hasOwnProperty.call(target, property);
}

/**
 * Diff last properties and next properties, return an update queue.
 */
export function diffProperties<T>(lastProps: T, nextProps: T): PropertyUpdateQueue {
  const updateQueue: PropertyUpdateQueueItem[] = [];

  let propKey: string;
  let styleName: string;
  let lastStyle: object;
  let nextStyle: object;
  let lastValue: unknown;
  let nextValue: unknown;
  let styleUpdates: Record<string, unknown> | null;

  // Removed properties
  for (propKey in lastProps) {
    if (!hasOwnProperty(lastProps, propKey)) {
      continue;
    }

    lastValue = lastProps[propKey];
    if (lastValue === undefined) {
      continue;
    }

    if (hasOwnProperty(nextProps, propKey)) {
      nextValue = nextProps[propKey];
      if (nextValue !== undefined) {
        continue;
      }
    }

    updateQueue.push([propKey, lastValue, undefined]);
  }

  // Updated or added properties
  for (propKey in nextProps) {
    if (!hasOwnProperty(nextProps, propKey)) {
      continue;
    }

    nextValue = nextProps[propKey];
    if (nextValue === undefined) {
      continue;
    }

    if (hasOwnProperty(lastProps, propKey)) {
      lastValue = lastProps[propKey];
    } else {
      lastValue = undefined;
    }

    if (propKey === ReservedProperty.STYLE) {
      styleUpdates = null;
      lastStyle = typeof lastValue === 'object' && lastValue ? lastValue : {};
      nextStyle = typeof nextValue === 'object' && nextValue ? nextValue : {};

      // Removed styles
      for (styleName in lastStyle) {
        if (!hasOwnProperty(lastStyle, styleName) || lastStyle[styleName] === undefined) {
          continue;
        }

        if (hasOwnProperty(nextStyle, styleName) && nextStyle[styleName] !== undefined) {
          continue;
        }

        if (styleUpdates === null) {
          styleUpdates = { [styleName]: '' };
        } else {
          styleUpdates[styleName] = '';
        }
      }

      // Updated or added styles
      for (styleName in nextStyle) {
        if (!hasOwnProperty(nextStyle, styleName) || nextStyle[styleName] === undefined) {
          continue;
        }

        if (hasOwnProperty(lastStyle, styleName) && lastStyle[styleName] === nextStyle[styleName]) {
          continue;
        }

        if (styleUpdates === null) {
          styleUpdates = { [styleName]: nextStyle[styleName] };
        } else {
          styleUpdates[styleName] = nextStyle[styleName];
        }
      }

      if (styleUpdates !== null) {
        updateQueue.push([propKey, lastValue, styleUpdates]);
      }

      continue;
    }

    if (lastValue === nextValue) {
      continue;
    }

    updateQueue.push([propKey, lastValue, nextValue]);
  }

  return updateQueue;
}
