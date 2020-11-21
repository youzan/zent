import * as React from 'react';
import cx from 'classnames';
import PickerPopover from './PickerPopover';
import { SingleInputTrigger } from './PickerTrigger';

import PanelContext from '../context/PanelContext';
import useTimeValue from '../hooks/useTimeValue';
import useConfirmStatus from '../hooks/useConfirmStatus';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';
import pick from '../../utils/pick';
import {
  triggerCommonProps,
  timePanelProps,
  defaultTimePickerProps,
} from '../constants';
import {
  ISingleTimePickerPropsWithDefault,
  ITimePanelProps,
  SingleTime,
} from '../types';
import useSinglePopoverVisible from '../hooks/useSinglePopoverVisible';

const emptyTime: SingleTime = '';
const PanelContextProvider = PanelContext.Provider;
interface ITimePickerBaseProps extends ISingleTimePickerPropsWithDefault {
  ContentComponent: React.ComponentType<ITimePanelProps>;
  seperator?: string;
}

const TimePickerBase: React.FC<ITimePickerBaseProps> = ({
  onChange,
  disabledTime,
  onOpen,
  onClose,
  value,
  className,
  ContentComponent,
  defaultTime,
  selectedDate,
  autoComplete,
  ...restProps
}) => {
  const restPropsRef = React.useRef(restProps);
  restPropsRef.current = restProps;
  const { format, openPanel, disabled } = restPropsRef.current;
  const onChangeRef = useEventCallbackRef(onChange);

  const [visibleChange, setVisibleChange] = React.useState<boolean>(true);
  const { selected, setSelected } = useTimeValue(emptyTime, value);

  const {
    panelVisible,
    setPanelVisible,
    onVisibleChange,
  } = useSinglePopoverVisible<string>(
    value ?? emptyTime,
    setSelected,
    onOpen,
    onClose,
    disabled,
    openPanel
  );

  const disabledTimesOption = React.useMemo(
    () => disabledTime?.(selectedDate) || {},
    [disabledTime, selectedDate]
  );
  const confirmStatus = useConfirmStatus({
    selected,
    disabledTimesOption,
    format,
  });

  const onSelected = React.useCallback(
    (val, finished = false) => {
      setVisibleChange(false);
      setSelected(val);

      if (finished || autoComplete) {
        onChangeRef.current?.(val);
        finished && setVisibleChange(true);
        finished && setPanelVisible(openPanel ?? false);
      }
    },
    [openPanel, onChangeRef, setSelected, setPanelVisible, autoComplete]
  );

  const onClearInput = React.useCallback(
    evt => {
      evt.stopPropagation();
      onChangeRef.current?.(emptyTime);
    },
    [onChangeRef]
  );

  const trigger = React.useMemo(() => {
    const { hiddenIcon } = restPropsRef.current;
    const triggerProps = pick(restPropsRef.current, triggerCommonProps);
    return (
      <div>
        <SingleInputTrigger
          {...triggerProps}
          value={value}
          hiddenIcon={hiddenIcon}
          onClearInput={onClearInput}
          panelVisible={panelVisible}
          text={selected}
          icon="clock-o"
        />
      </div>
    );
  }, [value, selected, panelVisible, restPropsRef, onClearInput]);

  const content = React.useMemo(() => {
    const commonPanelProps = pick(restPropsRef.current, timePanelProps);
    return (
      <div className="zent-datepicker-panel">
        <ContentComponent
          {...commonPanelProps}
          defaultTime={defaultTime}
          disabledTimesOption={disabledTimesOption}
          selected={selected}
          onSelected={onSelected}
        />
      </div>
    );
  }, [
    selected,
    restPropsRef,
    defaultTime,
    disabledTimesOption,
    onSelected,
    ContentComponent,
  ]);

  return (
    <div className={cx('zent-datepicker', className)}>
      <PanelContextProvider value={{ visibleChange, confirmStatus }}>
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
TimePickerBase.defaultProps = defaultTimePickerProps;
export default TimePickerBase;
