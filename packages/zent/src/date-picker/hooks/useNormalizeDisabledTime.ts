import { useCallback } from 'react';
import { IDisabledTime, IDisabledDate } from '../types';
import unifiedDisabledTimeFromProps from '../utils/unifiedDisabledTimeFromProps';

export default function useNormalizeDisabledTime(
  format: string,
  disabledDate: IDisabledDate,
  disabledTime: IDisabledTime
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const normalizedDisabledTime = useCallback(
    unifiedDisabledTimeFromProps(format, disabledDate, disabledTime),
    [disabledDate, format, disabledTime]
  );
  return normalizedDisabledTime;
}
