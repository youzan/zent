import * as React from 'react';
import { IDisabledDate } from '../types';
import unifiedDisabledDateFromProps from '../utils/unifiedDisabledDateFromProps';

export default function useNormalizeDisabledDate(
  format: string,
  disabledDate: IDisabledDate
) {
  const normalizedDisabledDate = React.useCallback(
    unifiedDisabledDateFromProps(format, disabledDate),
    [disabledDate, format]
  );
  return normalizedDisabledDate;
}
