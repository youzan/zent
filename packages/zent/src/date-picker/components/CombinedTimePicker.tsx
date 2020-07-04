import * as React from 'react';
import cx from 'classnames';
import PickerPopover from './PickerPopover';
import { CombinedInputTrigger } from './PickerTrigger';

import PanelContext from '../context/PanelContext';
import useTimeValue, { parseSelectedToRangeDate } from '../hooks/useTimeValue';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';
import pick from '../../utils/pick';
import getRangeDisabledTimes from '../utils/getRangeDisabledTimes';
import {
  ITimePickerProps,
  ICombinedTimePanelProps,
  triggerPickProps,
  RangeTypeMap,
  timePanelProps,
  RangeTime,
} from '../types';

const prefixCls = 'zent-datepicker-combined';
const PanelContextProvider = PanelContext.Provider;
interface ITimePickerBaseProps extends ITimePickerProps<RangeTime> {
  ContentComponent: React.ComponentType<ICombinedTimePanelProps>;
  seperator?: string;
}

const CombinedTimePicker: React.FC<ITimePickerBaseProps> = ({
  onChange,
  disabledTimes,
  value,
  ContentComponent,
  defaultTime,
  selectedDate,
  ...restProps
}) => {
  const restPropsRef = React.useRef(restProps);
  const { format, className } = restPropsRef.current;
  const onChangeRef = useEventCallbackRef(onChange);
  const [panelVisible, setPanelVisible] = React.useState<boolean>(false);
  const [visibleChange, setVisibleChange] = React.useState<boolean>(true);
  const { selected, setSelected } = useTimeValue<RangeTime>(value);

  const onSelected = React.useCallback(
    (val, finished = false) => {
      setVisibleChange(false);
      setSelected(val);
      if (finished) {
        setPanelVisible(!finished);
        setVisibleChange(true);
        onChangeRef.current?.(val);
      }
    },
    [onChangeRef, setSelected]
  );

  const onVisibleChange = () => {
    panelVisible && setVisibleChange(true);
    setPanelVisible(!panelVisible);
    setSelected(value || ['', '']);
  };

  const onClearInput = React.useCallback(
    evt => {
      evt.stopPropagation();
      onSelected(['', ''], true);
    },
    [onSelected]
  );

  const selectedDates = parseSelectedToRangeDate(
    selected,
    format,
    selectedDate
  );

  // disabledTimesOption
  const {
    disabledStartTimes,
    disabledConfirm,
    disabledEndTimes,
  } = getRangeDisabledTimes({
    selected: selectedDates,
    disabledTimes,
  });
  const disabledTimesOptionStart = React.useMemo(
    () => disabledStartTimes?.(RangeTypeMap.START)(selectedDates[0]) || {},
    [disabledStartTimes, selectedDates]
  );
  const disabledTimesOptionEnd = React.useMemo(
    () => disabledEndTimes?.(RangeTypeMap.END)(selectedDates[1]) || {},
    [disabledEndTimes, selectedDates]
  );

  const trigger = React.useMemo(() => {
    const triggerProps = pick(restPropsRef.current, triggerPickProps);
    return (
      <div>
        <CombinedInputTrigger
          {...triggerProps}
          value={value}
          selected={selectedDates}
          onClearInput={onClearInput}
          panelVisible={panelVisible}
          text={selected}
          icon="clock-o"
        />
      </div>
    );
  }, [
    value,
    selected,
    selectedDates,
    panelVisible,
    restPropsRef,
    onClearInput,
  ]);

  const content = React.useMemo(() => {
    const commonPanelProps = pick(restPropsRef.current, timePanelProps);
    return (
      <div className={cx(`${prefixCls}-panel`, `${prefixCls}-time-panel`)}>
        <ContentComponent
          {...commonPanelProps}
          defaultTime={defaultTime}
          disabledTimesOption={[
            disabledTimesOptionStart,
            disabledTimesOptionEnd,
          ]}
          selected={selected}
          onSelected={onSelected}
        />
      </div>
    );
  }, [
    selected,
    defaultTime,
    restPropsRef,
    onSelected,
    disabledTimesOptionStart,
    disabledTimesOptionEnd,
  ]);

  return (
    <div className={cx('zent-datepicker', className)}>
      <PanelContextProvider
        value={{ visibleChange, confirmStatus: disabledConfirm }}
      >
        <PickerPopover
          panelVisible={panelVisible}
          onVisibleChange={onVisibleChange}
          trigger={trigger}
          content={content}
        />
      </PanelContextProvider>
    </div>
  );
};
CombinedTimePicker.defaultProps = {
  disabled: false,
  canClear: true,
};
export default CombinedTimePicker;
