import { generateDateConfig } from './dateUtils';
import { formatDate } from './index';

import { IPickerType, IValueType, SingleDate } from '../types';
// interface IDateFnsOption {
//   weekStartsOn?:  0 | 1 | 2 | 3 | 4 | 5 | 6;
// }
export function getValueFromSinglePickerDate(
  value: Date,
  type: IPickerType,
  options?: any
): Date | [Date, Date] {
  let onChangeValue = null;

  switch (type) {
    case 'week':
    case 'month':
    case 'quarter':
    case 'year': {
      let dateOptions = {};
      if (type === 'week') {
        dateOptions = Object.assign({}, dateOptions, options);
      }
      onChangeValue = [
        generateDateConfig[type].startDate(value, dateOptions),
        generateDateConfig[type].endDate(value, dateOptions),
      ];
      break;
    }
    default: {
      onChangeValue = value;
    }
  }
  return onChangeValue;
}

export function getValueWithValueType(
  val: Date,
  valueType: IValueType,
  format = ''
): SingleDate {
  let resultVal = null;

  switch (valueType) {
    case 'string': {
      resultVal = formatDate(val, format);
      break;
    }
    case 'number': {
      resultVal = val.getTime();
      break;
    }
    default: {
      resultVal = val;
    }
  }

  return resultVal;
}

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
