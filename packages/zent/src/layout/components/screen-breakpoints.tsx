import has from 'lodash-es/has';
import {
  ILayoutResponsiveValue,
  LayoutBreakPoint,
  LayoutBreakPointName,
} from './types';

type LayoutBreakPointMap = Record<LayoutBreakPoint, LayoutBreakPointName>;

const BREAKPOINT_MAP = (Object.keys(
  LayoutBreakPoint
) as LayoutBreakPointName[]).reduce(
  (m, k) => {
    m[LayoutBreakPoint[k]] = k;
    return m;
  },
  {} as LayoutBreakPointMap
);

export const BREAKPOINTS = Object.keys(BREAKPOINT_MAP) as LayoutBreakPoint[];

export function getValueForBreakpoint(
  breakpoints: Partial<Record<LayoutBreakPoint, boolean>>,
  valueMap: number | ILayoutResponsiveValue
): number {
  if (typeof valueMap === 'number') {
    return valueMap;
  }

  for (let i = 0; i < BREAKPOINTS.length; i++) {
    const brk = BREAKPOINTS[i];
    const breakpointName = BREAKPOINT_MAP[brk];
    if (breakpoints[brk]) {
      const val = valueMap[breakpointName];
      if (val !== undefined) {
        return val;
      }
    }
  }

  if (has(valueMap, 'fallback')) {
    return valueMap.fallback;
  }

  return 0;
}
