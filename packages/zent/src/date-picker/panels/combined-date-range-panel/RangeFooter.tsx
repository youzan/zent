import * as React from 'react';
import cx from 'classnames';
import { parse } from 'date-fns';
import PickerContext from '../../context/PickerContext';
import TimePicker from '../../TimePicker';
import Button from '../../../button';

import { formatDate } from '../../utils/index';
import { ICombinedDateRangePanelProps } from './index';

const prefixCls = 'zent-datepicker-combined-panel-footer';

interface ICombinedDateRangeFooterProps
  extends Omit<
    ICombinedDateRangePanelProps,
    'defaultPanelDate' | 'disabledPanelDate'
  > {}
export const CombinedDateRangeFooter: React.FC<ICombinedDateRangeFooterProps> = ({
  selected,
  disabledTimes,
  onSelected,
}) => {
  const { i18n } = React.useContext(PickerContext);
  const [start, end] = selected;

  const onStartTimeChange = React.useCallback(
    (val: string) => {
      const timeVal = parse(val, 'HH:mm:ss', selected[0]);
      onSelected([timeVal, selected[1]], false);
    },
    [selected, onSelected]
  );
  const onEndTimeChange = React.useCallback(
    (val: string) => {
      // todo showSecond ? 'HH:mm:ss' : 'HH:mm'
      const timeVal = parse(val, 'HH:mm:ss', selected[1]);
      onSelected([selected[0], timeVal], false);
    },
    [selected, onSelected]
  );

  return (
    <>
      <div
        className={cx(`${prefixCls}-item`, { [`${prefixCls}-null`]: !start })}
      >
        {start ? formatDate(start, 'YYYY-MM-DD') : i18n.start}
      </div>
      <TimePicker
        width={94}
        className={`${prefixCls}-item`}
        disabled={!start}
        value={start ? formatDate(start, 'HH:mm:ss') : ''}
        hiddenIcon={true}
        onChange={onStartTimeChange}
        disabledTimes={disabledTimes}
      />
      <div className={`${prefixCls}-seperator`}>{i18n.to}</div>
      <div className={cx(`${prefixCls}-item`, { [`${prefixCls}-null`]: !end })}>
        {end ? formatDate(end, 'YYYY-MM-DD') : i18n.end}
      </div>
      <TimePicker
        width={94}
        disabled={!end}
        className={`${prefixCls}-item`}
        value={end ? formatDate(end, 'HH:mm:ss') : ''}
        hiddenIcon={true}
        onChange={onEndTimeChange}
        disabledTimes={disabledTimes}
      />
      <Button
        type="primary"
        onClick={() => onSelected(selected, true)}
        className={`${prefixCls}-confirm`}
      >
        {i18n.confirm}
      </Button>
    </>
  );
};
export default CombinedDateRangeFooter;
