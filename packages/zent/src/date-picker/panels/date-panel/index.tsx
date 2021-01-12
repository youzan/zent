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
import { useEventCallbackRef } from '../../../utils/hooks/useEventCallbackRef';

export interface IDatePickerPanelProps extends ISinglePanelProps {
  disableRangeOverView?: boolean;
  popText?: string;
  hideFooter?: boolean;
  showTime?: IShowTime;
  disabledTime?: IDisabledTime;
  footerText?: string;
  combinedLeft?: boolean;
  combinedRight?: boolean;
  onPanelDateChange?: (val: Date) => void;
}
const DatePickerPanel: React.FC<IDatePickerPanelProps> = props => {
  const {
    defaultPanelDate,
    hideFooter = false,
    onSelected,
    showTime,
    footerText = '',
    combinedLeft,
    combinedRight,
    onPanelDateChange,
    ...resetBodyProps
  } = props;
  const { i18n } = useContext(PickerContext);

  const [showYear, setShowYear] = useState<boolean>(false);
  const [showMonth, setShowMonth] = useState<boolean>(false);
  const { panelDate, setPanelDate } = usePanelDate(defaultPanelDate);
  const showTimeOption = useShowTimeOption(showTime);
  const onPanelDateChangeRef = useEventCallbackRef(onPanelDateChange);

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

  const onPrev = useCallback(() => {
    const currentDate = addMonths(panelDate, -1);
    setPanelDate(currentDate);
    onPanelDateChangeRef.current?.(currentDate);
  }, [panelDate, setPanelDate, onPanelDateChangeRef]);

  const onNext = useCallback(() => {
    const currentDate = addMonths(panelDate, 1);
    setPanelDate(currentDate);
    onPanelDateChangeRef.current?.(currentDate);
  }, [panelDate, setPanelDate, onPanelDateChangeRef]);

  const onSuperPrev = useCallback(() => {
    const currentDate = addYears(panelDate, -1);
    setPanelDate(currentDate);
    onPanelDateChangeRef.current?.(currentDate);
  }, [panelDate, setPanelDate, onPanelDateChangeRef]);

  const onSuperNext = useCallback(() => {
    const currentDate = addYears(panelDate, 1);
    setPanelDate(currentDate);
    onPanelDateChangeRef.current?.(currentDate);
  }, [panelDate, setPanelDate, onPanelDateChangeRef]);

  const DatePanel = (
    <>
      <PanelHeader
        showSuper={true}
        titleNode={titleNode}
        combinedLeft={combinedLeft}
        combinedRight={combinedRight}
        onPrev={onPrev}
        onNext={onNext}
        onSuperPrev={onSuperPrev}
        onSuperNext={onSuperNext}
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
      const currentDate = setYear(panelDate, val.getFullYear());
      setPanelDate(currentDate);
      onPanelDateChangeRef.current?.(currentDate);
      setShowYear(false);
    },
    [panelDate, onPanelDateChangeRef, setPanelDate]
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
      const currentDate = setMonth(panelDate, val.getMonth());
      setPanelDate(currentDate);
      onPanelDateChangeRef.current?.(currentDate);
      setShowMonth(false);
    },
    [panelDate, onPanelDateChangeRef, setPanelDate]
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
