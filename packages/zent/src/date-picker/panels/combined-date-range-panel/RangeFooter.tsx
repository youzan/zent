import { useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';
import { parse, isSameDay } from 'date-fns';

import TimePicker from '../../TimePicker';
import Button from '../../../button';
import Pop from '../../../pop';
import PickerContext from '../../context/PickerContext';
import { formatDate } from '../../utils/index';
import useConfirmStatus from '../../hooks/useConfirmStatus';
import { IDisabledTime, IRangePanelProps } from '../../types';
import { DATE_FORMAT } from '../../constants';

const prefixCls = 'zent-datepicker-combined-panel-footer';

interface ICombinedDateRangeFooterProps
  extends Pick<IRangePanelProps, 'selected' | 'onSelected'> {
  format: string;
  disabledStartTimes: IDisabledTime;
  disabledEndTimes: IDisabledTime;
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
  const { i18n, autoComplete } = useContext(PickerContext);
  const [start, end] = selected;

  const startTimeStatus = useConfirmStatus({
    selected: formatDate(format, start),
    disabledTimeOption: (start && disabledStartTimes?.(start)) || {},
    format,
  });
  const endTimeStatus = useConfirmStatus({
    selected: formatDate(format, end),
    disabledTimeOption: (end && disabledEndTimes?.(end)) || {},
    format,
  });

  const disabledStatus = useMemo(
    () => disabledConfirm || endTimeStatus || startTimeStatus,
    [disabledConfirm, endTimeStatus, startTimeStatus]
  );
  const onStartTimeChange = useCallback(
    (val: string) => {
      const timeVal = selected[0] && parse(val, format, selected[0]);
      onSelected([timeVal, selected[1]]);
    },
    [selected, format, onSelected]
  );
  const onEndTimeChange = useCallback(
    (val: string) => {
      const timeVal = selected[1] && parse(val, format, selected[1]);
      onSelected([selected[0], timeVal]);
    },
    [selected, format, onSelected]
  );

  const confirmHandler = useCallback(() => {
    onSelected(selected, true);
  }, [selected, onSelected]);

  const confirmBtn = useMemo(
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
        {start ? formatDate(DATE_FORMAT, start) : i18n.start}
      </div>
      <TimePicker
        width={94}
        className={`${prefixCls}-item`}
        disabled={!start}
        value={formatDate(format, start)}
        hiddenIcon={true}
        format={format}
        onChange={onStartTimeChange}
        selectedDate={start}
        disabledTime={disabledStartTimes}
        autoComplete={autoComplete}
      />
      <div className={`${prefixCls}-seperator`}>{i18n.to}</div>
      <div className={cx(`${prefixCls}-item`, { [`${prefixCls}-null`]: !end })}>
        {end ? formatDate(DATE_FORMAT, end) : i18n.end}
      </div>
      <TimePicker
        width={94}
        disabled={!end}
        className={`${prefixCls}-item`}
        value={formatDate(format, end)}
        hiddenIcon={true}
        format={format}
        onChange={onEndTimeChange}
        selectedDate={end}
        disabledTime={disabledEndTimes}
        autoComplete={autoComplete}
      />
      {disabledStatus ? (
        <Pop
          content={
            start && end && isSameDay(start, end)
              ? i18n.timeErrorPop
              : i18n.dateErrorPop
          }
          trigger="hover"
        >
          {confirmBtn}
        </Pop>
      ) : (
        confirmBtn
      )}
    </>
  );
};
export default CombinedDateRangeFooter;
