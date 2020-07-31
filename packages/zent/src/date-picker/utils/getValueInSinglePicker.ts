import { formatDate } from './index';
import {
  IValueType,
  IGenerateDateConfig,
  IWeekOption,
  SingleDate,
  RangeDate,
  DateNullArray,
} from '../types';
import { getRangeValuesWithValueType } from './getValueInRangePicker';

/**
 * 根据选择日期获取可用的选中日期
 * 主要用于周组件
 * @param value
 * @param dateConfig
 * @param options
 */
export function getSelectedValueWithDate(
  value: Date,
  dateConfig: IGenerateDateConfig,
  options: IWeekOption
): Date | null {
  const onChangeValue = null;
  if (!value) return onChangeValue;

  const { startDate } = dateConfig;
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
  switch (valueType) {
    case 'string': {
      return formatDate(format, value);
    }
    case 'number': {
      return value.getTime();
    }
    case 'date': {
      return value;
    }
    default:
      return value;
  }
}

/**
 * 处理回调函数日期范围
 * 主要用于周、月、季度、年
 * @param value
 * @param valueType
 * @param format
 * @param dateConfig
 * @param options
 */
export function getCallbackValueRangeWithDate(
  value: Date,
  valueType: IValueType,
  format: string,
  dateConfig: IGenerateDateConfig,
  options?: IWeekOption
): RangeDate {
  let onChangeValue: DateNullArray;
  const { startDate, endDate } = dateConfig;
  if (options) {
    onChangeValue = [startDate(value, options), endDate(value, options)];
  } else {
    onChangeValue = [startDate(value), endDate(value)];
  }

  return getRangeValuesWithValueType(valueType, format, onChangeValue);
}
