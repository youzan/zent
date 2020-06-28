import * as React from 'react';
import { parse } from 'date-fns';
import DatePanel from '../date-panel/index';
import RangePickerFooter from './RangeFooter';
import { ICombinedDatePanelProps, IDisabledTimes } from '../../types';
import { useShowTimeRange } from '../../hooks/useShowTimeOption';

const prefixCls = 'zent-datepicker-combined-panel';
export interface ICombinedDateRangePanelProps extends ICombinedDatePanelProps {
  disabledTimes?: IDisabledTimes;
}
const CombinedDateRangePanel: React.FC<ICombinedDateRangePanelProps> = ({
  onSelected,
  selected,
  disabledPanelDate,
  defaultPanelDate,
  showTime,
  disabledTimes,
  ...resetProps
}) => {
  const [start, end] = selected;

  // true为选择结束日期 false为选择开始日期
  const [status, setStatus] = React.useState(start && !end);

  const [startShowTime, endShowTime] = useShowTimeRange<string[]>(showTime);

  const onChangeStartOrEnd = React.useCallback(
    (val: Date) => {
      let selectedTemp;
      if (!status) {
        const { defaultTime, format } = startShowTime;
        selectedTemp = [
          defaultTime && format ? parse(defaultTime, format, val) : val,
          null,
        ];
        setStatus(true);
      } else {
        const { defaultTime, format } = endShowTime;
        selectedTemp = [
          selected[0],
          defaultTime && format ? parse(defaultTime, format, val) : val,
        ];
        setStatus(false);
      }
      onSelected(selectedTemp, !showTime);
    },
    [selected, showTime, status, startShowTime, endShowTime, onSelected]
  );

  const FooterNode = React.useMemo(
    () => (
      <div className={`${prefixCls}-footer`}>
        <RangePickerFooter
          format={startShowTime?.format}
          selected={selected}
          disabledTimes={disabledTimes}
          onSelected={onSelected}
        />
      </div>
    ),
    [selected, onSelected, disabledTimes, startShowTime]
  );

  return (
    <>
      <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-body-item`}>
          <DatePanel
            {...resetProps}
            hideFooter
            selected={start}
            popText={start && !end ? '请选择结束日期' : ''}
            defaultPanelDate={defaultPanelDate[0]}
            onSelected={onChangeStartOrEnd}
            disabledPanelDate={disabledPanelDate[0]}
          />
        </div>
        <div className={`${prefixCls}-body-item`}>
          <DatePanel
            {...resetProps}
            hideFooter
            selected={end}
            defaultPanelDate={defaultPanelDate[1]}
            onSelected={onChangeStartOrEnd}
            disabledPanelDate={disabledPanelDate[1]}
          />
        </div>
      </div>
      {!!showTime && FooterNode}
    </>
  );
};
export default CombinedDateRangePanel;
