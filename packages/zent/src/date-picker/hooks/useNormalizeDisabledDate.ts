import * as React from 'react';
import { IDisabledDate } from '../types';
import unifiedDisabledDateFromProps from '../utils/unifiedDisabledDateFromProps';

export default function useNormalizeDisabledDate(
  disabledDate: IDisabledDate,
  format: string
) {
  const normalizedDisabledDate = React.useCallback(
    unifiedDisabledDateFromProps(disabledDate, format),
    [disabledDate, format]
  );
  return normalizedDisabledDate;
}
