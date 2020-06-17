import * as React from 'react';
import { CommonDateMap } from '../utils/dateUtils';
import { parseDate } from '../utils/index';
import processDisabledDate from '../utils/processDisabledDate';

// single
export default function useMergedProps({
  value,
  format,
  disabledDate,
  defaultPanelValue,
}) {
  // defaultPanelDate
  const [defaultPanelDate, setDefaultPanelDate] = React.useState<Date>();

  // selected
  const [selected, setSelected] = React.useState<Date>(
    value ? parseDate(value, format) : null
  );

  // defaultPanelDate
  React.useEffect(() => {
    setDefaultPanelDate(
      defaultPanelValue
        ? parseDate(defaultPanelValue, format)
        : selected
        ? parseDate(selected, format)
        : CommonDateMap.getCurrent()
    );
  }, [defaultPanelValue, selected, value, format]);

  const disabledPanelDate = processDisabledDate(disabledDate, format);

  return {
    selected,
    setSelected,
    defaultPanelDate,
    setDefaultPanelDate,
    disabledPanelDate,
  };
}
