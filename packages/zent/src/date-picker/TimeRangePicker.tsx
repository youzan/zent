import { useContext } from 'react';

import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import TimeRangePickerBase from './components/TimeRangePickerBase';
import { DisabledContext } from '../disabled';
import PickerContext from './context/PickerContext';
import { ITimeRangePickerProps } from './types';
import { SINGLE_INPUT_WIDTH, defaultTimePickerProps } from './constants';
import TimePicker from './TimePicker';

const PickerContextProvider = PickerContext.Provider;

export { ITimeRangePickerProps };
export const TimeRangePicker: React.FC<ITimeRangePickerProps> = props => {
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
          <TimeRangePickerBase
            {...propsRequired}
            format={format}
            placeholder={placeholder || [i18n.startTime, i18n.endTime]}
            disabled={disabled}
            seperator={i18n.to}
            width={width ?? SINGLE_INPUT_WIDTH}
            PickerComponent={TimePicker}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
export default TimeRangePicker;
