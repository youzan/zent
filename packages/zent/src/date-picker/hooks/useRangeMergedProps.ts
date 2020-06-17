import * as React from 'react';
import { CommonDateMap } from '../utils/dateUtils';
import { parseDate } from '../utils/index';
import processDisabledDate from '../utils/processDisabledDate';
import { addMonths } from 'date-fns';
import { IDatePickerCommonProps } from '../types';

interface IRangeMergedPropsParams
  extends Pick<
    IDatePickerCommonProps,
    'value' | 'format' | 'defaultPanelValue' | 'disabledDate'
  > {}
// range
export default function useRangeMergedProps({
  value,
  format,
  defaultPanelValue,
  disabledDate: disabledDateProps,
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
    const current = CommonDateMap.getCurrent();
    setDefaultPanelDate(
      selected && !!selected[0]
        ? [
            parseDate(selected[0], format),
            parseDate(addMonths(selected[0], 1), format),
          ]
        : defaultPanelValue && defaultPanelValue[0] && defaultPanelValue[1]
        ? [
            parseDate(defaultPanelValue[0], format),
            parseDate(defaultPanelValue[1], format),
          ]
        : [current, addMonths(current, 1)]
    );
  }, [defaultPanelValue, selected, format]);

  // disabledDate
  const disabledDate = processDisabledDate(disabledDateProps, format);

  return {
    selected,
    setSelected,
    defaultPanelDate,
    setDefaultPanelDate,
    disabledDate,
  };
}
