import * as React from 'react';
import { parseDate } from '../utils/index';
import unifiedDisabledDateFromProps from '../utils/unifiedDisabledDateFromProps';
import { SingleDate, IDisabledDate } from '../types';
const current = new Date();
/**
 * merge from props
 * used by SinglePicker
 * @param value {SingleDate}
 * @param format {string}
 * @param disabledDateRef {React.MutableRefObject<IDisabledDate>}
 */
export default function useMergedProps({
  value,
  format,
  disabledDateRef,
  defaultDate,
}: {
  value: SingleDate;
  format: string;
  disabledDateRef: React.MutableRefObject<IDisabledDate>;
  defaultDate: SingleDate;
}) {
  // defaultPanelDate
  const [defaultPanelDate, setDefaultPanelDate] = React.useState<Date>(current);

  // selected
  const [selected, setSelected] = React.useState<Date>(
    value ? parseDate(value, format) : null
  );

  // defaultPanelDate
  React.useEffect(() => {
    setDefaultPanelDate(
      selected
        ? parseDate(selected, format)
        : defaultDate
        ? parseDate(defaultDate, format)
        : current
    );
  }, [defaultDate, selected, value, format]);

  const disabledPanelDate = unifiedDisabledDateFromProps(
    disabledDateRef?.current,
    format
  );

  return {
    selected,
    setSelected,
    defaultPanelDate,
    disabledPanelDate,
  };
}
