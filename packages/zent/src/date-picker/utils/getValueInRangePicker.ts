import { formatDate } from './index';
import { IValueType, SingleDate } from '../types';

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
): [SingleDate, SingleDate] {
  if (!val[0] && !val[1]) return [null, null];
  let resultVal = null;
  switch (valueType) {
    case 'string': {
      resultVal = [formatDate(val[0], format), formatDate(val[1], format)];
      break;
    }
    case 'number': {
      resultVal = [val[0].getTime(), val[1].getTime()];
      break;
    }
    default: {
      resultVal = val;
    }
  }
  return resultVal;
}
