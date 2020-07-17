import * as React from 'react';
import { isSameDay, isSameHour, isSameMinute } from 'date-fns';
import { IDisabledTime, RangeTypeMap } from '../types';

const { START, END } = RangeTypeMap;
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
  selected: [Date, Date];
  disabledTime: IDisabledTime;
}) {
  const disabledTimesRef = React.useRef(disabledTime);
  disabledTimesRef.current = disabledTime;
  const [start, end] = selected;

  const disabledEndTimes = React.useCallback(
    (date: Date) => {
      const sameDay = start && date ? isSameDay(start, date) : false;
      const sameHour = start && date ? isSameHour(start, date) : false;
      const sameMinute = start && date ? isSameMinute(start, date) : false;
      const startHour = start?.getHours() || 0;
      const startMinute = start?.getMinutes() || 0;
      const startSecond = start?.getSeconds() || 0;
      const disabledHours = sameDay
        ? () =>
            Array.from({ length: startHour }, (_, index) => index).concat(
              disabledTimesRef.current?.(date, END).disabledHours?.() || []
            )
        : () => disabledTimesRef.current?.(date, END).disabledHours?.();

      const disabledMinutes =
        sameDay && sameHour
          ? () =>
              Array.from({ length: startMinute }, (_, index) => index).concat(
                disabledTimesRef
                  .current?.(date, END)
                  .disabledMinutes?.(startHour) || []
              )
          : () =>
              disabledTimesRef
                .current?.(date, END)
                .disabledMinutes?.(startHour);

      const disabledSeconds =
        sameDay && sameHour && sameMinute
          ? () =>
              Array.from({ length: startSecond }, (_, index) => index).concat(
                disabledTimesRef
                  .current?.(date, END)
                  .disabledSeconds?.(startHour, startMinute) || []
              )
          : () =>
              disabledTimesRef
                .current?.(date, END)
                .disabledSeconds?.(startHour, startMinute);

      return { disabledHours, disabledMinutes, disabledSeconds };
    },
    [start, disabledTimesRef]
  );

  const disabledStartTimes = React.useCallback(
    (date: Date) => {
      const sameDay = date && end ? isSameDay(date, end) : false;
      const sameHour = date && end ? isSameHour(date, end) : false;
      const sameMinute = date && end ? isSameMinute(date, end) : false;
      const endHour = end?.getHours() || 0;
      const endMinute = end?.getMinutes() || 0;
      const endSecond = end?.getSeconds() || 0;
      const disabledHours = sameDay
        ? () =>
            Array.from(
              { length: 23 - endHour },
              (_, index) => 23 - index
            ).concat(
              disabledTimesRef.current?.(date, START).disabledHours?.() || []
            )
        : () => disabledTimesRef.current?.(date, START).disabledHours?.();

      const disabledMinutes =
        sameDay && sameHour
          ? () =>
              Array.from(
                { length: 59 - endMinute },
                (_, index) => 59 - index
              ).concat(
                disabledTimesRef
                  .current?.(date, START)
                  .disabledMinutes?.(endHour) || []
              )
          : () =>
              disabledTimesRef
                .current?.(date, START)
                .disabledMinutes?.(endHour);

      const disabledSeconds =
        sameDay && sameHour && sameMinute
          ? () =>
              Array.from(
                { length: 59 - endSecond },
                (_, index) => 59 - index
              ).concat(
                disabledTimesRef
                  .current?.(date, START)
                  .disabledSeconds?.(endHour, endMinute) || []
              )
          : () =>
              disabledTimesRef
                .current?.(date, START)
                .disabledSeconds?.(endHour, endMinute);

      return { disabledHours, disabledMinutes, disabledSeconds };
    },
    [end, disabledTimesRef]
  );

  const disabledConfirm: boolean = React.useMemo(() => start > end, [
    start,
    end,
  ]);
  return { disabledStartTimes, disabledEndTimes, disabledConfirm };
}
