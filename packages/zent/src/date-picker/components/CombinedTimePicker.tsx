import cx from 'classnames';
import { useCallback, useMemo, useRef, useState } from 'react';

import PickerPopover from './PickerPopover';
import { CombinedInputTrigger } from './PickerTrigger';
import PanelContext from '../context/PanelContext';
import useTimeValue, { parseSelectedToRangeDate } from '../hooks/useTimeValue';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';
import pick from '../../utils/pick';
import useRangeDisabledTime from '../hooks/useRangeDisabledTime';
import { startOfToday } from 'date-fns';
import {
  triggerCommonProps,
  timePanelProps,
  defaultTimePickerProps,
  emptyTimeRange,
} from '../constants';
import {
  ICombinedTimeRangePickerPropsWithDefault,
  ICombinedTimePanelProps,
  RangeTime,
} from '../types';
import useSinglePopoverVisible from '../hooks/useSinglePopoverVisible';

const prefixCls = 'zent-datepicker-combined';

const PanelContextProvider = PanelContext.Provider;
interface ITimePickerBaseProps
  extends ICombinedTimeRangePickerPropsWithDefault {
  ContentComponent: React.ComponentType<ICombinedTimePanelProps>;
  seperator?: string;
}

const CombinedTimePicker: React.FC<ITimePickerBaseProps> = ({
  onChange,
  disabledTime,
  onOpen,
  onClose,
  value,
  ContentComponent,
  defaultTime,
  selectedDate,
  disabled,
  ...restProps
}) => {
  const restPropsRef = useRef(restProps);
  restPropsRef.current = restProps;
  const { format, className, openPanel } = restPropsRef.current;
  const onChangeRef = useEventCallbackRef(onChange);

  const { selected, setSelected } = useTimeValue<RangeTime>(
    emptyTimeRange,
    value
  );
  const [visibleChange, setVisibleChange] = useState<boolean>(true);

  const {
    panelVisible,
    setPanelVisible,
    onVisibleChange,
  } = useSinglePopoverVisible<RangeTime>(
    value ?? emptyTimeRange,
    setSelected,
    onOpen,
    onClose,
    disabled,
    openPanel
  );

  const onSelected = useCallback(
    (val: RangeTime, finished = false) => {
      setVisibleChange(false);
      setSelected(val);
      if (finished) {
        setPanelVisible(!finished);
        setVisibleChange(true);
        onChangeRef.current?.(val);
      }
    },
    [onChangeRef, setSelected, setPanelVisible]
  );

  const onClearInput = useCallback(
    evt => {
      evt.stopPropagation();
      onChangeRef.current?.(emptyTimeRange);
    },
    [onChangeRef]
  );

  const selectedDates = parseSelectedToRangeDate(selected, format, new Date());

  // disabledTimeOption
  const {
    disabledStartTimes,
    disabledConfirm,
    disabledEndTimes,
  } = useRangeDisabledTime({
    selected: selectedDates,
    disabledTime,
  });

  const disabledTimeOptionStart = useMemo(
    () => disabledStartTimes?.(selectedDates[0] ?? startOfToday()),
    [disabledStartTimes, selectedDates]
  );
  const disabledTimeOptionEnd = useMemo(
    () => disabledEndTimes?.(selectedDates[1] ?? startOfToday()),
    [disabledEndTimes, selectedDates]
  );

  const trigger = useMemo(() => {
    const triggerProps = pick(restPropsRef.current, triggerCommonProps);
    return (
      <div>
        <CombinedInputTrigger
          {...triggerProps}
          value={value}
          disabled={disabled}
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
    disabled,
    onClearInput,
  ]);

  const content = useMemo(() => {
    const commonPanelProps = pick(restPropsRef.current, timePanelProps);
    return (
      <div className={cx(`${prefixCls}-panel`, `${prefixCls}-time-panel`)}>
        <ContentComponent
          {...commonPanelProps}
          defaultTime={defaultTime}
          disabledTimeOptionStart={disabledTimeOptionStart}
          disabledTimeOptionEnd={disabledTimeOptionEnd}
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
    disabledTimeOptionStart,
    disabledTimeOptionEnd,
    ContentComponent,
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
CombinedTimePicker.defaultProps = defaultTimePickerProps;
export default CombinedTimePicker;
