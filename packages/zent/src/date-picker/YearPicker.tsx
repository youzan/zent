import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import SinglePicker from './components/SinglePickerBase';
import YearPanel from './panels/year-panel';

import PickerContext from './context/PickerContext';
import { DisabledContext } from '../disabled';
import { getCallbackValueWithDate } from './utils/getValueInSinglePicker';
import { dateConfig } from './utils/dateUtils';
import { formatText } from './utils/formatInputText';
import { ISingleProps, IGenerateDateConfig } from './types';
import { YEAR_FORMAT, defaultDatePickerCommonProps } from './constants';

const generateDate: IGenerateDateConfig = dateConfig.year;
const PickerContextProvider = PickerContext.Provider;

export interface IYearPickerProps extends ISingleProps {}
const DefaultYearPickerProps = {
  format: YEAR_FORMAT,
};

export const YearPicker: React.FC<IYearPickerProps> = props => {
  const disabledContext = React.useContext(DisabledContext);
  const propsRequired = {
    ...defaultDatePickerCommonProps,
    ...DefaultYearPickerProps,
    ...props,
  };

  const {
    format,
    placeholder,
    valueType,
    disabled = disabledContext.value,
  } = propsRequired;

  const getInputText = React.useCallback(
    (val: Date | null) => formatText(val, format),
    [format]
  );

  const getSelectedValue = React.useCallback((val: Date) => val, []);

  const getCallbackValue = React.useCallback(
    (val: Date) => getCallbackValueWithDate(val, valueType, format),
    [valueType, format]
  );

  return (
    <Receiver componentName="TimePicker">
      {(i18n: II18nLocaleTimePicker) => (
        <PickerContextProvider
          value={{
            i18n,
            generateDate,
            getCallbackValue,
            getSelectedValue,
            getInputText,
          }}
        >
          <SinglePicker
            {...propsRequired}
            disabled={disabled}
            placeholder={placeholder || i18n.year}
            PanelComponent={YearPanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
export default YearPicker;
