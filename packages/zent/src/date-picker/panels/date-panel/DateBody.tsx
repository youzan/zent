import * as React from 'react';
import { FC, useContext } from 'react';
import {
  startOfMonth,
  setYear,
  setDate,
  setMonth,
  isSameMonth,
  parse,
} from 'date-fns';
import PanelCell from '../../components/PanelCell';
import PanelContext from '../../context/PanelContext';

import getPanelCellsData from '../../utils/getPanelCellsData';
import { dateConfig } from '../../utils/dateUtils';
import {
  ISingleDateBodyProps,
  IShowTime,
  IShowTimeOptionWithDefault,
} from '../../types';

const COL_COUNT = 7;
const ROW_COUNT = 6;

interface IDatePickerBodyProps extends ISingleDateBodyProps {
  popText?: string;
  showTime?: IShowTime;
  showTimeOption?: IShowTimeOptionWithDefault;
}
const DatePickerBody: FC<IDatePickerBodyProps> = props => {
  const { onHover } = useContext(PanelContext);
  const {
    selected,
    popText = '',
    defaultPanelDate,
    rangeDate,
    hoverRangeDate,
    row = ROW_COUNT,
    col = COL_COUNT,
    showTimeOption,
    onSelected,
    disabledPanelDate,
  } = props;

  const startDateOfMonth = React.useMemo(() => startOfMonth(defaultPanelDate), [
    defaultPanelDate,
  ]);

  const cells = React.useMemo(
    () =>
      getPanelCellsData({
        offset: startDateOfMonth.getDay(),
        defaultPanelDate: startDateOfMonth,
        selected,
        disabledPanelDate,
        rangeDate,
        hoverRangeDate,
        row,
        col,
        dateConfig: dateConfig.date,
        inView: isSameMonth,
      }),
    [
      selected,
      rangeDate,
      hoverRangeDate,
      row,
      col,
      startDateOfMonth,
      disabledPanelDate,
    ]
  );

  const setSelectedDate = React.useCallback(
    (val: Date) => {
      if (!selected) {
        return onSelected(
          showTimeOption
            ? parse(showTimeOption.defaultTime, showTimeOption.format, val)
            : val
        );
      }
      let selectedDate = selected;
      selectedDate = setYear(selectedDate, val.getFullYear());
      selectedDate = setMonth(selectedDate, val.getMonth());
      selectedDate = setDate(selectedDate, val.getDate());

      onSelected(selectedDate);
    },
    [selected, showTimeOption, onSelected]
  );

  return (
    <PanelCell
      col={col}
      cells={cells}
      popText={popText}
      onSelected={setSelectedDate}
      onHover={onHover}
    />
  );
};

export default DatePickerBody;
