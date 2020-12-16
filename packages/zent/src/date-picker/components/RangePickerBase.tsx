import cx from 'classnames';
import { useCallback, useContext, useRef } from 'react';

import PickerContext from '../context/PickerContext';
import useRangeMergedProps from '../hooks/useRangeMergedProps';
import useRangeDisabledDate from '../hooks/useRangeDisabledDate';
import { useShowTimeRangeOption } from '../hooks/useShowTimeOption';
import useNormalizeDisabledDate from '../hooks/useNormalizeDisabledDate';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';

import {
  IGenerateDateConfig,
  IShowTime,
  IShowTimeRange,
  RangeType,
  IDisabledTime,
  IRangePropsWithDefault,
  RangeTypeMap,
  ISingleProps,
  DateNullTuple,
} from '../types';
import useRangeDisabledTime from '../hooks/useRangeDisabledTime';

const { START, END } = RangeTypeMap;
interface IRangePickerProps extends IRangePropsWithDefault {
  generateDate: IGenerateDateConfig;
  PickerComponent: React.ComponentType<
    ISingleProps & {
      showTime?: IShowTime<string>;
      disabledTime?: IDisabledTime;
    }
  >;
  showTime?: IShowTimeRange<string>;
  seperator: string;
  disabledTime?: IDisabledTime;
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
  disabledTime,
  generateDate,
  PickerComponent,
  showTime,
  seperator,
  name,
  dateSpan,
  ...restProps
}) => {
  const restPropsRef = useRef(restProps);
  restPropsRef.current = restProps;
  const { format } = restPropsRef.current;
  const { getCallbackRangeValue } = useContext(PickerContext);
  const onChangeRef = useEventCallbackRef(onChange);
  // selected
  const { selected, setSelected, defaultPanelDate } = useRangeMergedProps({
    value,
    format,
    defaultDate,
  });
  const [start, end] = selected;
  const [startShowTime, endShowTime] = useShowTimeRangeOption(showTime);

  // rangeDisabledDate
  const disabledDate = useNormalizeDisabledDate(format, disabledDateProps);
  const [disabledStartDate, disabledEndDate] = useRangeDisabledDate(
    selected,
    disabledDate,
    generateDate,
    'range',
    dateSpan
  );

  const onChangeStartOrEnd = useCallback(
    (type: RangeType) => (val: Date | null) => {
      const dates: DateNullTuple = type === START ? [val, end] : [start, val];
      setSelected(dates);
      // props onChange
      onChangeRef.current?.(getCallbackRangeValue?.(dates) || null);
    },
    [start, end, onChangeRef, getCallbackRangeValue, setSelected]
  );

  const { disabledStartTimes, disabledEndTimes } = useRangeDisabledTime({
    selected,
    disabledTime,
  });

  return (
    <>
      <div className={cx('zent-datepicker', className)}>
        <PickerComponent
          {...restPropsRef.current}
          defaultDate={defaultPanelDate[0]}
          showTime={startShowTime}
          valueType="date"
          value={start}
          disabledTime={disabledStartTimes}
          onChange={onChangeStartOrEnd(START)}
          onOpen={() => onOpen?.(START)}
          onClose={() => onClose?.(START)}
          disabledDate={disabledStartDate}
          name={name?.[0]}
          placeholder={placeholder[0]}
        />
        <span className="zent-datepicker-seperator">{seperator}</span>
        <PickerComponent
          {...restPropsRef.current}
          defaultDate={defaultPanelDate[1]}
          showTime={endShowTime}
          valueType="date"
          value={end}
          disabledTime={disabledEndTimes}
          onChange={onChangeStartOrEnd(END)}
          onOpen={() => onOpen?.(END)}
          onClose={() => onClose?.(END)}
          disabledDate={disabledEndDate}
          name={name?.[1]}
          placeholder={placeholder[1]}
        />
      </div>
    </>
  );
};

export default RangePicker;
