import { useCallback } from 'react';
import TimePanel from '../time-panel/index';
import CombinedTimeFooter from './CombinedTimeFooter';
import { ICombinedTimePanelProps } from '../../types';

const prefixCls = 'zent-datepicker-combined-panel';

const CombinedTimeRangePanel: React.FC<ICombinedTimePanelProps> = ({
  onSelected,
  selected,
  disabledTimeOptionStart,
  disabledTimeOptionEnd,
  defaultTime,
  ...restProps
}) => {
  const [start, end] = selected;

  const onChangeStartOrEnd = useCallback(
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
            disabledTimeOption={disabledTimeOptionStart}
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
            disabledTimeOption={disabledTimeOptionEnd}
            onSelected={onChangeStartOrEnd(1)}
          />
        </div>
      </div>
      <CombinedTimeFooter selected={selected} onSelected={onSelected} />
    </>
  );
};
export default CombinedTimeRangePanel;
