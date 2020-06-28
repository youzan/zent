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
import { generateDateConfig } from '../../utils/dateUtils';
import { ISingleDateBodyProps } from '../../types';

const COL_COUNT = 7;
const ROW_COUNT = 6;

interface IDatePickerBodyProps extends ISingleDateBodyProps {
  popText?: string;
  defaultTime?: string;
  format?: string;
}
const DatePickerBody: FC<IDatePickerBodyProps> = props => {
  const { onHover } = useContext(PanelContext);
  const {
    selected,
    popText = '',
    defaultPanelDate,
    rangeDate,
    hoverDate,
    hoverRangeDate,
    row,
    col,
    defaultTime,
    format,
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
        hoverDate,
        hoverRangeDate,
        row,
        col,
        generateDateConfig: generateDateConfig.date,
        inView: isSameMonth,
      }),
    [
      selected,
      rangeDate,
      hoverDate,
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
          defaultTime && format ? parse(defaultTime, format, val) : val
        );
      }
      let selectedDate = selected;
      selectedDate = setYear(selectedDate, val.getFullYear());
      selectedDate = setMonth(selectedDate, val.getMonth());
      selectedDate = setDate(selectedDate, val.getDate());

      onSelected(
        defaultTime && format
          ? parse(defaultTime, format, selectedDate)
          : selectedDate
      );
    },
    [selected, defaultTime, format, onSelected]
  );

  return (
    <PanelCell
      col={COL_COUNT}
      row={ROW_COUNT}
      cells={cells}
      popText={popText}
      onSelected={setSelectedDate}
      onHover={onHover}
    />
  );
};
DatePickerBody.defaultProps = {
  row: ROW_COUNT,
  col: COL_COUNT,
};
export default DatePickerBody;
