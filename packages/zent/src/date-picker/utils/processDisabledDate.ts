import { CommonDateMap } from './dateUtils';
import { parseDate } from './index';
import { IDisabledDate, IDisabledDateSimple } from '../types';

export default function processDisabledDate(
  disabledDateProps: IDisabledDate = undefined,
  format
) {
  let disabledDate = undefined;
  if (typeof disabledDateProps === 'object') {
    const { min, max } = disabledDateProps as IDisabledDateSimple;
    // TODO
    disabledDate = date =>
      CommonDateMap.isBefore(date, parseDate(min, format)) &&
      CommonDateMap.isAfter(date, parseDate(max, format));
  } else {
    disabledDate = disabledDateProps;
  }
  return disabledDate;
}
