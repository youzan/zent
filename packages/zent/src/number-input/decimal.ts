import Decimal from 'big.js';
import { INumberInputDecimalProps } from './NumberInput';
import { trimLeadingPlus } from './utils';

export const EMPTY_DECIMAL = new Decimal(0);

export function isPotentialValue(value: string) {
  return value === '' || value === '.' || value === '-' || value === '+';
}

export function isDecimal(value: string): boolean {
  return /^[-+]?\d*\.?\d*$/.test(value);
}

// 表示小数点位数取用户实际输入的小数点位数
const DYNAMIC_DECIMAL_SIGN = -1;

export function getDelta(decimal: number, step?: number): Decimal {
  if (Number.isFinite(step)) {
    return new Decimal(step);
  }

  return new Decimal(1).div(Math.pow(10, decimal));
}

/**
 * 取小数点后数字长度
 * @param decimal
 * @example (3.12) => 2
 */
function getDecimalsLength(decimal: Decimal) {
  const DecimalsRegexMatch = /\.(\d*)$/.exec(decimal.toString());
  if (DecimalsRegexMatch) {
    return DecimalsRegexMatch[1].length;
  }
  return 0;
}
function fromPotential(v: number | string | undefined): Decimal | null {
  v = String(v);
  if (isDecimal(v)) {
    return new Decimal(trimLeadingPlus(v));
  }
  return null;
}

export function normalizeMinMax(props: INumberInputDecimalProps) {
  const min = fromPotential(props.min);
  const max = fromPotential(props.max);
  return {
    min,
    max,
  };
}

export function normalizeValue(
  value: string | number | undefined,
  min: Decimal | null,
  max: Decimal | null,
  decimalPlaces: number,
  showTooltip?: boolean
): {
  input: string;
  value: Decimal;
  pop?: { visible: boolean; text: string; type: string };
} {
  let pop;
  if (value === undefined || value === null) {
    return {
      input: '',
      value: EMPTY_DECIMAL,
    };
  }
  value = String(value);
  if (isPotentialValue(value) || !isDecimal(value)) {
    return {
      input: '',
      value: EMPTY_DECIMAL,
    };
  }
  if (value === '' || isPotentialValue(value)) {
    return {
      input: value,
      value: EMPTY_DECIMAL,
    };
  }
  let decimal = new Decimal(trimLeadingPlus(value));
  if (min !== null) {
    if (min.cmp(decimal) === 1) {
      decimal = min;
      showTooltip &&
        (pop = {
          visible: true,
          text: String(min),
          type: 'min',
        });
    }
  }
  if (max !== null) {
    if (max.cmp(decimal) === -1) {
      decimal = max;
      showTooltip &&
        (pop = {
          visible: true,
          text: String(max),
          type: 'max',
        });
    }
  }
  const popState = pop && showTooltip ? { pop } : {};
  return {
    input: decimal.toFixed(
      decimalPlaces === DYNAMIC_DECIMAL_SIGN
        ? getDecimalsLength(decimal)
        : decimalPlaces
    ),
    value: decimal,
    ...popState,
  };
}

export function calculateLimit(
  value: Decimal,
  min: Decimal | null,
  max: Decimal | null
): { canInc: boolean; canDec: boolean } {
  let canDec = true;
  let canInc = true;
  if (min !== null) {
    canDec = min.cmp(value) === -1;
  }
  if (max !== null) {
    canInc = max.cmp(value) === 1;
  }
  return {
    canDec,
    canInc,
  };
}
