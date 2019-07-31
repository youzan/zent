// Order is important, don't swap orders
export enum LayoutBreakPoint {
  // These breakpoints are not in bootstrap
  fhd = '(min-width: 1920px)',
  xxl = '(min-width: 1600px)',

  // Breakpoints from bootstrap 4
  xl = '(min-width: 1200px)',
  lg = '(min-width: 992px)',
  md = '(min-width: 768px)',
  sm = '(min-width: 576px)',
  xs = '(max-width: 575px)',
}

export type LayoutBreakPointName = keyof typeof LayoutBreakPoint;

export interface ILayoutResponsiveValue
  extends Partial<Record<LayoutBreakPointName, number>> {
  // Fallback value when no breakpoint is matched
  fallback: number;
}

export interface ILayoutConfig {
  colGutter: number | ILayoutResponsiveValue;
  rowGutter: number | ILayoutResponsiveValue;
}
