import * as React from 'react';
import cx from 'classnames';
import { parse } from 'date-fns';
import TimePicker from '../../TimePicker';
import Button from '../../../button';
import Pop from '../../../pop';

import PickerContext from '../../context/PickerContext';
import { formatDate } from '../../utils/index';
import useConfirmStatus from '../../hooks/useConfirmStatus';
import { IDisabledTimes, IRangePanelProps } from '../../types';
import { DATE_FORMAT } from '../../constants';

const prefixCls = 'zent-datepicker-combined-panel-footer';

interface ICombinedDateRangeFooterProps
  extends Pick<IRangePanelProps, 'selected' | 'onSelected'> {
  format: string;
  disabledStartTimes: IDisabledTimes;
  disabledEndTimes: IDisabledTimes;
  disabledConfirm: boolean;
}

export const CombinedDateRangeFooter: React.FC<ICombinedDateRangeFooterProps> = ({
  selected,
  disabledStartTimes,
  disabledConfirm,
  disabledEndTimes,
  onSelected,
  format,
}) => {
  const { i18n } = React.useContext(PickerContext);
  const [start, end] = selected;

  const startTimeStatus = useConfirmStatus({
    selected: formatDate(start, format),
    disabledTimesOption: disabledEndTimes?.(start) || {},
    format,
  });
  const endTimeStatus = useConfirmStatus({
    selected: formatDate(end, format),
    disabledTimesOption: disabledStartTimes?.(end) || {},
    format,
  });

  const disabledStatus = React.useMemo(
    () => disabledConfirm || endTimeStatus || startTimeStatus,
    [disabledConfirm, endTimeStatus, startTimeStatus]
  );
  const onStartTimeChange = React.useCallback(
    (val: string) => {
      const timeVal = parse(val, format, selected[0]);
      onSelected([timeVal, selected[1]], false);
    },
    [selected, format, onSelected]
  );
  const onEndTimeChange = React.useCallback(
    (val: string) => {
      const timeVal = parse(val, format, selected[1]);
      onSelected([selected[0], timeVal], false);
    },
    [selected, format, onSelected]
  );

  const confirmHandler = React.useCallback(() => {
    onSelected(selected, true);
  }, [selected, onSelected]);

  const confirmBtn = React.useMemo(
    () => (
      <Button
        type="primary"
        onClick={confirmHandler}
        disabled={disabledStatus}
        className={`${prefixCls}-confirm`}
      >
        {i18n.confirm}
      </Button>
    ),
    [i18n, disabledStatus, confirmHandler]
  );
  return (
    <>
      <div
        className={cx(`${prefixCls}-item`, { [`${prefixCls}-null`]: !start })}
      >
        {start ? formatDate(start, DATE_FORMAT) : i18n.start}
      </div>
      <TimePicker
        width={94}
        className={`${prefixCls}-item`}
        disabled={!start}
        value={start ? formatDate(start, format) : ''}
        hiddenIcon={true}
        format={format}
        onChange={onStartTimeChange}
        selectedDate={start}
        disabledTimes={disabledStartTimes}
      />
      <div className={`${prefixCls}-seperator`}>{i18n.to}</div>
      <div className={cx(`${prefixCls}-item`, { [`${prefixCls}-null`]: !end })}>
        {end ? formatDate(end, DATE_FORMAT) : i18n.end}
      </div>
      <TimePicker
        width={94}
        disabled={!end}
        className={`${prefixCls}-item`}
        value={end ? formatDate(end, format) : ''}
        hiddenIcon={true}
        format={format}
        onChange={onEndTimeChange}
        selectedDate={end}
        disabledTimes={disabledEndTimes}
      />
      {disabledStatus ? (
        <Pop content={i18n.rangePop} trigger={'hover'}>
          {confirmBtn}
        </Pop>
      ) : (
        confirmBtn
      )}
    </>
  );
};
export default CombinedDateRangeFooter;
