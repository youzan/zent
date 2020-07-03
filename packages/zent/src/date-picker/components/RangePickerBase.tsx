import * as React from 'react';
import cx from 'classnames';

import PickerContext from '../context/PickerContext';
import useRangeMergedProps from '../hooks/useRangeMergedProps';
import useRangeDisabledDate from '../hooks/useRangeDisabledDate';
import { useShowTimeRangeOption } from '../hooks/useShowTimeOption';
import useNormalizeDisabledDate from '../hooks/useNormalizeDisabledDate';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';

import {
  ICommonProps,
  IRangeTriggerProps,
  RangeDate,
  IGenerateDateConfig,
  IShowTime,
  RangeType,
  IDisabledTimes,
  IRangeProps,
  RangeTypeMap,
} from '../types';

interface IRangePickerProps
  extends ICommonProps<RangeDate>,
    IRangeProps,
    Pick<IRangeTriggerProps, 'placeholder'> {
  generateDate: IGenerateDateConfig;
  PickerComponent: React.ComponentType<
    ICommonProps & {
      placeholder?: string;
      showTime?: IShowTime<string>;
      disabledTimes?: IDisabledTimes;
    }
  >;
  showTime?: IShowTime<string[]>;
  seperator: string;
}

const RangePicker: React.FC<IRangePickerProps> = ({
  placeholder,
  value,
  disabledDate: disabledDateProps,
  className,
  defaultDate,
  valueType,
  onChange,
  onClose,
  onOpen,
  generateDate,
  PickerComponent,
  showTime,
  seperator,
  ...restProps
}) => {
  const { format } = restProps;
  const {
    getCallbackValue,
    getStartCustomProps,
    getEndCustomProps,
  } = React.useContext(PickerContext);
  const onChangeRef = useEventCallbackRef(onChange);
  // selected
  const { selected, setSelected, defaultPanelDate } = useRangeMergedProps({
    value,
    format,
    defaultDate,
  });
  const [start, end] = selected;
  const [startShowTime, endShowTime] = useShowTimeRangeOption<string[]>(
    showTime
  );

  // rangeDisabledDate
  const disabledDate = useNormalizeDisabledDate(disabledDateProps, format);
  const [disabledStartDate, disabledEndDate] = useRangeDisabledDate({
    selected,
    disabledDate,
    generateDate,
    pickerType: 'range',
  });

  const onChangeStartOrEnd = React.useCallback(
    (type: RangeType) => (val: Date) => {
      const dates: [Date, Date] =
        type === RangeTypeMap.START ? [val, end] : [start, val];
      setSelected(dates);
      // props onChange
      onChangeRef.current?.(getCallbackValue(dates));
    },
    [start, end, onChangeRef, getCallbackValue, setSelected]
  );

  const startCustomProps = getStartCustomProps
    ? getStartCustomProps(selected)
    : {};
  const endCustomProps = getEndCustomProps ? getEndCustomProps(selected) : {};

  return (
    <>
      <div className={cx('zent-datepicker', className)}>
        <PickerComponent
          {...restProps}
          {...startCustomProps}
          defaultDate={defaultPanelDate?.[0]}
          showTime={startShowTime}
          valueType="date"
          value={start}
          onChange={onChangeStartOrEnd(RangeTypeMap.START)}
          onOpen={() => onOpen?.(RangeTypeMap.START)}
          onClose={() => onClose?.(RangeTypeMap.START)}
          disabledDate={disabledStartDate(RangeTypeMap.START)}
          placeholder={placeholder[0]}
        />
        <span className="zent-datepicker-seperator">{seperator}</span>
        <PickerComponent
          {...restProps}
          {...endCustomProps}
          defaultDate={defaultPanelDate?.[1]}
          showTime={endShowTime}
          valueType="date"
          value={end}
          onChange={onChangeStartOrEnd(RangeTypeMap.END)}
          onOpen={() => onOpen?.(RangeTypeMap.END)}
          onClose={() => onClose?.(RangeTypeMap.END)}
          disabledDate={disabledEndDate?.(RangeTypeMap.END)}
          placeholder={placeholder[1]}
        />
      </div>
    </>
  );
};
export default RangePicker;
