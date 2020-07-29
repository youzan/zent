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

export const CombinedTimeRangePicker: React.FC<ICombinedTimeRangePickerProps> = props => {
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
          <CombinedTimePickerBase
            {...props}
            seperator={i18n.to}
            placeholder={placeholder || [i18n.startTime, i18n.endTime]}
            disabled={disabled}
            ContentComponent={CombinedTimePanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};

export default CombinedTimeRangePicker;
