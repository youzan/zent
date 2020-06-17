import * as React from 'react';
import DatePanel from '../date-panel/index';
import RangePickerFooter from './RangeFooter';
import { ICombinedDatePanelProps, IDisabledTimes } from '../../types';

const prefixCls = 'zent-date-picker-combined-panel';
export interface ICombinedDateRangePanelProps extends ICombinedDatePanelProps {
  showTime?: boolean;
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

  const changeStartOrEnd = (val: Date) => {
    const nullIndex = selected.indexOf(null);
    if (nullIndex === -1) {
      selected = [val, null];
    } else {
      selected[nullIndex] = val;
    }
    onSelected(selected, !showTime);
  };

  const FooterNode = React.useMemo(
    () => (
      <div className={`${prefixCls}-footer`}>
        <RangePickerFooter
          selected={selected}
          disabledTimes={disabledTimes}
          onSelected={onSelected}
        />
      </div>
    ),
    [selected, onSelected, disabledTimes]
  );

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-body-item`}>
          <DatePanel
            {...resetProps}
            hideFooter
            selected={start}
            popText={start && !end ? '请选择结束日期' : ''}
            defaultPanelDate={defaultPanelDate[0]}
            onSelected={changeStartOrEnd}
            disabledPanelDate={disabledPanelDate[0]}
          />
        </div>
        <div className={`${prefixCls}-body-item`}>
          <DatePanel
            {...resetProps}
            hideFooter
            selected={end}
            defaultPanelDate={defaultPanelDate[1]}
            onSelected={changeStartOrEnd}
            disabledPanelDate={disabledPanelDate[1]}
          />
        </div>
      </div>
      {showTime && FooterNode}
    </div>
  );
};
export default CombinedDateRangePanel;
