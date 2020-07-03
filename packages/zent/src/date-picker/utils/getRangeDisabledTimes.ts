import { isSameDay, isSameHour, isSameMinute } from 'date-fns';
import { IDisabledTimes, RangeType } from '../types';

/**
 * 开始、结束日期的disabledDate方法（用于选择范围日期组件的）
 * @param values
 * @param disabledDate
 * @param type
 */
export default function getRangeDisabledTimes({
  selected,
  disabledTimes,
}: {
  selected: [Date, Date];
  disabledTimes: IDisabledTimes;
}) {
  const [start, end] = selected;

  const disabledEndTimes = (type: RangeType) => (date: Date) => {
    const sameDay = start && date ? isSameDay(start, date) : false;
    const sameHour = start && date ? isSameHour(start, date) : false;
    const sameMinute = start && date ? isSameMinute(start, date) : false;
    const startHour = start?.getHours() || 0;
    const startMinute = start?.getMinutes() || 0;
    const startSecond = start?.getSeconds() || 0;
    const disabledHours = sameDay
      ? () =>
          Array.from({ length: startHour }, (_, index) => index).concat(
            disabledTimes?.(date, type).disabledHours?.() || []
          )
      : () => disabledTimes?.(date, type).disabledHours?.();

    const disabledMinutes =
      sameDay && sameHour
        ? () =>
            Array.from({ length: startMinute }, (_, index) => index).concat(
              disabledTimes?.(date, type).disabledMinutes?.(startHour) || []
            )
        : () => disabledTimes?.(date, type).disabledMinutes?.(startHour);

    const disabledSeconds =
      sameDay && sameHour && sameMinute
        ? () =>
            Array.from({ length: startSecond }, (_, index) => index).concat(
              disabledTimes?.(date, type).disabledSeconds?.(
                startHour,
                startMinute
              ) || []
            )
        : () =>
            disabledTimes?.(date, type).disabledSeconds?.(
              startHour,
              startMinute
            );

    return { disabledHours, disabledMinutes, disabledSeconds };
  };

  const disabledStartTimes = (type: RangeType) => (date: Date) => {
    const sameDay = date && end ? isSameDay(date, end) : false;
    const sameHour = date && end ? isSameHour(date, end) : false;
    const sameMinute = date && end ? isSameMinute(date, end) : false;
    const endHour = end?.getHours() || 0;
    const endMinute = end?.getMinutes() || 0;
    const endSecond = end?.getSeconds() || 0;
    const disabledHours = sameDay
      ? () =>
          Array.from({ length: 23 - endHour }, (_, index) => 23 - index).concat(
            disabledTimes?.(date, type).disabledHours?.() || []
          )
      : () => disabledTimes?.(date, type).disabledHours?.();

    const disabledMinutes =
      sameDay && sameHour
        ? () =>
            Array.from(
              { length: 59 - endMinute },
              (_, index) => 59 - index
            ).concat(
              disabledTimes?.(date, type).disabledMinutes?.(endHour) || []
            )
        : () => disabledTimes?.(date, type).disabledMinutes?.(endHour);

    const disabledSeconds =
      sameDay && sameHour && sameMinute
        ? () =>
            Array.from(
              { length: 59 - endSecond },
              (_, index) => 59 - index
            ).concat(
              disabledTimes?.(date, type).disabledSeconds?.(
                endHour,
                endMinute
              ) || []
            )
        : () =>
            disabledTimes?.(date, type).disabledSeconds?.(endHour, endMinute);

    return { disabledHours, disabledMinutes, disabledSeconds };
  };

  const disabledConfirm: boolean = start > end;
  return { disabledStartTimes, disabledEndTimes, disabledConfirm };
}
