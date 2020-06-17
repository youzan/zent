import * as React from 'react';
import cx from 'classnames';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../../i18n';
import I18nLocaleContext from '../context/I18nLocaleContext';
import PanelContext from '../context/PanelContext';
import { ITimePickerProps } from '../types';
import PickerPopover from './PickerPopover';
import useTimeValue from '../hooks/useTimeValue';
import noop from '../../utils/noop';

const I18nLocaleContextProvider = I18nLocaleContext.Provider;
const PanelContextProvider = PanelContext.Provider;
export interface ITimePickerInnerProps {
  autoOnChange?: boolean;
}

export default function WithTimePicker(
  TriggerComponent: React.ComponentType<any>,
  ContentComponent: React.ComponentType<any>,
  defaultProps: Partial<ITimePickerProps>
) {
  const PopoverComponent: React.FC<ITimePickerProps &
    ITimePickerInnerProps> = props => {
    const {
      onChange,
      disabledTimes,
      value,
      autoOnChange = false,
      className,
      ...resetProps
    } = props;

    const [panelVisible, setPanelVisible] = React.useState<boolean>(false);
    const [visibleChange, setVisibleChange] = React.useState<boolean>(true);
    const { timeValue: selected, setTimevalue: setSelected } = useTimeValue(
      value
    );
    const onSelected = (val, finished = false) => {
      setVisibleChange(false);
      setSelected(val);

      if (finished || autoOnChange) {
        setPanelVisible(!finished);
        onChange && onChange(val);
      }
    };

    const onVisibleChange = () => {
      setPanelVisible(!panelVisible);
      setSelected(value || '');
    };

    const pocessDisabledTimes = {
      disabledHours: disabledTimes?.disabledHours || noop,
      disabledMinutes: disabledTimes?.disabledMinutes || noop,
      disabledSeconds: disabledTimes?.disabledSeconds || noop,
    };

    return (
      <div className={cx('zent-date-picker', className)}>
        <Receiver componentName="TimePicker">
          {(i18n: II18nLocaleTimePicker) => (
            <I18nLocaleContextProvider value={{ i18n }}>
              <PickerPopover
                panelVisible={panelVisible}
                onVisibleChange={onVisibleChange}
                trigger={
                  <div
                    className={cx({
                      'zent-date-picker-can-clear': value,
                    })}
                  >
                    <TriggerComponent
                      {...resetProps}
                      selected={selected}
                      onSelected={onSelected}
                    />
                  </div>
                }
                content={
                  <PanelContextProvider value={{ visibleChange }}>
                    <ContentComponent
                      {...resetProps}
                      {...pocessDisabledTimes}
                      selected={selected}
                      onSelected={onSelected}
                    />
                  </PanelContextProvider>
                }
              />
            </I18nLocaleContextProvider>
          )}
        </Receiver>
      </div>
    );
  };
  PopoverComponent.defaultProps = defaultProps;
  return PopoverComponent;
}
