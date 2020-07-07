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
const DatePickerFooter: React.FC<IDatePickerFooterProps> = ({
  footerText,
  showTime,
  disabledTimes,
  showTimeOption,
  selected,
  onSelected,
  disabledPanelDate,
}) => {
  const { i18n } = React.useContext(PickerContext);
  const { format } = showTimeOption || {};
  const confirmStatus = useConfirmStatus({
    selected: formatDate(selected, format),
    disabledTimesOption: disabledTimes?.(selected) || {},
    format,
  });
  const onClickCurrent = React.useCallback(
    ({ isdisabledToday, today }) => {
      if (isdisabledToday) return;
      onSelected(today);
    },
    [onSelected]
  );

  const confirmHandler = React.useCallback(() => {
    onSelected(selected);
  }, [selected, onSelected]);

  const confirmBtn = React.useMemo(
    () => (
      <Button
        type="primary"
        disabled={confirmStatus || !selected}
        onClick={confirmHandler}
        className={`${footerPrefixCls}-btn`}
      >
        {i18n.confirm}
      </Button>
    ),
    [i18n, confirmStatus, selected, confirmHandler]
  );

  const renderToday = React.useMemo(() => {
    const today = new Date();
    const isdisabledToday = disabledPanelDate?.(today);
    return (
      <div>
        <a
          className={cx({
            [`${footerPrefixCls}-current_diabled`]: isdisabledToday,
          })}
          onClick={() => onClickCurrent({ isdisabledToday, today })}
        >
          {footerText}
        </a>
        {!!showTime &&
          (confirmStatus ? (
            <Pop content={i18n.rangePop} trigger={'hover'}>
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
    confirmBtn,
    onClickCurrent,
    disabledPanelDate,
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
          disabledTimes={disabledTimes}
        />
      ) : null,
    [selected, showTime, showTimeOption, format, disabledTimes, onTimeChange]
  );

  return <PanelFooter leftNode={timeInput} rightNode={renderToday} />;
};
export default DatePickerFooter;
