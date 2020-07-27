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
  format: string
): RangeDate {
  if (!val || (!val[0] && !val[1])) {
    const emptyRes = valueType === 'string' ? '' : null;
    return [emptyRes, emptyRes];
  }

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
    case 'date': {
      resultVal = val;
      break;
    }
    default:
  }
  return resultVal;
}
