import { MDWC } from '../../../types';

/**
 * Format MDWC key as string for diff.
 */
export function formatMDWCKey(key: MDWC.Key | null | undefined): string {
  switch (typeof key) {
    case 'undefined':
      return '0:';
    case 'string':
      return `1:${key}`;
    case 'number':
      return `2:${key}`;
    default:
      return key === null ? '0:' : `3:${key}`;
  }
}
