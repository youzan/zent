import * as React from 'react';

import DatePickerBody from './DateBody';
import DatePickerFooter from './DateFooter';
import { ISingleDatePanelProps, IDisabledTimes } from '../../types';

export interface IDatePickerPanelProps extends ISingleDatePanelProps {
  popText?: string;
  hideFooter?: boolean;
  showTime?: boolean;
  disabledTimes?: IDisabledTimes;
}
const DatePickerPanel: React.FC<IDatePickerPanelProps> = props => {
  const {
    defaultPanelDate,
    hideFooter = false,
    onSelected,
    showTime,
    onChangePanel,
    ...resetProps
  } = props;
  const [panelDate, setPanelDate] = React.useState<Date>(defaultPanelDate);

  const DateBody = (
    <DatePickerBody
      {...resetProps}
      onSelected={val => onSelected(val, !showTime)}
      defaultPanelDate={panelDate}
      showYear={() => onChangePanel('year')}
      showMonth={() => onChangePanel('month')}
      onSwitchYearMonth={val => {
        setPanelDate(val);
      }}
    />
  );

  return (
    <>
      {DateBody}
      {!hideFooter && <DatePickerFooter {...props} />}
    </>
  );
};
export default DatePickerPanel;
