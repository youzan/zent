import has from 'lodash-es/has';
import isPlainObject from 'lodash-es/isPlainObject';

export const BREAKPOINT_MAP = {
  '(max-width: 575px)': 'xs',
  '(min-width: 576px)': 'sm',
  '(min-width: 768px)': 'md',
  '(min-width: 992px)': 'lg',
  '(min-width: 1200px)': 'xl',
  '(min-width: 1600px)': 'xxl',
  '(min-width: 1920px)': 'fhd',
};

// Order is important
export const BREAKPOINTS = [
  '(min-width: 1920px)',
  '(min-width: 1600px)',
  '(min-width: 1200px)',
  '(min-width: 992px)',
  '(min-width: 768px)',
  '(min-width: 576px)',
  '(max-width: 575px)',
];

export function getValueForBreakpoint(breakpoints, valueMap) {
  if (!isPlainObject(valueMap)) {
    return valueMap;
  }

  for (let i = 0; i < BREAKPOINTS.length; i++) {
    const brk = BREAKPOINTS[i];
    const breakpointName = BREAKPOINT_MAP[brk];
    if (breakpoints[brk] && has(valueMap, breakpointName)) {
      return valueMap[breakpointName];
    }
  }

  if (has(valueMap, 'fallback')) {
    return valueMap.fallback;
  }
}
