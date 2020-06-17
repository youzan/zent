import * as React from 'react';
import cx from 'classnames';
import Button from '../../../button';

import PanelFooter from '../../components/PanelFooter';
import I18nLocaleContext from '../../context/I18nLocaleContext';

import TimePicker from '../../TimePicker';
import { setHours, setMinutes, setSeconds } from 'date-fns';
import { parseDate, formatDate } from '../../utils/index';
import { CommonDateMap } from '../../utils/dateUtils';
import { IDatePickerPanelProps } from './index';

const setTimes = [setHours, setMinutes, setSeconds];

interface IDatePickerFooterProps
  extends Omit<IDatePickerPanelProps, 'popText' | 'hideFooter'> {}
const DatePickerFooter: React.FC<IDatePickerFooterProps> = ({
  showTime,
  onSelected,
  selected,
  disabledPanelDate,
  disabledTimes,
}) => {
  const { i18n } = React.useContext(I18nLocaleContext);

  const renderToday = React.useMemo(
    () => {
      const today = CommonDateMap.getCurrent();
      const isdisabledToday = disabledPanelDate && disabledPanelDate(today);
      return (
        <div>
          <a
            className={cx({
              'zent-date-picker-panel-footer_diabled-current': isdisabledToday,
            })}
            onClick={() => {
              !isdisabledToday && onSelected(today);
            }}
          >
            {showTime ? i18n.current.time : i18n.current.date}
          </a>
          {showTime && (
            <Button
              type="primary"
              onClick={() => onSelected(selected)}
              className="zent-date-picker-panel-footer-btn"
            >
              {i18n.confirm}
            </Button>
          )}
        </div>
      );
    },
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    [selected]
  );

  const onTimeChange = React.useCallback(
    val => {
      let timeVal = parseDate(selected, '');

      val.split(':').map((item, index) => {
        timeVal = setTimes[index](timeVal, +item);
      });
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
          autoOnChange={true}
          disabledTimes={disabledTimes}
        />
      ) : null,
    [selected, showTime, disabledTimes, onTimeChange]
  );

  return <PanelFooter leftNode={timeInput} rightNode={renderToday} />;
};
export default DatePickerFooter;
