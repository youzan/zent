import * as React from 'react';
import { parse } from 'date-fns';
import { IDisabledTimeOption } from '../types';
interface IUseConfirmStatus {
  format: string;
  selected: string;
  disabledTimesOption?: IDisabledTimeOption;
}
export default function useConfirmStatus({
  disabledTimesOption,
  selected,
  format,
}: IUseConfirmStatus) {
  const [confirmStatus, setConfirmStatus] = React.useState<boolean>(false);

  React.useEffect(() => {
    const date = parse(selected, format, new Date());
    const hour = date.getHours();
    const minute = date.getMinutes();

    const disabledHour = () =>
      disabledTimesOption?.disabledHours?.()?.includes(hour);
    const disabledMinute = () =>
      disabledTimesOption?.disabledMinutes?.(hour)?.includes(minute);
    const disabledSecond = () =>
      disabledTimesOption
        ?.disabledSeconds?.(hour, minute)
        ?.includes(date.getSeconds());

    setConfirmStatus(
      !selected || disabledHour() || disabledMinute() || disabledSecond()
    );
  }, [selected, format, disabledTimesOption]);
  return confirmStatus;
}
