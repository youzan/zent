import { useCallback, useContext, useMemo, useState } from 'react';
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
  const [timePickerIsOpen, setTimePickerIsOpen] = useState<boolean>(false);
  const { i18n, autoComplete } = useContext(PickerContext);
  const { format = '' } = showTimeOption || {};
  const confirmStatus = useConfirmStatus({
    selected: formatDate(format, selected),
    disabledTimeOption: (selected && disabledTime?.(selected)) || {},
    format,
  });

  const isDisabledCurrent = useConfirmStatus({
    selected: formatDate(format, today),
    disabledTimeOption: disabledTime?.(today) || {},
    format,
  });
  const isDisableConfirm = useMemo(
    () => selected && disabledPanelDate(selected),
    [selected, disabledPanelDate]
  );
  const isDisabledToday = useMemo(
    () => disabledPanelDate(today),
    [disabledPanelDate]
  );
  const onClickCurrent = useCallback(() => {
    if (isDisabledCurrent || isDisabledToday) return;
    onSelected(new Date());
  }, [isDisabledToday, isDisabledCurrent, onSelected]);

  const confirmHandler = useCallback(() => {
    selected && onSelected(selected);
  }, [selected, onSelected]);

  const confirmBtn = useMemo(
    () => (
      <Button
        type="primary"
        disabled={
          confirmStatus || isDisableConfirm || !selected || timePickerIsOpen
        }
        onClick={confirmHandler}
        className={`${footerPrefixCls}-btn`}
      >
        {i18n.confirm}
      </Button>
    ),
    [
      i18n,
      confirmStatus,
      selected,
      isDisableConfirm,
      confirmHandler,
      timePickerIsOpen,
    ]
  );

  const renderToday = useMemo(() => {
    return (
      <div>
        <a
          className={cx({
            [`${footerPrefixCls}-current_disabled`]:
              isDisabledCurrent || isDisabledToday,
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
    isDisabledCurrent,
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
    const { defaultTime, onOpen, onClose, ...restOption } =
      showTimeOption || {};
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
        onOpen={() => {
          onOpen?.();
          setTimePickerIsOpen(true);
        }}
        onClose={() => {
          onClose?.();
          setTimePickerIsOpen(false);
        }}
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
