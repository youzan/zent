import { formatDateRange } from './index';
import { IValueType, RangeDate } from '../types';

/**
 * 用于range、combined组件
 * @param val
 * @param valueType
 * @param format
 */
export function getRangeValuesWithValueType(
  val: [Date, Date],
  valueType: IValueType,
  format = ''
): RangeDate {
  if (!val[0] && !val[1]) return [null, null];
  let resultVal = null;
  switch (valueType) {
    case 'string': {
      resultVal = formatDateRange(val, format);
      break;
    }
    case 'number': {
      resultVal = [val[0]?.getTime(), val[1]?.getTime()];
      break;
    }
    default: {
      resultVal = val;
    }
  }
  return resultVal;
}
