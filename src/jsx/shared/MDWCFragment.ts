import { MDWC } from '../../types/index';

export const Fragment = {} as MDWC.Fragment;

export function isMDWCFragmentType(nodeType: unknown): nodeType is MDWC.Fragment {
  return nodeType === Fragment;
}
