import Decimal from 'big.js';
import { INumberInputDecimalProps } from './NumberInput';
import { trimLeadingPlus } from './utils';

export const EMPTY_DECIMAL = new Decimal(0);

export function isPotentialValue(value: string) {
  return value === '' || value === '.' || value === '-' || value === '+';
}

export function isDecimal(value: string): boolean {
  return /^[\-+]?\d*\.?\d*$/.test(value);
}

export function getDelta(decimal: number): Decimal {
  return new Decimal(1).div(Math.pow(10, decimal));
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
  decimalPlaces: number
): { input: string; value: Decimal } {
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
    }
  }
  if (max !== null) {
    if (max.cmp(decimal) === -1) {
      decimal = max;
    }
  }
  return {
    input: decimal.toFixed(decimalPlaces),
    value: decimal,
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
