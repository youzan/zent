import { useCallback, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import { parse, addMonths, endOfDay, startOfDay } from 'date-fns';

import DatePanel from '../date-panel/index';
import RangePickerFooter from './RangeFooter';
import { useShowTimeRangeOption } from '../../hooks/useShowTimeOption';
import useRangeDisabledTime from '../../hooks/useRangeDisabledTime';
import {
  IRangePanelProps,
  IDisabledTime,
  IShowTimeRange,
  DateNullTuple,
} from '../../types';

const prefixCls = 'zent-datepicker-combined-panel';

export interface ICombinedDateRangePanelProps extends IRangePanelProps {
  disabledTime?: IDisabledTime;
  showTime?: IShowTimeRange<string>;
  leftClassName?: string;
  rightClassName?: string;
  footerClassName?: string;
  hideConfirm?: boolean;
}
const CombinedDateRangePanel: React.FC<ICombinedDateRangePanelProps> = ({
  onSelected,
  selected,
  disabledStartDate,
  disabledEndDate,
  defaultPanelDate,
  showTime,
  disabledTime,
  rightClassName,
  leftClassName,
  footerClassName,
  hideConfirm = false,
  ...restProps
}) => {
  const [start, end] = selected;
  const [startShowTime, endShowTime] = useShowTimeRangeOption(showTime);
  const [startPanelDate, setStartPanelDate] = useState(defaultPanelDate[0]);

  // don't update startPanelDate when new value is selected, in case of DatePanel jumping to unexpected month
  useEffect(() => setStartPanelDate(defaultPanelDate[0]), []); // eslint-disable-line react-hooks/exhaustive-deps

  const { disabledStartTimes, disabledConfirm, disabledEndTimes } =
    useRangeDisabledTime({
      selected,
      disabledTime,
    });
  const onChangeStartOrEnd = useCallback(
    (val: Date) => {
      const { defaultTime: defaultTimeStart, format: formatStart } =
        startShowTime || {};
      const { defaultTime: defaultTimeEnd, format: formatEnd } =
        endShowTime || {};
      let selectedTemp: DateNullTuple;
      const defaultStartTime = (date: Date) =>
        typeof defaultTimeStart === 'function'
          ? defaultTimeStart(date)
          : defaultTimeStart;
      const defaultEndTime = (date: Date) =>
        typeof defaultTimeEnd === 'function'
          ? defaultTimeEnd(date)
          : defaultTimeEnd;
      if (start && !end) {
        selectedTemp = [
          startShowTime ? start : startOfDay(start),
          endShowTime
            ? parse(defaultEndTime(val), formatEnd, val)
            : endOfDay(val),
        ];
        onSelected(selectedTemp, !showTime);
      }
      // 选中开始时间是清除上一次的结束时间
      else {
        selectedTemp = [
          startShowTime
            ? parse(defaultStartTime(val), formatStart, val)
            : startOfDay(val),
          null,
        ];
        onSelected(selectedTemp);
      }
    },
    [start, end, showTime, startShowTime, endShowTime, onSelected]
  );

  const disabledFooterStartTimes = useCallback(disabledStartTimes, [
    disabledStartTimes,
  ]);
  const disabledFooterEndTimes = useCallback(disabledEndTimes, [
    disabledEndTimes,
  ]);

  const onStartPanelDateChange = useCallback((val: Date) => {
    setStartPanelDate(val);
  }, []);

  const onEndPanelDateChange = useCallback((val: Date) => {
    const start = addMonths(val, -1);
    setStartPanelDate(start);
  }, []);

  const FooterNode = useMemo(
    () =>
      startShowTime ? (
        <div className={cx(`${prefixCls}-footer`, footerClassName)}>
          <RangePickerFooter
            format={startShowTime?.format}
            selected={selected}
            onSelected={onSelected}
            disabledStartTimes={disabledFooterStartTimes}
            disabledConfirm={disabledConfirm}
            disabledEndTimes={disabledFooterEndTimes}
            hideConfirm={hideConfirm}
          />
        </div>
      ) : null,
    [
      startShowTime,
      footerClassName,
      selected,
      onSelected,
      disabledFooterStartTimes,
      disabledConfirm,
      disabledFooterEndTimes,
      hideConfirm,
    ]
  );

  return (
    <>
      <div className={`${prefixCls}-body`}>
        <div className={cx(`${prefixCls}-body-item`, leftClassName)}>
          <DatePanel
            {...restProps}
            combinedLeft
            hideFooter
            disableRangeOverView
            selected={start}
            disabledTime={disabledStartTimes}
            popText={start && !end ? '请选择结束日期' : ''}
            defaultPanelDate={startPanelDate}
            onSelected={onChangeStartOrEnd}
            disabledPanelDate={disabledStartDate}
            onPanelDateChange={onStartPanelDateChange}
          />
        </div>
        <div
          className={cx(
            `${prefixCls}-body-item`,
            `${prefixCls}-body-item_left12`,
            rightClassName
          )}
        >
          <DatePanel
            {...restProps}
            combinedRight
            hideFooter
            disableRangeOverView
            selected={end || start}
            disabledTime={disabledEndTimes}
            defaultPanelDate={addMonths(startPanelDate, 1)}
            onSelected={onChangeStartOrEnd}
            disabledPanelDate={disabledEndDate}
            onPanelDateChange={onEndPanelDateChange}
          />
        </div>
      </div>
      {FooterNode}
    </>
  );
};
export default CombinedDateRangePanel;
