import * as React from 'react';
import { FC, useMemo, useContext } from 'react';
import {
  addMonths,
  addYears,
  startOfMonth,
  setYear,
  setDate,
  setMonth,
} from 'date-fns';

import I18nLocaleContext from '../../context/I18nLocaleContext';
import PanelHeader, { TitleCommonNode } from '../../components/PanelHeader';
import PanelCell from '../../components/PanelCell';
import PanelSubHeader from './PanelSubHeader';
import useCellsData from '../../hooks/useCellsData';
import { IDatePickerPanelProps } from './index';

const COL_COUNT = 7;
const ROW_COUNT = 6;

interface IDatePickerBodyProps extends IDatePickerPanelProps {
  showYear: () => any;
  showMonth: () => any;
  onSwitchYearMonth: (val: Date) => any;
}
const DatePickerBody: FC<IDatePickerBodyProps> = props => {
  const { i18n, onHover } = useContext(I18nLocaleContext);
  const {
    selected,
    popText = '',
    defaultPanelDate,
    rangeDate,
    hoverDate,
    hoverRangeDate,
    onSelected,
    disabledPanelDate,
    showYear,
    showMonth,
    onSwitchYearMonth,
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

  const titleNode = useMemo(
    () => (
      <>
        <TitleCommonNode
          text={defaultPanelDate.getFullYear()}
          unit={i18n.panel.year}
          onClick={showYear}
        />
        <TitleCommonNode
          text={i18n.panel.monthNames[defaultPanelDate.getMonth()]}
          onClick={showMonth}
        />
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [defaultPanelDate]
  );

  const setSelectedDate = (val: Date) => {
    if (!selected) {
      return onSelected(val);
    }
    let selectedDate = selected;
    selectedDate = setYear(selectedDate, val.getFullYear());
    selectedDate = setMonth(selectedDate, val.getMonth());
    selectedDate = setDate(selectedDate, val.getDate());
    onSelected(selectedDate);
  };

  return (
    <>
      <PanelHeader
        showSuper={true}
        titleNode={titleNode}
        onPrev={() => onSwitchYearMonth(addMonths(defaultPanelDate, -1))}
        onNext={() => onSwitchYearMonth(addMonths(defaultPanelDate, 1))}
        onSuperPrev={() => onSwitchYearMonth(addYears(defaultPanelDate, -1))}
        onSuperNext={() => onSwitchYearMonth(addYears(defaultPanelDate, 1))}
      />
      <PanelSubHeader names={i18n.panel.dayNames} />
      <PanelCell
        col={COL_COUNT}
        row={ROW_COUNT}
        cells={cells}
        popText={popText}
        onSelected={setSelectedDate}
        onHover={onHover}
      />
    </>
  );
};
export default DatePickerBody;
