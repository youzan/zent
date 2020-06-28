import * as React from 'react';
import cx from 'classnames';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../../i18n';
import PanelContext from '../context/PanelContext';
import PickerContext from '../context/PickerContext';
import {
  ITimePickerProps,
  ITimePickerTriggerProps,
  ITimePanelProps,
} from '../types';
import PickerPopover from './PickerPopover';
import useTimeValue from '../hooks/useTimeValue';
import noop from '../../utils/noop';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';

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
  ...resetProps
}) => {
  const onChangeRef = useEventCallbackRef(onChange);
  const [panelVisible, setPanelVisible] = React.useState<boolean>(false);
  const [visibleChange, setVisibleChange] = React.useState<boolean>(true);
  const { timeValue: selected, setTimevalue: setSelected } = useTimeValue(
    value
  );
  const onSelected = React.useCallback(
    (val, finished = false) => {
      setVisibleChange(false);
      setSelected(val);

      if (finished) {
        setPanelVisible(!finished);
        setVisibleChange(true);
        onChangeRef?.current(val);
      }
    },
    [onChangeRef, setSelected]
  );

  const onVisibleChange = () => {
    panelVisible && setVisibleChange(true);
    setPanelVisible(!panelVisible);
    setSelected(value || '');
  };

  const initDisabledTimes = {
    disabledHours: (disabledTimes?.disabledHours || noop) as () => number[],
    disabledMinutes: (disabledTimes?.disabledMinutes || noop) as () => number[],
    disabledSeconds: (disabledTimes?.disabledSeconds || noop) as () => number[],
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
                    {...resetProps}
                    canClear={canClear}
                    selected={selected}
                    onSelected={onSelected}
                  />
                </div>
              }
              content={
                <PanelContextProvider value={{ visibleChange }}>
                  <ContentComponent
                    {...resetProps}
                    defaultTime={defaultTime}
                    disabledTimes={initDisabledTimes}
                    selected={selected}
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
