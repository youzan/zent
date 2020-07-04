import * as React from 'react';
import TimePanel from '../time-panel/index';
import CombinedTimeFooter from './CombinedTimeFooter';
import { ICombinedTimePanelProps } from '../../types';

const prefixCls = 'zent-datepicker-combined-panel';

const CombinedTimeRangePanel: React.FC<ICombinedTimePanelProps> = ({
  onSelected,
  selected,
  disabledTimesOption,
  defaultTime,
  ...restProps
}) => {
  const [start, end] = selected;

  const onChangeStartOrEnd = React.useCallback(
    (index: number) => (val: string) => {
      onSelected(index ? [selected[0], val] : [val, selected[1]]);
    },
    [selected, onSelected]
  );

  return (
    <>
      <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-body-item`}>
          <TimePanel
            {...restProps}
            hideFooter
            selected={start}
            defaultTime={defaultTime?.[0]}
            disabledTimesOption={disabledTimesOption?.[0]}
            onSelected={onChangeStartOrEnd(0)}
          />
        </div>
        <div className={`${prefixCls}-body-seperator`}></div>
        <div className={`${prefixCls}-body-item`}>
          <TimePanel
            {...restProps}
            hideFooter
            selected={end}
            defaultTime={defaultTime?.[1]}
            disabledTimesOption={disabledTimesOption?.[1]}
            onSelected={onChangeStartOrEnd(1)}
          />
        </div>
      </div>
      <CombinedTimeFooter selected={selected} onSelected={onSelected} />
    </>
  );
};
export default CombinedTimeRangePanel;
