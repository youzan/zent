import * as React from 'react';
import cx from 'classnames';
import { setHours, setMinutes, setSeconds } from 'date-fns';
import I18nLocaleContext from '../../context/I18nLocaleContext';
import TimePicker from '../../TimePicker';
import Button from '../../../button';

import { parseDate, formatDate } from '../../utils/index';
import { ICombinedDateRangePanelProps } from './index';

const prefixCls = 'zent-date-picker-combined-panel-footer';
const setTimes = [setHours, setMinutes, setSeconds];

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
  const { i18n } = React.useContext(I18nLocaleContext);
  const [start, end] = selected;

  const onStartTimeChange = React.useCallback(
    (val: string) => {
      let timeVal = parseDate(selected[0], '');

      val.split(':').map((item, index) => {
        timeVal = setTimes[index](timeVal, +item);
      });
      onSelected([timeVal, selected[1]], false);
    },
    [selected, onSelected]
  );
  const onEndTimeChange = React.useCallback(
    (val: string) => {
      let timeVal = parseDate(selected[1], '');

      val.split(':').map((item, index) => {
        timeVal = setTimes[index](timeVal, +item);
      });
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
        autoOnChange={true}
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
        autoOnChange={true}
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
