import * as React from 'react';
import cx from 'classnames';
import Button from '../../../button';

import PanelFooter from '../../components/PanelFooter';
import PickerContext from '../../context/PickerContext';

import TimePicker from '../../TimePicker';
import { parse } from 'date-fns';
import { formatDate } from '../../utils/index';
import { IDatePickerPanelProps } from './index';

interface IDatePickerFooterProps
  extends Omit<IDatePickerPanelProps, 'popText' | 'hideFooter'> {}
const DatePickerFooter: React.FC<IDatePickerFooterProps> = ({
  showTime,
  onSelected,
  selected,
  disabledPanelDate,
  disabledTimes,
}) => {
  const { i18n } = React.useContext(PickerContext);

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
          {showTime ? i18n.current.time : i18n.current.date}
        </a>
        {showTime && (
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
  }, [selected, i18n, showTime, onClickCurrent, onSelected, disabledPanelDate]);

  const onTimeChange = React.useCallback(
    val => {
      const timeVal = parse(val, 'HH:mm:ss', selected || new Date());
      onSelected(timeVal, false);
    },
    [selected, onSelected]
  );

  const timeInput = React.useMemo(
    () =>
      showTime ? (
        <TimePicker
          width={94}
          value={formatDate(selected, 'HH:mm:ss')}
          hiddenIcon={true}
          onChange={onTimeChange}
          disabledTimes={disabledTimes}
        />
      ) : null,
    [selected, showTime, disabledTimes, onTimeChange]
  );

  return <PanelFooter leftNode={timeInput} rightNode={renderToday} />;
};
export default DatePickerFooter;
