import { useState, useEffect } from 'react';
import { parse } from 'date-fns';
import { IDisabledTimeOption } from '../types';
interface IUseConfirmStatus {
  format: string;
  selected: string;
  disabledTimeOption?: IDisabledTimeOption;
}
export default function useConfirmStatus({
  disabledTimeOption,
  selected,
  format,
}: IUseConfirmStatus) {
  const [confirmStatus, setConfirmStatus] = useState<boolean>(false);

  useEffect(() => {
    const date = parse(selected, format, new Date());
    const hour = date.getHours();
    const minute = date.getMinutes();

    const disabledHour = () =>
      disabledTimeOption?.disabledHours?.()?.includes(hour);
    const disabledMinute = () =>
      disabledTimeOption?.disabledMinutes?.(hour)?.includes(minute);
    const disabledSecond = () =>
      disabledTimeOption
        ?.disabledSeconds?.(hour, minute)
        ?.includes(date.getSeconds());

    setConfirmStatus(
      !selected || disabledHour() || disabledMinute() || disabledSecond()
    );
  }, [selected, format, disabledTimeOption]);
  return confirmStatus;
}
