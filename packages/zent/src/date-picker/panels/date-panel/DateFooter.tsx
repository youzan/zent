import { useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';
import { parse } from 'date-fns';
import Pop from '../../../pop';
import Button from '../../../button';
import TimePicker from '../../TimePicker';
import PanelFooter from '../../components/PanelFooter';

import PickerContext from '../../context/PickerContext';
import { formatDate } from '../../utils/index';
import { IDatePickerPanelProps } from './index';
import { IShowTimeOptionWithDefault } from '../../types';
import useConfirmStatus from '../../hooks/useConfirmStatus';

const footerPrefixCls = 'zent-datepicker-panel-footer';
interface IDatePickerFooterProps
  extends Omit<IDatePickerPanelProps, 'popText' | 'hideFooter'> {
  showTimeOption?: IShowTimeOptionWithDefault;
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
  const { i18n, autoComplete } = useContext(PickerContext);
  const { format = '' } = showTimeOption || {};
  const confirmStatus = useConfirmStatus({
    selected: formatDate(format, selected),
    disabledTimeOption: (selected && disabledTime?.(selected)) || {},
    format,
  });
  const isDisableConfirm = useMemo(
    () => selected && disabledPanelDate(selected),
    [selected, disabledPanelDate]
  );
  const isDisabledToday = useMemo(() => disabledPanelDate(today), [
    disabledPanelDate,
  ]);
  const onClickCurrent = useCallback(() => {
    if (isDisabledToday) return;
    onSelected(today);
  }, [isDisabledToday, onSelected]);

  const confirmHandler = useCallback(() => {
    selected && onSelected(selected);
  }, [selected, onSelected]);

  const confirmBtn = useMemo(
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

  const renderToday = useMemo(() => {
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

  const onTimeChange = useCallback(
    val => {
      if (!val) return;
      const timeVal = parse(val, format, selected || new Date());
      onSelected(timeVal, false);
    },
    [selected, format, onSelected]
  );

  const timeInput = useMemo(() => {
    const { defaultTime, ...restOption } = showTimeOption || {};
    const defaultTimeString =
      typeof defaultTime === 'function' ? defaultTime(selected) : defaultTime;

    return showTime ? (
      <TimePicker
        {...restOption}
        defaultTime={defaultTimeString}
        width={94}
        selectedDate={selected}
        value={formatDate(format, selected)}
        hiddenIcon={true}
        onChange={onTimeChange}
        disabledTime={disabledTime}
        autoComplete={autoComplete}
      />
    ) : null;
  }, [
    autoComplete,
    selected,
    showTime,
    showTimeOption,
    format,
    disabledTime,
    onTimeChange,
  ]);

  return <PanelFooter leftNode={timeInput} rightNode={renderToday} />;
};
export default DatePickerFooter;
