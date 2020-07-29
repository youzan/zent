import * as React from 'react';
import cx from 'classnames';
import { parse } from 'date-fns';
import Pop from '../../../pop';
import Button from '../../../button';
import TimePicker from '../../TimePicker';
import PanelFooter from '../../components/PanelFooter';

import PickerContext from '../../context/PickerContext';
import { formatDate } from '../../utils/index';
import { IDatePickerPanelProps } from './index';
import { IShowTimeOption } from '../../types';
import useConfirmStatus from '../../hooks/useConfirmStatus';
const footerPrefixCls = 'zent-datepicker-panel-footer';
interface IDatePickerFooterProps
  extends Omit<IDatePickerPanelProps, 'popText' | 'hideFooter'> {
  showTimeOption?: IShowTimeOption<string>;
}
const today = new Date();
const DatePickerFooter: React.FC<IDatePickerFooterProps> = ({
  footerText,
  showTime,
  disabledTime,
  showTimeOption,
  selected,
  onSelected,
  disabledPanelDate,
}) => {
  const { i18n } = React.useContext(PickerContext);
  const { format } = showTimeOption || {};
  const confirmStatus = useConfirmStatus({
    selected: formatDate(selected, format),
    disabledTimesOption: disabledTime?.(selected) || {},
    format,
  });
  const isDisableConfirm = React.useMemo(
    () => selected && disabledPanelDate?.(selected),
    [selected, disabledPanelDate]
  );
  const isDisabledToday = React.useMemo(() => disabledPanelDate?.(today), [
    disabledPanelDate,
  ]);
  const onClickCurrent = React.useCallback(() => {
    if (isDisabledToday) return;
    onSelected(today);
  }, [isDisabledToday, onSelected]);

  const confirmHandler = React.useCallback(() => {
    onSelected(selected);
  }, [selected, onSelected]);

  const confirmBtn = React.useMemo(
    () => (
      <Button
        type="primary"
        disabled={confirmStatus || isDisableConfirm || !selected}
        onClick={confirmHandler}
        className={`${footerPrefixCls}-btn`}
      >
        {i18n.confirm}
      </Button>
    ),
    [i18n, confirmStatus, selected, isDisableConfirm, confirmHandler]
  );

  const renderToday = React.useMemo(() => {
    return (
      <div>
        <a
          className={cx({
            [`${footerPrefixCls}-current_diabled`]: isDisabledToday,
          })}
          onClick={onClickCurrent}
        >
          {footerText}
        </a>
        {!!showTime &&
          (confirmStatus || isDisableConfirm ? (
            <Pop
              content={confirmStatus ? i18n.timeErrorPop : i18n.dateErrorPop}
              trigger="hover"
            >
              {confirmBtn}
            </Pop>
          ) : (
            confirmBtn
          ))}
      </div>
    );
  }, [
    i18n,
    showTime,
    footerText,
    confirmStatus,
    isDisableConfirm,
    isDisabledToday,
    confirmBtn,
    onClickCurrent,
  ]);

  const onTimeChange = React.useCallback(
    val => {
      const timeVal = parse(val, format, selected || new Date());
      onSelected(timeVal, false);
    },
    [selected, format, onSelected]
  );

  const timeInput = React.useMemo(
    () =>
      showTime ? (
        <TimePicker
          {...showTimeOption}
          width={94}
          selectedDate={selected}
          value={formatDate(selected, format)}
          hiddenIcon={true}
          onChange={onTimeChange}
          disabledTime={disabledTime}
        />
      ) : null,
    [selected, showTime, showTimeOption, format, disabledTime, onTimeChange]
  );

  return <PanelFooter leftNode={timeInput} rightNode={renderToday} />;
};
export default DatePickerFooter;
