import { useCallback } from 'react';
import { IDisabledDate } from '../types';
import unifiedDisabledDateFromProps from '../utils/unifiedDisabledDateFromProps';

export default function useNormalizeDisabledDate(
  format: string,
  disabledDate: IDisabledDate
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const normalizedDisabledDate = useCallback(
    unifiedDisabledDateFromProps(format, disabledDate),
    [disabledDate, format]
  );
  return normalizedDisabledDate;
}
