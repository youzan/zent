const warning = require('warning');
import { INumberInputIntegerProps } from './NumberInput';

function withinRange(min: number, max: number, num: number) {
  if (min >= num) {
    return min;
  }
  if (max <= num) {
    return max;
  }
  return num;
}

function getMax(max: number | undefined) {
  return typeof max === 'number' && !Number.isNaN(max)
    ? withinRange(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, max)
    : Number.MAX_SAFE_INTEGER;
}

function getMin(min: number | undefined) {
  return typeof min === 'number' && !Number.isNaN(min)
    ? withinRange(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, min)
    : Number.MIN_SAFE_INTEGER;
}

export function normalizeMinMax(props: INumberInputIntegerProps) {
  const max = getMax(props.max);
  const min = getMin(props.min);
  if (min > max) {
    if (process.env.NODE_ENV !== 'production') {
      warning(false, 'max is smaller than min');
    }
    return {
      min: max,
      max: min,
    };
  }
  return {
    min,
    max,
  };
}

export function isPotentialValue(value: string) {
  return value === '' || value === '-' || value === '+';
}

export function isInteger(value: string): boolean {
  return /^[\-+]?\d*$/.test(value);
}

export function normalizeValue(
  potential: number | undefined | null,
  min: number,
  max: number
): { input: string; value: number | null } {
  let value: number | null;
  let input: string | null = null;
  if (potential === null || potential === undefined) {
    value = null;
    input = '';
  } else if (typeof potential === 'string') {
    /**
     * NaN || 0 -> 0
     * 不需要处理 Infinity，下面的 min max 会处理
     */
    value = parseInt(potential, 10) || 0;
  } else if (Number.isNaN(potential)) {
    value = 0;
    input = '';
  } else {
    value = Math.floor(potential);
  }
  if (value !== null) {
    value = Math.min(max, value);
    value = Math.max(min, value);
  }
  if (input === null) {
    input = String(value);
  }
  return {
    value,
    input,
  };
}

export function calculateLimit(
  value: number | null,
  min: number,
  max: number
): { canInc: boolean; canDec: boolean } {
  if (value === null) {
    return {
      canDec: false,
      canInc: false,
    };
  }
  let canDec = true;
  let canInc = true;
  if (min >= value) {
    canDec = false;
  }
  if (max <= value) {
    canInc = false;
  }
  return {
    canDec,
    canInc,
  };
}
