import * as React from 'react';
import cx from 'classnames';
import PickerPopover from './PickerPopover';
import { SingleInputTrigger } from './PickerTrigger';

import PanelContext from '../context/PanelContext';
import useTimeValue from '../hooks/useTimeValue';
import useConfirmStatus from '../hooks/useConfirmStatus';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';
import {
  ITimePickerProps,
  ITimePanelProps,
  timePanelProps,
  triggerPickProps,
} from '../types';
import pick from '../../utils/pick';

const PanelContextProvider = PanelContext.Provider;
interface ITimePickerBaseProps extends ITimePickerProps {
  ContentComponent: React.ComponentType<ITimePanelProps>;
  seperator?: string;
}

const TimePickerBase: React.FC<ITimePickerBaseProps> = ({
  onChange,
  disabledTimes,
  value,
  className,
  ContentComponent,
  defaultTime,
  selectedDate,
  ...restProps
}) => {
  const restPropsRef = React.useRef(restProps);
  const { format } = restPropsRef.current;
  const onChangeRef = useEventCallbackRef(onChange);
  const [panelVisible, setPanelVisible] = React.useState<boolean>(false);
  const [visibleChange, setVisibleChange] = React.useState<boolean>(true);
  const { selected, setSelected } = useTimeValue(value);
  const disabledTimesOption = React.useMemo(
    () => disabledTimes?.(selectedDate) || {},
    [disabledTimes, selectedDate]
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
    setSelected(value || '');
  };

  const onClearInput = React.useCallback(
    evt => {
      evt.stopPropagation();
      onSelected('', true);
    },
    [onSelected]
  );

  const trigger = React.useMemo(() => {
    const { hiddenIcon } = restPropsRef.current;
    const triggerProps = pick(restPropsRef.current, triggerPickProps);
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
  }, [selected, restPropsRef, defaultTime, disabledTimesOption, onSelected]);

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
TimePickerBase.defaultProps = {
  disabled: false,
  canClear: true,
};
export default TimePickerBase;
