import { useContext } from 'react';

import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import CombinedTimePickerBase from './components/CombinedTimePicker';
import CombinedTimePanel from './panels/combined-time-range-panel';
import { DisabledContext } from '../disabled';
import PickerContext from './context/PickerContext';
import { ICombinedTimeRangePickerProps } from './types';
import { INPUT_WIDTH, defaultTimePickerProps } from './constants';

const PickerContextProvider = PickerContext.Provider;

export { ICombinedTimeRangePickerProps };

export const CombinedTimeRangePicker: React.FC<ICombinedTimeRangePickerProps> = props => {
  const disabledContext = useContext(DisabledContext);
  const propsRequired = { ...defaultTimePickerProps, ...props };

  const {
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
          <CombinedTimePickerBase
            {...propsRequired}
            seperator={i18n.to}
            placeholder={placeholder || [i18n.startTime, i18n.endTime]}
            disabled={disabled}
            width={width ?? INPUT_WIDTH}
            ContentComponent={CombinedTimePanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
export default CombinedTimeRangePicker;
