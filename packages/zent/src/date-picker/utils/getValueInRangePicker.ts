import { formatDateRange } from './index';
import { IValueType, DateNullTuple, RangeDate } from '../types';

/**
 * 用于range、combined组件
 * @param value
 * @param valueType
 * @param format
 */
export function getRangeValuesWithValueType(
  valueType: IValueType,
  format: string,
  value: DateNullTuple
): RangeDate {
  switch (valueType) {
    case 'string': {
      return formatDateRange(value, format);
    }
    case 'number': {
      return [value[0]?.getTime() || 0, value[1]?.getTime() || 0];
    }
    default: {
      return value;
    }
  }
}
