import * as React from 'react';
import { parseDate, parseDateRange } from '../utils/index';
import unifiedDisabledDateFromProps from '../utils/unifiedDisabledDateFromProps';
import { addMonths } from 'date-fns';
import { IDatePickerCommonProps, SingleDate, IDisabledDate } from '../types';

interface IRangeMergedPropsParams
  extends Pick<
    IDatePickerCommonProps<[SingleDate, SingleDate]>,
    'value' | 'format' | 'defaultDate'
  > {
  disabledDatePropsRef: React.MutableRefObject<IDisabledDate>;
}
// range
export default function useRangeMergedProps({
  value,
  format,
  defaultDate,
  disabledDatePropsRef,
}: IRangeMergedPropsParams) {
  // defaultPanelDate
  const [defaultPanelDate, setDefaultPanelDate] = React.useState<
    [Date, Date]
  >();

  // selected
  const [selected, setSelected] = React.useState<[Date, Date]>(
    value
      ? [parseDate(value[0], format), parseDate(value[1], format)]
      : [null, null]
  );

  // defaultPanelDate
  React.useEffect(() => {
    const current = new Date();
    setDefaultPanelDate(
      selected && !!selected[0]
        ? [
            parseDate(selected[0], format),
            parseDate(addMonths(selected[0], 1), format),
          ]
        : defaultDate && defaultDate[0] && defaultDate[1]
        ? parseDateRange(defaultDate, format)
        : [current, addMonths(current, 1)]
    );
  }, [defaultDate, selected, format]);

  // disabledDate
  const disabledDate = unifiedDisabledDateFromProps(
    disabledDatePropsRef?.current,
    format
  );

  return {
    selected,
    setSelected,
    defaultPanelDate,
    setDefaultPanelDate,
    disabledDate,
  };
}
