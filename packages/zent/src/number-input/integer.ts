import { INumberInputIntegerProps } from './NumberInput';
import utilsIsInteger from '../utils/isInteger';
import { warning } from '../utils/warning';

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
    warning(false, 'max is smaller than min');
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

export const isInteger = utilsIsInteger;

export function normalizeValue(
  potential: number | undefined | null,
  min: number,
  max: number,
  showTooltip?: boolean
): {
  input: string;
  value: number | null;
  pop?: { visible: boolean; text: string; type: string };
} {
  let value: number | null;
  let input: string | null = null;
  let pop;
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
    // 判断是否需要显示pop提示
    if (value < min) {
      showTooltip &&
        (pop = {
          visible: true,
          type: 'min',
          text: String(min),
        });
    } else if (value > max) {
      showTooltip &&
        (pop = {
          visible: true,
          text: String(max),
          type: 'max',
        });
    }
    value = Math.min(max, value);
    value = Math.max(min, value);
  }
  if (input === null) {
    input = String(value);
  }
  const popState = pop && showTooltip ? { pop } : {};
  return {
    ...popState,
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

export function getDelta(step?: number) {
  if (Number.isFinite(step)) {
    return Math.round(step);
  }

  return 1;
}
