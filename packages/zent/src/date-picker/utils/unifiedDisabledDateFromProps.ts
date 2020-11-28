import { endOfDay, isAfter, isBefore, startOfDay } from 'date-fns';
import { parseBase } from './index';
import {
  IDisabledDate,
  IDisabledDateSimple,
  IDisabledDateFunc,
} from '../types';
/**
 * props的DisabledDate参数 支持 {min, max} 格式
 * 内部统一转成方法
 * @param format
 * @param disabledDateProps
 */
export default function unifiedDisabledDateFromProps(
  format: string,
  disabledDateProps: IDisabledDate
): IDisabledDateFunc {
  let disabledDate: IDisabledDateFunc;
  if (typeof disabledDateProps === 'object') {
    const { min, max } = disabledDateProps as IDisabledDateSimple;
    disabledDate = (date: Date) =>
      (!!min && isBefore(endOfDay(date), parseBase(min, format))) ||
      (!!max && isAfter(startOfDay(date), parseBase(max, format)));
  } else {
    disabledDate = disabledDateProps;
  }
  return disabledDate;
}
