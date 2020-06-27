import { formatDate } from './index';
import { IValueType, IGenerateDateConfig, IWeekOption } from '../types';

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
  options?: IWeekOption
): Date {
  let onChangeValue = null;

  const { startDate } = generateDateConfig;
  if (options) {
    onChangeValue = startDate(value, options);
  } else {
    onChangeValue = startDate(value);
  }

  return onChangeValue;
}

/**
 * 处理回调函数日期值
 * @param val
 * @param valueType
 * @param format
 */
export function getCallbackValueWithDate(
  val: Date,
  valueType: IValueType,
  format = ''
): Date {
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

/**
 * 处理回调函数日期范围
 * 主要用于周、月、季度、年
 * @param val
 * @param valueType
 * @param format
 * @param generateDateConfig
 * @param options
 */
export function getCallbackValueRangeWithDate(
  val: Date,
  valueType: IValueType,
  format = '',
  generateDateConfig: IGenerateDateConfig,
  options?: IWeekOption
): [Date, Date] {
  if (!val) return [null, null];
  let onChangeValue = null;
  const { startDate, endDate } = generateDateConfig;
  if (options) {
    onChangeValue = [startDate(val, options), endDate(val, options)];
  } else {
    onChangeValue = [startDate(val), endDate(val)];
  }

  const [start, end] = onChangeValue;
  let resultVal = null;
  switch (valueType) {
    case 'string': {
      resultVal = [formatDate(start, format), formatDate(end, format)];
      break;
    }
    case 'number': {
      resultVal = [start.getTime(), end.getTime()];
      break;
    }
    default: {
      resultVal = [start, end];
    }
  }
  return resultVal;
}
