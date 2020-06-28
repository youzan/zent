import * as React from 'react';
import cx from 'classnames';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../../i18n';
import useRangeMergedProps from '../hooks/useRangeMergedProps';
import useRangeDisabledDate from '../hooks/useRangeDisabledDate';
import { useShowTimeRange } from '../hooks/useShowTimeOption';
import { getRangeValuesWithValueType } from '../utils/getValueInRangePicker';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';

import {
  IDatePickerCommonProps,
  IRangeTriggerProps,
  SingleDate,
  IGenerateDateConfig,
  IShowTime,
} from '../types';

interface IRangePickerProps
  extends IDatePickerCommonProps<[SingleDate, SingleDate]>,
    Pick<IRangeTriggerProps, 'placeholder'> {
  generateDateConfig: IGenerateDateConfig;
  PickerComponent: React.ComponentType<
    IDatePickerCommonProps & {
      placeholder: string;
      showTime?: IShowTime<string>;
    }
  >;
  showTime?: IShowTime<string[]>;
}

const RangePicker: React.FC<IRangePickerProps> = ({
  placeholder,
  value,
  onChange,
  disabledDate: disabledDateProps,
  className,
  defaultDate,
  valueType = 'string',
  generateDateConfig,
  PickerComponent,
  showTime,
  ...resetProps
}) => {
  const { format } = resetProps;
  const onChangeRef = useEventCallbackRef(onChange);
  const disabledDatePropsRef = useEventCallbackRef(disabledDateProps);
  // selected
  const {
    selected,
    setSelected,
    defaultPanelDate,
    disabledDate,
  } = useRangeMergedProps({
    value,
    format,
    disabledDatePropsRef,
    defaultDate,
  });

  // disabledDate array
  const [disabledStartDate, disabledEndDate] = useRangeDisabledDate({
    values: selected,
    disabledDate,
    generateDateConfig,
    pickerType: 'range',
  });

  const [startShowTime, endShowTime] = useShowTimeRange<string[]>(showTime);

  const onChangeStartOrEnd = React.useCallback(
    (val: [Date, Date]) => {
      setSelected(val);
      // props onChange
      onChangeRef?.current(getRangeValuesWithValueType(val, valueType, format));
    },
    [onChangeRef, valueType, format, setSelected]
  );

  return (
    <>
      <Receiver componentName="TimePicker">
        {(i18n: II18nLocaleTimePicker) => (
          <div className={cx('zent-datepicker', className)}>
            <PickerComponent
              {...resetProps}
              defaultDate={defaultPanelDate && defaultPanelDate[0]}
              showTime={startShowTime}
              valueType="date"
              value={selected[0]}
              onChange={val => onChangeStartOrEnd([val as Date, selected[1]])}
              disabledDate={disabledStartDate}
              placeholder={placeholder[0]}
            />
            <span className="zent-datepicker-seperator">{i18n.to}</span>
            <PickerComponent
              {...resetProps}
              defaultDate={defaultPanelDate && defaultPanelDate[1]}
              showTime={endShowTime}
              valueType="date"
              value={selected[1]}
              onChange={val => onChangeStartOrEnd([selected[0], val as Date])}
              disabledDate={disabledEndDate}
              placeholder={placeholder[1]}
            />
          </div>
        )}
      </Receiver>
    </>
  );
};
export default RangePicker;
