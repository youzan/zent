import { endOfDay, isAfter, isBefore, startOfDay, isSameDay } from 'date-fns';
import { parseBase } from './index';
import { IDisabledDate, IDisabledTime, IDisabledDateSimple } from '../types';

function generateNumberArray(max) {
  return Array.from({ length: max + 1 }, (_, i) => i);
}

/**
 * props的DisabledDate参数 支持 {min, max} 格式
 * 内部统一转成方法-输出disabledTime
 * @param format
 * @param disabledDateProps
 * @param disabledTime
 */
export default function unifiedDisabledDateFromProps(
  format: string,
  disabledDateProps: IDisabledDate,
  disabledTime: IDisabledTime
): IDisabledTime {
  if (typeof disabledTime === 'function') {
    return disabledTime;
  }
  if (typeof disabledDateProps === 'object') {
    const { min, max } = disabledDateProps as IDisabledDateSimple;
    const disabledDate = (date: Date) =>
      (!!min && isBefore(endOfDay(date), parseBase(min, format))) ||
      (!!max && isAfter(startOfDay(date), parseBase(max, format)));
    return (date: Date) => {
      const isDateDisabled = disabledDate(date);
      if (isDateDisabled) {
        return {
          disabledHours: () => generateNumberArray(23),
          disabledMinutes: () => generateNumberArray(59),
          disabledSeconds: () => generateNumberArray(59),
        };
      }
      if (!!min && isSameDay(endOfDay(date), parseBase(min, format))) {
        // 如果是min当天，那么只有min之前的时间是disabled的
        const minDate = parseBase(min, format);
        return {
          disabledHours: () => generateNumberArray(minDate.getHours() - 1),
          disabledMinutes: (hour: number) =>
            hour === minDate.getHours()
              ? generateNumberArray(minDate.getMinutes() - 1)
              : [],
          disabledSeconds: (hour: number, minute: number) =>
            hour === minDate.getHours() && minute === minDate.getMinutes()
              ? generateNumberArray(minDate.getSeconds() - 1)
              : [],
        };
      }
      if (!!max && isSameDay(startOfDay(date), parseBase(max, format))) {
        // 如果是max当天，那么只有max之后的时间是disabled的
        const maxDate = parseBase(max, format);
        return {
          disabledHours: () =>
            generateNumberArray(23).slice(maxDate.getHours() + 1),
          disabledMinutes: (hour: number) =>
            hour === maxDate.getHours()
              ? generateNumberArray(59).slice(maxDate.getMinutes() + 1)
              : [],
          disabledSeconds: (hour: number, minute: number) =>
            hour === maxDate.getHours() && minute === maxDate.getMinutes()
              ? generateNumberArray(59).slice(maxDate.getSeconds() + 1)
              : [],
        };
      }
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };
    };
  }
  return disabledTime;
}
