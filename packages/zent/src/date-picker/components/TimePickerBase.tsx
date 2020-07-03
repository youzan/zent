import * as React from 'react';
import cx from 'classnames';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../../i18n';
import PickerPopover from './PickerPopover';
import PanelContext from '../context/PanelContext';
import PickerContext from '../context/PickerContext';
import useTimeValue from '../hooks/useTimeValue';
import useConfirmStatus from '../hooks/useConfirmStatus';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';
import {
  ITimePickerProps,
  ITimePickerTriggerProps,
  ITimePanelProps,
} from '../types';

const PickerContextProvider = PickerContext.Provider;
const PanelContextProvider = PanelContext.Provider;
interface IPickerProps extends ITimePickerProps {
  TriggerComponent: React.ComponentType<ITimePickerTriggerProps>;
  ContentComponent: React.ComponentType<
    Omit<ITimePanelProps, 'defaultPanelDate'>
  >;
}

const PopoverComponent: React.FC<IPickerProps> = ({
  onChange,
  disabledTimes,
  value,
  className,
  canClear = true,
  TriggerComponent,
  ContentComponent,
  defaultTime,
  selectedDate,
  ...restProps
}) => {
  const { format } = restProps;
  const onChangeRef = useEventCallbackRef(onChange);
  const [panelVisible, setPanelVisible] = React.useState<boolean>(false);
  const [visibleChange, setVisibleChange] = React.useState<boolean>(true);
  const { timeValue: selected, setTimevalue: setSelected } = useTimeValue(
    value
  );
  const disabledTimesOption = React.useMemo(
    () => disabledTimes?.(selectedDate) || {},
    [disabledTimes, selectedDate]
  );
  const confirmStatus = useConfirmStatus({
    format,
    selected,
    disabledTimesOption,
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

  return (
    <div className={cx('zent-datepicker', className)}>
      <Receiver componentName="TimePicker">
        {(i18n: II18nLocaleTimePicker) => (
          <PickerContextProvider value={{ i18n }}>
            <PickerPopover
              panelVisible={panelVisible}
              onVisibleChange={onVisibleChange}
              trigger={
                <div
                  className={cx({
                    'zent-datepicker-can-clear': value && canClear,
                  })}
                >
                  <TriggerComponent
                    {...restProps}
                    canClear={canClear}
                    selected={selected}
                    onSelected={onSelected}
                  />
                </div>
              }
              content={
                <PanelContextProvider value={{ visibleChange, confirmStatus }}>
                  <ContentComponent
                    {...restProps}
                    defaultTime={defaultTime}
                    disabledTimesOption={disabledTimesOption}
                    selected={selected}
                    confirmStatus={confirmStatus}
                    onSelected={onSelected}
                  />
                </PanelContextProvider>
              }
            />
          </PickerContextProvider>
        )}
      </Receiver>
    </div>
  );
};

export default PopoverComponent;
