import * as React from 'react';
import cx from 'classnames';
import { parse } from 'date-fns';

import Button from '../../../button';
import TimePicker from '../../TimePicker';
import PanelFooter from '../../components/PanelFooter';

import PickerContext from '../../context/PickerContext';
import { formatDate } from '../../utils/index';
import { useShowTimeOption } from '../../hooks/useShowTimeOption';

import { IDatePickerPanelProps } from './index';

interface IDatePickerFooterProps
  extends Omit<IDatePickerPanelProps, 'popText' | 'hideFooter'> {}
const DatePickerFooter: React.FC<IDatePickerFooterProps> = ({
  footerText,
  showTime,
  onSelected,
  selected,
  disabledPanelDate,
  disabledTimes,
}) => {
  const { i18n } = React.useContext(PickerContext);
  const { format } = useShowTimeOption<string>(showTime);

  const onClickCurrent = React.useCallback(
    ({ isdisabledToday, today }) => {
      if (isdisabledToday) return;
      onSelected(today);
    },
    [onSelected]
  );

  const renderToday = React.useMemo(() => {
    const today = new Date();
    const isdisabledToday = disabledPanelDate?.(today);
    return (
      <div>
        <a
          className={cx({
            'zent-datepicker-panel-footer_diabled-current': isdisabledToday,
          })}
          onClick={() => onClickCurrent({ isdisabledToday, today })}
        >
          {footerText}
        </a>
        {!!showTime && (
          <Button
            type="primary"
            onClick={() => onSelected(selected)}
            className="zent-datepicker-panel-footer-btn"
          >
            {i18n.confirm}
          </Button>
        )}
      </div>
    );
  }, [
    selected,
    i18n,
    showTime,
    footerText,
    onClickCurrent,
    onSelected,
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
          format={format}
          width={94}
          selectedDate={selected}
          value={formatDate(selected, format)}
          hiddenIcon={true}
          onChange={onTimeChange}
          disabledTimes={disabledTimes}
        />
      ) : null,
    [selected, showTime, format, disabledTimes, onTimeChange]
  );

  return <PanelFooter leftNode={timeInput} rightNode={renderToday} />;
};
export default DatePickerFooter;
