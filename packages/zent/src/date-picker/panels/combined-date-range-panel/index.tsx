import * as React from 'react';
import cx from 'classnames';
import { parse } from 'date-fns';
import DatePanel from '../date-panel/index';
import RangePickerFooter from './RangeFooter';

import { useShowTimeRangeOption } from '../../hooks/useShowTimeOption';
import useRangeDisabledTimes from '../../hooks/useRangeDisabledTimes';

import { IRangePanelProps, IDisabledTimes, IShowTime } from '../../types';

const prefixCls = 'zent-datepicker-combined-panel';

interface ICombinedDateRangePanelProps extends IRangePanelProps {
  disabledTimes?: IDisabledTimes;
  showTime?: IShowTime<string[]>;
}
const CombinedDateRangePanel: React.FC<ICombinedDateRangePanelProps> = ({
  onSelected,
  selected,
  disabledStartDate,
  disabledEndDate,
  defaultPanelDate,
  showTime,
  disabledTimes,
  ...restProps
}) => {
  const [start, end] = selected;
  const [startShowTime, endShowTime] = useShowTimeRangeOption<string[]>(
    showTime
  );
  const {
    disabledStartTimes,
    disabledConfirm,
    disabledEndTimes,
  } = useRangeDisabledTimes({
    selected,
    disabledTimes,
  });
  const onChangeStartOrEnd = React.useCallback(
    (val: Date) => {
      let selectedTemp;
      if (start && !end) {
        const { defaultTime, format } = endShowTime || {};
        selectedTemp = [
          start,
          !!showTime ? parse(defaultTime, format, val) : val,
        ];
        onSelected(selectedTemp, !showTime);
      }
      // 选中开始时间是清除上一次的结束时间
      else {
        const { defaultTime, format } = startShowTime || {};
        selectedTemp = [
          !!showTime ? parse(defaultTime, format, val) : val,
          null,
        ];
        onSelected(selectedTemp);
      }
    },
    [start, end, showTime, startShowTime, endShowTime, onSelected]
  );

  const disabledFooterStartTimes = React.useCallback(disabledStartTimes, [
    disabledStartTimes,
  ]);
  const disabledFooterEndTimes = React.useCallback(disabledEndTimes, [
    disabledEndTimes,
  ]);

  const FooterNode = React.useMemo(
    () => (
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
    ),
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
            selected={start}
            disabledTimes={disabledStartTimes}
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
            selected={end}
            disabledTimes={disabledEndTimes}
            defaultPanelDate={defaultPanelDate[1]}
            onSelected={onChangeStartOrEnd}
            disabledPanelDate={disabledEndDate}
          />
        </div>
      </div>
      {!!showTime && FooterNode}
    </>
  );
};
export default CombinedDateRangePanel;
