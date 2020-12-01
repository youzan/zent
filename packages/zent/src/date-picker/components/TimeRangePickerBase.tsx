import { useCallback, useRef } from 'react';
import cx from 'classnames';
import { startOfToday } from 'date-fns';

import PanelContext from '../context/PanelContext';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';
import useRangeDisabledTime from '../hooks/useRangeDisabledTime';
import useTimeValue, { parseSelectedToRangeDate } from '../hooks/useTimeValue';

import {
  RangeType,
  RangeTypeMap,
  RangeTime,
  ITimeRangePickerPropsWithDefault,
} from '../types';
import { ITimePickerProps } from '../TimePicker';
import { emptyTimeRange } from '../constants';

const { START, END } = RangeTypeMap;
const PanelContextProvider = PanelContext.Provider;

interface ITimeRangePickerBaseProps extends ITimeRangePickerPropsWithDefault {
  PickerComponent: React.ComponentType<ITimePickerProps>;
  seperator: string;
}

const TimeRangePickerBase: React.FC<ITimeRangePickerBaseProps> = ({
  value,
  onChange,
  disabledTime,
  onClose,
  onOpen,
  defaultTime,
  placeholder,
  PickerComponent,
  className,
  seperator,
  name,
  ...restProps
}) => {
  const restPropsRef = useRef(restProps);
  restPropsRef.current = restProps;

  const { format } = restPropsRef.current;

  const onChangeRef = useEventCallbackRef(onChange);
  // selected
  const { selected, setSelected } = useTimeValue<RangeTime>(
    emptyTimeRange,
    value
  );
  const [start, end] = selected;

  const onChangeStartOrEnd = useCallback(
    (type: RangeType) => (val: string) => {
      const times: RangeTime = type === START ? [val, end] : [start, val];
      setSelected(times);
      // props onChange
      onChangeRef.current?.(times);
    },
    [start, end, onChangeRef, setSelected]
  );

  const selectedDates = parseSelectedToRangeDate(selected, format, new Date());
  const {
    disabledStartTimes,
    disabledConfirm,
    disabledEndTimes,
  } = useRangeDisabledTime({
    selected: selectedDates,
    disabledTime,
  });

  const disabledStart = useCallback(
    () => disabledStartTimes?.(selectedDates[0] ?? startOfToday()),
    [disabledStartTimes, selectedDates]
  );
  const disabledEnd = useCallback(
    () => disabledEndTimes?.(selectedDates[1] ?? startOfToday()),
    [disabledEndTimes, selectedDates]
  );
  return (
    <>
      <div className={cx('zent-datepicker', className)}>
        <PanelContextProvider value={{ confirmStatus: disabledConfirm }}>
          <PickerComponent
            {...restPropsRef.current}
            value={start}
            onChange={onChangeStartOrEnd(START)}
            defaultTime={defaultTime?.[0]}
            disabledTime={disabledStart}
            onOpen={() => onOpen?.(START)}
            onClose={() => onClose?.(START)}
            name={name?.[0]}
            autoComplete={true}
            placeholder={placeholder[0]}
          />
          <span className="zent-datepicker-seperator">{seperator}</span>
          <PickerComponent
            {...restPropsRef.current}
            value={end}
            onChange={onChangeStartOrEnd(END)}
            defaultTime={defaultTime?.[1]}
            disabledTime={disabledEnd}
            onOpen={() => onOpen?.(END)}
            onClose={() => onClose?.(END)}
            name={name?.[1]}
            autoComplete={true}
            placeholder={placeholder[1]}
          />
        </PanelContextProvider>
      </div>
    </>
  );
};

export default TimeRangePickerBase;
