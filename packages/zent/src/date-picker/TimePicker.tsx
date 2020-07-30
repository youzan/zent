import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import TimePickerBase from './components/TimePickerBase';
import TimePickerPanel from './panels/time-panel';
import { DisabledContext } from '../disabled';
import PickerContext from './context/PickerContext';
import { ISingleTimePickerProps } from './types';

const PickerContextProvider = PickerContext.Provider;
const DefaultTimePickerProps = {
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
};
export interface ITimePickerProps extends ISingleTimePickerProps {}
export const TimePicker: React.FC<ITimePickerProps> = props => {
  const disabledContext = React.useContext(DisabledContext);
  const { placeholder, disabled = disabledContext.value } = props;

  return (
    <Receiver componentName="TimePicker">
      {(i18n: II18nLocaleTimePicker) => (
        <PickerContextProvider
          value={{
            i18n,
          }}
        >
          <TimePickerBase
            {...props}
            placeholder={placeholder || i18n.time}
            disabled={disabled}
            ContentComponent={TimePickerPanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
TimePicker.defaultProps = DefaultTimePickerProps;
export default TimePicker;
