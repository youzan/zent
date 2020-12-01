import { useCallback, useContext, useMemo, useState } from 'react';
import { setYear, setMonth, addMonths, addYears } from 'date-fns';
import PanelHeader, { Title } from '../../components/PanelHeader';
import PanelSubHeader from './PanelSubHeader';
import DatePickerBody from './DateBody';
import DatePickerFooter from './DateFooter';
import MonthPanel from '../month-panel';
import YearPanel from '../year-panel';

import PickerContext from '../../context/PickerContext';
import { useShowTimeOption } from '../../hooks/useShowTimeOption';
import usePanelDate from '../../hooks/usePanelDate';
import { ISinglePanelProps, IDisabledTime, IShowTime } from '../../types';

export interface IDatePickerPanelProps extends ISinglePanelProps {
  disableRangeOverView?: boolean;
  popText?: string;
  hideFooter?: boolean;
  showTime?: IShowTime;
  disabledTime?: IDisabledTime;
  footerText?: string;
}
const DatePickerPanel: React.FC<IDatePickerPanelProps> = props => {
  const {
    defaultPanelDate,
    hideFooter = false,
    onSelected,
    showTime,
    footerText = '',
    ...resetBodyProps
  } = props;
  const { i18n } = useContext(PickerContext);

  const [showYear, setShowYear] = useState<boolean>(false);
  const [showMonth, setShowMonth] = useState<boolean>(false);
  const { panelDate, setPanelDate } = usePanelDate(defaultPanelDate);
  const showTimeOption = useShowTimeOption(showTime);

  const titleNode = useMemo(
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
        {...resetBodyProps}
        showTime={showTime}
        showTimeOption={showTimeOption}
        onSelected={val => {
          onSelected(val, !showTime);
        }}
        defaultPanelDate={panelDate}
      />
    </>
  );
  const onClickYear = useCallback(
    val => {
      setPanelDate(setYear(panelDate, val.getFullYear()));
      setShowYear(false);
    },
    [panelDate, setPanelDate]
  );
  // 切换到年份面板
  const YearPanelNode = (
    <YearPanel
      {...props}
      onSelected={onClickYear}
      defaultPanelDate={panelDate}
    />
  );

  const onClickMonth = useCallback(
    val => {
      setPanelDate(setMonth(panelDate, val.getMonth()));
      setShowMonth(false);
    },
    [panelDate, setPanelDate]
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
      {!hideFooter && (
        <DatePickerFooter
          {...props}
          showTimeOption={showTimeOption}
          footerText={
            footerText || (showTime ? i18n.current.time : i18n.current.date)
          }
        />
      )}
    </>
  );
};
export default DatePickerPanel;
