import { formatDate } from './index';
import {
  IValueType,
  IGenerateDateConfig,
  IWeekOption,
  SingleDate,
  RangeDate,
} from '../types';
import { getRangeValuesWithValueType } from './getValueInRangePicker';

/**
 * 根据选择日期获取可用的选中日期
 * 主要用于周组件
 * @param value
 * @param generateDateConfig
 * @param options
 */
export function getSelectedValueWithDate(
  value: Date,
  generateDateConfig: IGenerateDateConfig,
  options: IWeekOption
): Date {
  const onChangeValue = null;
  if (!value) return onChangeValue;

  const { startDate } = generateDateConfig;
  return startDate(value, options);
}

/**
 * 处理回调函数日期值
 * @param value
 * @param valueType
 * @param format
 */
export function getCallbackValueWithDate(
  value: Date,
  valueType: IValueType,
  format: string
): SingleDate {
  let resultVal = null;
  if (!value) return valueType === 'string' ? '' : resultVal;

  switch (valueType) {
    case 'string': {
      resultVal = formatDate(value, format);
      break;
    }
    case 'number': {
      resultVal = value.getTime();
      break;
    }
    case 'date': {
      resultVal = value;
      break;
    }
    default:
  }

  return resultVal;
}

/**
 * 处理回调函数日期范围
 * 主要用于周、月、季度、年
 * @param value
 * @param valueType
 * @param format
 * @param generateDateConfig
 * @param options
 */
export function getCallbackValueRangeWithDate(
  value: Date,
  valueType: IValueType,
  format: string,
  generateDateConfig: IGenerateDateConfig,
  options?: IWeekOption
): RangeDate {
  if (!value) return [null, null];

  let onChangeValue = null;
  const { startDate, endDate } = generateDateConfig;
  if (options) {
    onChangeValue = [startDate(value, options), endDate(value, options)];
  } else {
    onChangeValue = [startDate(value), endDate(value)];
  }

  return getRangeValuesWithValueType(onChangeValue, valueType, format);
}
