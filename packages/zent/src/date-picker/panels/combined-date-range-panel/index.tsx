import { useCallback, useMemo } from 'react';
import cx from 'classnames';
import { parse } from 'date-fns';

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

interface ICombinedDateRangePanelProps extends IRangePanelProps {
  disabledTime?: IDisabledTime;
  showTime?: IShowTimeRange<string>;
}
const CombinedDateRangePanel: React.FC<ICombinedDateRangePanelProps> = ({
  onSelected,
  selected,
  disabledStartDate,
  disabledEndDate,
  defaultPanelDate,
  showTime,
  disabledTime,
  ...restProps
}) => {
  const [start, end] = selected;
  const [startShowTime, endShowTime] = useShowTimeRangeOption(showTime);
  const {
    disabledStartTimes,
    disabledConfirm,
    disabledEndTimes,
  } = useRangeDisabledTime({
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
          startShowTime
            ? parse(defaultStartTime(start), formatStart, start)
            : start,
          endShowTime ? parse(defaultEndTime(val), formatEnd, val) : val,
        ];
        onSelected(selectedTemp, !showTime);
      }
      // 选中开始时间是清除上一次的结束时间
      else {
        selectedTemp = [
          startShowTime ? parse(defaultStartTime(val), formatStart, val) : val,
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

  const FooterNode = useMemo(
    () =>
      startShowTime ? (
        <div className={`${prefixCls}-footer`}>
          <RangePickerFooter
            format={startShowTime?.format}
            selected={selected}
            onSelected={onSelected}
            disabledStartTimes={disabledFooterStartTimes}
            disabledConfirm={disabledConfirm}
            disabledEndTimes={disabledFooterEndTimes}
          />
        </div>
      ) : null,
    [
      selected,
      disabledConfirm,
      startShowTime,
      onSelected,
      disabledFooterStartTimes,
      disabledFooterEndTimes,
    ]
  );

  return (
    <>
      <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-body-item`}>
          <DatePanel
            {...restProps}
            hideFooter
            disableRangeOverView
            selected={start}
            disabledTime={disabledStartTimes}
            popText={start && !end ? '请选择结束日期' : ''}
            defaultPanelDate={defaultPanelDate[0]}
            onSelected={onChangeStartOrEnd}
            disabledPanelDate={disabledStartDate}
          />
        </div>
        <div
          className={cx(
            `${prefixCls}-body-item`,
            `${prefixCls}-body-item_left12`
          )}
        >
          <DatePanel
            {...restProps}
            hideFooter
            disableRangeOverView
            selected={end}
            disabledTime={disabledEndTimes}
            defaultPanelDate={defaultPanelDate[1]}
            onSelected={onChangeStartOrEnd}
            disabledPanelDate={disabledEndDate}
          />
        </div>
      </div>
      {FooterNode}
    </>
  );
};
export default CombinedDateRangePanel;
