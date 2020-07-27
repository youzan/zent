import * as React from 'react';
import cx from 'classnames';
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
} from '../constants';
import { ITimePickerProps, ICombinedTimePanelProps, RangeTime } from '../types';
import useSinglePopoverVisible from '../hooks/useSinglePopoverVisible';

const prefixCls = 'zent-datepicker-combined';
const emptyTimeRange: RangeTime = ['', ''];
const PanelContextProvider = PanelContext.Provider;
interface ITimePickerBaseProps extends ITimePickerProps<RangeTime> {
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
  ...restProps
}) => {
  const restPropsRef = React.useRef(restProps);
  restPropsRef.current = restProps;
  const { format, className, openPanel, disabled } = restPropsRef.current;
  const onChangeRef = useEventCallbackRef(onChange);

  const { selected, setSelected } = useTimeValue<RangeTime>(
    value,
    emptyTimeRange
  );
  const [visibleChange, setVisibleChange] = React.useState<boolean>(true);

  const {
    panelVisible,
    setPanelVisible,
    onVisibleChange,
  } = useSinglePopoverVisible(
    openPanel,
    disabled,
    value ?? emptyTimeRange,
    setSelected,
    onOpen,
    onClose
  );

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
    [onChangeRef, setSelected, setPanelVisible]
  );

  const onClearInput = React.useCallback(
    evt => {
      evt.stopPropagation();
      onChangeRef.current?.(emptyTimeRange);
    },
    [onChangeRef]
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
  } = useRangeDisabledTime({
    selected: selectedDates,
    disabledTime,
  });

  const disabledTimesOptionStart = React.useMemo(
    () => disabledStartTimes?.(selectedDates[0] ?? startOfToday()),
    [disabledStartTimes, selectedDates]
  );
  const disabledTimesOptionEnd = React.useMemo(
    () => disabledEndTimes?.(selectedDates[1] ?? startOfToday()),
    [disabledEndTimes, selectedDates]
  );

  const trigger = React.useMemo(() => {
    const triggerProps = pick(restPropsRef.current, triggerCommonProps);
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
          disabledTimesOptionStart={disabledTimesOptionStart}
          disabledTimesOptionEnd={disabledTimesOptionEnd}
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
CombinedTimePicker.defaultProps = defaultTimePickerProps;
export default CombinedTimePicker;
