import * as React from 'react';
import PanelHeader, { Title } from '../../components/PanelHeader';
import PanelSubHeader from './PanelSubHeader';
import DatePickerBody from './DateBody';
import DatePickerFooter from './DateFooter';
import MonthPanel from '../month-panel';
import YearPanel from '../year-panel';

import PickerContext from '../../context/PickerContext';

import { ISingleDatePanelProps, IDisabledTimes } from '../../types';

import { setYear, setMonth, addMonths, addYears } from 'date-fns';

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
    ...resetProps
  } = props;
  const { i18n } = React.useContext(PickerContext);

  const [showYear, setShowYear] = React.useState<boolean>(false);
  const [showMonth, setShowMonth] = React.useState<boolean>(false);
  const [panelDate, setPanelDate] = React.useState<Date>(defaultPanelDate);

  const titleNode = React.useMemo(
    () => (
      <>
        <Title
          text={panelDate.getFullYear()}
          unit={i18n.panel.year}
          onClick={() => setShowYear(true)}
        />
        <Title
          text={i18n.panel.monthNames[panelDate.getMonth()]}
          onClick={() => setShowMonth(true)}
        />
      </>
    ),
    [panelDate, i18n]
  );

  const DatePanel = (
    <>
      <PanelHeader
        showSuper={true}
        titleNode={titleNode}
        onPrev={() => setPanelDate(addMonths(panelDate, -1))}
        onNext={() => setPanelDate(addMonths(panelDate, 1))}
        onSuperPrev={() => setPanelDate(addYears(panelDate, -1))}
        onSuperNext={() => setPanelDate(addYears(panelDate, 1))}
      />
      <PanelSubHeader names={i18n.panel.dayNames} />
      <DatePickerBody
        {...resetProps}
        onSelected={val => {
          onSelected(val, !showTime);
        }}
        defaultPanelDate={panelDate}
      />
    </>
  );
  const onClickYear = React.useCallback(
    val => {
      setPanelDate(setYear(panelDate, val.getFullYear()));
      setShowYear(false);
    },
    [panelDate]
  );
  // 切换到年份面板
  const YearPanelNode = (
    <YearPanel
      {...props}
      onSelected={onClickYear}
      defaultPanelDate={panelDate}
    />
  );

  const onClickMonth = React.useCallback(
    val => {
      setPanelDate(setMonth(panelDate, val.getMonth()));
      setShowMonth(false);
    },
    [panelDate]
  );
  // 切换到月份面板
  const MonthPanelNode = (
    <MonthPanel
      {...props}
      defaultPanelDate={panelDate}
      onSelected={onClickMonth}
    />
  );

  return (
    <>
      {!showYear && !showMonth && DatePanel}
      {showYear && YearPanelNode}
      {showMonth && MonthPanelNode}
      {!hideFooter && <DatePickerFooter {...props} />}
    </>
  );
};
export default DatePickerPanel;
