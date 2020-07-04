import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import CombinedTimePickerBase from './components/CombinedTimePicker';
import CombinedTimePanel from './panels/combined-time-range-panel';
import { DisabledContext } from '../disabled';
import PickerContext from './context/PickerContext';
import { ITimePickerProps, RangeTime } from './types';

const PickerContextProvider = PickerContext.Provider;

export interface ICombinedTimeRangePickerProps
  extends ITimePickerProps<RangeTime> {}
const DefaultTimePickerProps: Partial<ICombinedTimeRangePickerProps> = {
  format: 'HH:mm:ss',
  selectedDate: null,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  width: 240,
};

export const CombinedTimeRangePicker: React.FC<ICombinedTimeRangePickerProps> = props => {
  const { placeholder } = props;
  const disabledContext = React.useContext(DisabledContext);
  return (
    <Receiver componentName="TimePicker">
      {(i18n: II18nLocaleTimePicker) => (
        <PickerContextProvider
          value={{
            i18n,
          }}
        >
          <CombinedTimePickerBase
            {...props}
            seperator={i18n.to}
            placeholder={placeholder || [i18n.startTime, i18n.endTime]}
            disabled={disabledContext.value}
            ContentComponent={CombinedTimePanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
CombinedTimeRangePicker.defaultProps = DefaultTimePickerProps;
export default CombinedTimeRangePicker;
