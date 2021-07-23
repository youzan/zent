import { useContext } from 'react';

import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import TimePickerBase from './components/TimePickerBase';
import TimePickerPanel from './panels/time-panel';
import { DisabledContext } from '../disabled';
import PickerContext from './context/PickerContext';
import { ISingleTimePickerProps } from './types';
import { INPUT_WIDTH, defaultTimePickerProps } from './constants';

const PickerContextProvider = PickerContext.Provider;

export type ITimePickerProps = ISingleTimePickerProps;
export const TimePicker: React.FC<ITimePickerProps> = props => {
  const disabledContext = useContext(DisabledContext);
  const propsRequired = { ...defaultTimePickerProps, ...props };

  const {
    format,
    placeholder,
    width,
    disabled = disabledContext.value,
  } = propsRequired;

  return (
    <Receiver componentName="TimePicker">
      {(i18n: II18nLocaleTimePicker) => (
        <PickerContextProvider
          value={{
            i18n,
          }}
        >
          <TimePickerBase
            {...propsRequired}
            format={format}
            placeholder={placeholder || i18n.time}
            disabled={disabled}
            width={width ?? INPUT_WIDTH}
            ContentComponent={TimePickerPanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
export default TimePicker;
