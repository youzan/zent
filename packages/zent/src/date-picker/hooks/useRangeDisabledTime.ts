import { useRef, useCallback, useMemo } from 'react';
import { isSameDay, isSameHour, isSameMinute } from 'date-fns';
import { IDisabledTime, RangeTypeMap, DateNullTuple } from '../types';

const { START, END } = RangeTypeMap;

function initArray(targetNum: number) {
  return Array.from({ length: targetNum }, (_, index) => index);
}
function initRemainArray(targetNum: number, total: number) {
  return Array.from({ length: total - targetNum }, (_, index) => total - index);
}
/**
 * 开始、结束日期的disabledDate方法（用于选择范围日期组件的）
 * @param values
 * @param disabledDate
 * @param type
 */
export default function useRangeDisabledTime({
  selected,
  disabledTime,
}: {
  selected: DateNullTuple;
  disabledTime?: IDisabledTime;
}) {
  const disabledTimeRef = useRef(disabledTime);
  disabledTimeRef.current = disabledTime;
  const [start, end] = selected;

  const disabledEndTimes = useCallback(
    (date?: Date | null) => {
      const sameDay = start && date ? isSameDay(start, date) : false;
      const sameHour = start && date ? isSameHour(start, date) : false;
      const sameMinute = start && date ? isSameMinute(start, date) : false;
      const endHour = date?.getHours() || 0;
      const endMinute = date?.getMinutes() || 0;
      const startHour = start?.getHours() || 0;
      const startMinute = start?.getMinutes() || 0;
      const startSecond = start?.getSeconds() || 0;
      // 根据disabled方法计算得到的disabled numbers
      const defaultDisabledHours =
        disabledTimeRef.current?.(date, END).disabledHours?.() || [];
      const defaultDisabledMinutes =
        disabledTimeRef.current?.(date, END).disabledMinutes?.(endHour) || [];
      const defaultDisabledSeconds =
        disabledTimeRef
          .current?.(date, END)
          .disabledSeconds?.(endHour, endMinute) || [];

      // 根据开始时间生成结束时间的disabled方法
      const disabledHours = () =>
        defaultDisabledHours.concat(sameDay ? initArray(startHour) : []);
      const disabledMinutes = () =>
        defaultDisabledMinutes.concat(
          sameDay && sameHour ? initArray(startMinute) : []
        );
      const disabledSeconds = () =>
        defaultDisabledSeconds.concat(
          sameDay && sameHour && sameMinute ? initArray(startSecond) : []
        );

      return { disabledHours, disabledMinutes, disabledSeconds };
    },
    [start, disabledTimeRef]
  );

  const disabledStartTimes = useCallback(
    (date?: Date | null) => {
      const sameDay = date && end ? isSameDay(date, end) : false;
      const sameHour = date && end ? isSameHour(date, end) : false;
      const sameMinute = date && end ? isSameMinute(date, end) : false;
      const startHour = date?.getHours() || 0;
      const startMinute = date?.getMinutes() || 0;
      const endHour = end?.getHours() || 0;
      const endMinute = end?.getMinutes() || 0;
      const endSecond = end?.getSeconds() || 0;

      // 根据disabled方法计算得到的disabled numbers
      const defaultDisabledHours =
        disabledTimeRef.current?.(date, START).disabledHours?.() || [];
      const defaultDisabledMinutes =
        disabledTimeRef.current?.(date, START).disabledMinutes?.(startHour) ||
        [];
      const defaultDisabledSeconds =
        disabledTimeRef
          .current?.(date, START)
          .disabledSeconds?.(startHour, startMinute) || [];

      // 根据结束时间生成开始时间的disabled方法
      const disabledHours = () =>
        defaultDisabledHours.concat(
          sameDay ? initRemainArray(endHour, 23) : []
        );
      const disabledMinutes = () =>
        defaultDisabledMinutes.concat(
          sameDay && sameHour ? initRemainArray(endMinute, 59) : []
        );
      const disabledSeconds = () =>
        defaultDisabledSeconds.concat(
          sameDay && sameHour && sameMinute
            ? initRemainArray(endSecond, 59)
            : []
        );

      return { disabledHours, disabledMinutes, disabledSeconds };
    },
    [end, disabledTimeRef]
  );

  const disabledConfirm: boolean = useMemo(
    () => !start || !end || (!!start && !!end && start > end),
    [start, end]
  );
  return { disabledStartTimes, disabledEndTimes, disabledConfirm };
}
