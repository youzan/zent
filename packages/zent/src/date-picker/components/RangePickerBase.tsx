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
  ISingleProps,
} from '../types';
import useRangeDisabledTimes from '../hooks/useRangeDisabledTimes';

const { START, END } = RangeTypeMap;
interface IRangePickerProps
  extends ICommonProps<RangeDate>,
    IRangeProps,
    Pick<IRangeTriggerProps, 'placeholder'> {
  generateDate: IGenerateDateConfig;
  PickerComponent: React.ComponentType<
    ISingleProps & {
      showTime?: IShowTime<string>;
      disabledTimes?: IDisabledTimes;
    }
  >;
  showTime?: IShowTime<string[]>;
  seperator: string;
  disabledTimes?: IDisabledTimes;
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
  disabledTimes,
  generateDate,
  PickerComponent,
  showTime,
  seperator,
  ...restProps
}) => {
  const restPropsRef = React.useRef(restProps);
  restPropsRef.current = restProps;
  const { format } = restPropsRef.current;
  const { getCallbackValue } = React.useContext(PickerContext);
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
      const dates: [Date, Date] = type === START ? [val, end] : [start, val];
      setSelected(dates);
      // props onChange
      onChangeRef.current?.(getCallbackValue(dates));
    },
    [start, end, onChangeRef, getCallbackValue, setSelected]
  );

  const { disabledStartTimes, disabledEndTimes } = useRangeDisabledTimes({
    selected,
    disabledTimes,
  });

  return (
    <>
      <div className={cx('zent-datepicker', className)}>
        <PickerComponent
          {...restPropsRef.current}
          defaultDate={defaultPanelDate?.[0]}
          showTime={startShowTime}
          valueType="date"
          value={start}
          disabledTimes={disabledStartTimes}
          onChange={onChangeStartOrEnd(START)}
          onOpen={() => onOpen?.(START)}
          onClose={() => onClose?.(START)}
          disabledDate={disabledStartDate}
          placeholder={placeholder[0]}
        />
        <span className="zent-datepicker-seperator">{seperator}</span>
        <PickerComponent
          {...restPropsRef.current}
          defaultDate={defaultPanelDate?.[1]}
          showTime={endShowTime}
          valueType="date"
          value={end}
          disabledTimes={disabledEndTimes}
          onChange={onChangeStartOrEnd(END)}
          onOpen={() => onOpen?.(END)}
          onClose={() => onClose?.(END)}
          disabledDate={disabledEndDate}
          placeholder={placeholder[1]}
        />
      </div>
    </>
  );
};

export default RangePicker;
