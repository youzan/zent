import * as React from 'react';
import { FC, useContext } from 'react';
import { startOfMonth } from 'date-fns';

import I18nLocaleContext from '../../context/I18nLocaleContext';
import PanelCell from '../../components/PanelCell';
import useCellsData from '../../hooks/useCellsData';
import { ISingleDatePanelProps } from '../../types';

const COL_COUNT = 7;
const ROW_COUNT = 6;

interface IDatePickerBodyProps extends ISingleDatePanelProps {
  popText?: string;
}
const DatePickerBody: FC<IDatePickerBodyProps> = props => {
  const { onHover } = useContext(I18nLocaleContext);
  const {
    selected,
    popText = '',
    defaultPanelDate,
    rangeDate,
    hoverDate,
    hoverRangeDate,
    onSelected,
    disabledPanelDate,
  } = props;

  const startDateOfMonth = React.useMemo(() => startOfMonth(defaultPanelDate), [
    defaultPanelDate,
  ]);

  const cells = useCellsData({
    offset: startDateOfMonth.getDay(),
    defaultPanelDate: startDateOfMonth,
    selected,
    disabledPanelDate,
    rangeDate,
    hoverDate,
    hoverRangeDate,
    ROW_COUNT,
    COL_COUNT,
    type: 'date',
  });

  return (
    <PanelCell
      col={COL_COUNT}
      row={ROW_COUNT}
      cells={cells}
      popText={popText}
      onSelected={onSelected}
      onHover={onHover}
    />
  );
};
export default DatePickerBody;
