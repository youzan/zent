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

import { Lunar } from 'pure-lunar-typescript';

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

  const { showLunarDate } = resetBodyProps;

  const monthLabel = useMemo(() => {
    const solarMonth = panelDate.getMonth();

    const solarMonthLabel = i18n.panel.monthNames[solarMonth];
    if (!showLunarDate) {
      return solarMonthLabel;
    }

    const d = Lunar.fromDate(new Date(panelDate.getFullYear(), solarMonth));

    const lunar = d.getMonthInChinese();

    return `${solarMonthLabel}（${lunar}月）`;
  }, [showLunarDate, i18n.panel.monthNames, panelDate]);

  const titleNode = useMemo(
    () => (
      <>
        <Title
          text={panelDate.getFullYear()}
          unit={i18n.panel.year}
          onClick={() => setShowYear(true)}
        />
        <Title text={monthLabel} onClick={() => setShowMonth(true)} />
      </>
    ),
    [panelDate, i18n.panel.year, monthLabel]
  );

  const modifyPanelDate = useCallback(
    (currentDate: Date) => {
      setPanelDate(currentDate);
      onPanelDateChangeRef.current?.(currentDate);
    },
    [setPanelDate, onPanelDateChangeRef]
  );

  const onPrev = useCallback(() => {
    modifyPanelDate(addMonths(panelDate, -1));
  }, [panelDate, modifyPanelDate]);

  const onNext = useCallback(() => {
    modifyPanelDate(addMonths(panelDate, 1));
  }, [panelDate, modifyPanelDate]);

  const onSuperPrev = useCallback(() => {
    modifyPanelDate(addYears(panelDate, -1));
  }, [panelDate, modifyPanelDate]);

  const onSuperNext = useCallback(() => {
    modifyPanelDate(addYears(panelDate, 1));
  }, [panelDate, modifyPanelDate]);

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
      modifyPanelDate(setYear(panelDate, val.getFullYear()));
      setShowYear(false);
    },
    [panelDate, modifyPanelDate]
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
    (val: Date) => {
      const month = val.getMonth();
      const year = val.getFullYear();
      modifyPanelDate(setYear(setMonth(panelDate, month), year));
      setShowMonth(false);
    },
    [panelDate, modifyPanelDate]
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
