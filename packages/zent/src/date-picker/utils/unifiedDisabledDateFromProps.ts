import { CommonDateMap } from './dateUtils';
import { parseDate } from './index';
import { IDisabledDate } from '../types';

const { isAfter, isBefore } = CommonDateMap;

/**
 * props的DisabledDate参数 支持 {min, max} 格式
 * 内部统一转成方法
 * @param disabledDateProps
 * @param format
 */
export default function unifiedDisabledDateFromProps(
  disabledDateProps: IDisabledDate = undefined,
  format
): (val: Date) => boolean {
  let disabledDate = undefined;
  if (typeof disabledDateProps === 'object') {
    const { min, max } = disabledDateProps;
    disabledDate = date =>
      (min && isBefore(date, parseDate(min, format))) ||
      (max && isAfter(date, parseDate(max, format)));
  } else {
    disabledDate = disabledDateProps;
  }
  return disabledDate as (val: Date) => boolean;
}
