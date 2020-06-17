import * as React from 'react';
import cx from 'classnames';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../../i18n';
import useRangeMergedProps from '../hooks/useRangeMergedProps';
import useRangeDisabledDate from '../hooks/useRangeDisabledDate';
import { getRangeValuesWithValueType } from '../utils/getValue';
import { useCallbackRef } from '../../utils/hooks/useCallbackRef';

import {
  IDatePickerCommonProps,
  IRangeTriggerProps,
  IPickerType,
} from '../types';

type IRangePickerProps = IDatePickerCommonProps &
  Pick<IRangeTriggerProps, 'placeholder'>;

export default function WithRangePicker<P>(
  PickerComponent: React.ComponentType<any>,
  defaultProps: any,
  type: IPickerType
) {
  const PopoverComponent: React.FC<P & IRangePickerProps> = ({
    placeholder,
    value,
    onChange,
    disabledDate: disabledDateProps,
    className,
    defaultPanelValue,
    valueType = 'string',
    ...resetProps
  }) => {
    const { format } = resetProps;

    const onChangeRef = useCallbackRef(onChange);
    // selected
    const { selected, setSelected, disabledDate } = useRangeMergedProps({
      value,
      format,
      disabledDate: disabledDateProps,
      defaultPanelValue,
    });
    // disabledDate array
    const [disabledStartDate, disabledEndDate] = useRangeDisabledDate({
      values: selected,
      disabledDate,
      type,
      pickerType: 'range',
    });

    const onChangeStartOrEnd = React.useCallback(
      (val: [Date, Date]) => {
        setSelected(val);
        // props onChange
        onChangeRef?.current(
          getRangeValuesWithValueType(val, valueType, format)
        );
      },
      [onChangeRef, valueType, format, setSelected]
    );

    return (
      <>
        <Receiver componentName="TimePicker">
          {(i18n: II18nLocaleTimePicker) => (
            <div className={cx('zent-date-picker', className)}>
              <PickerComponent
                {...resetProps}
                valueType="date"
                value={selected[0]}
                onChange={val => onChangeStartOrEnd([val, selected[1]])}
                disabledDate={disabledStartDate}
                placeholder={placeholder ? placeholder[0] : i18n.start}
              />
              <span className="zent-date-picker-seperator">{i18n.to}</span>
              <PickerComponent
                {...resetProps}
                valueType="date"
                value={selected[1]}
                onChange={val => onChangeStartOrEnd([selected[0], val])}
                disabledDate={disabledEndDate}
                placeholder={placeholder ? placeholder[1] : i18n.end}
              />
            </div>
          )}
        </Receiver>
      </>
    );
  };
  PopoverComponent.defaultProps = defaultProps;
  return PopoverComponent;
}
