import * as React from 'react';
import { parse } from 'date-fns';
import { RangeTime, SingleTime } from '../types';

export default function useTimeValue<T = SingleTime>(value: T) {
  const [selected, setSelected] = React.useState<T>(value);
  React.useEffect(() => {
    setSelected(value);
  }, [value]);

  return { selected, setSelected };
}

export function parseSelectedToRangeDate(
  value: RangeTime,
  format: string,
  selectedDate: Date
): [Date, Date] {
  return value
    ? [
        value[0] ? parse(value[0], format, selectedDate || new Date()) : null,
        value[1] ? parse(value[1], format, selectedDate || new Date()) : null,
      ]
    : [null, null];
}
