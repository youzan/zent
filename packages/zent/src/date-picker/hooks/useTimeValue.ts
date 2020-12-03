import { useState, useEffect } from 'react';
import { parse } from 'date-fns';
import { RangeTime, DateNullTuple, SingleTime } from '../types';

export default function useTimeValue<T = SingleTime>(
  defaultValue: T,
  value?: T
) {
  const [selected, setSelected] = useState<T>(value ?? defaultValue);
  useEffect(() => {
    setSelected(value ?? defaultValue);
  }, [value, defaultValue]);

  return { selected, setSelected };
}

export function parseSelectedToRangeDate(
  value: RangeTime,
  format: string,
  selectedDate: Date
): DateNullTuple {
  return value
    ? [
        value[0] ? parse(value[0], format, selectedDate) : null,
        value[1] ? parse(value[1], format, selectedDate) : null,
      ]
    : [null, null];
}
