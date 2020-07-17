import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import SinglePicker from './components/SinglePickerBase';
import YearPanel from './panels/year-panel';

import PickerContext from './context/PickerContext';
import { DisabledContext } from '../disabled';
import { getCallbackValueWithDate } from './utils/getValueInSinglePicker';
import { generateDateConfig } from './utils/dateUtils';
import { formatText } from './utils/formatInputText';
import { ISingleProps, IGenerateDateConfig } from './types';
import { YEAR_FORMAT } from './constants';

const generateDate: IGenerateDateConfig = generateDateConfig.year;
const PickerContextProvider = PickerContext.Provider;

export interface IYearPickerProps extends ISingleProps {}

const DefaultYearPickerProps: Partial<IYearPickerProps> = {
  format: YEAR_FORMAT,
  valueType: 'string',
};
export const YearPicker: React.FC<IYearPickerProps> = props => {
  const { format, placeholder, valueType, disabled } = props;
  const disabledContext = React.useContext(DisabledContext);

  const getInputText = React.useCallback(val => formatText(val, format), [
    format,
  ]);

  const getSelectedValue = React.useCallback(val => val, []);

  const getCallbackValue = React.useCallback(
    val => getCallbackValueWithDate(val, valueType, format),
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
            {...props}
            disabled={disabledContext.value || disabled}
            placeholder={placeholder || i18n.year}
            PanelComponent={YearPanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
YearPicker.defaultProps = DefaultYearPickerProps;
export default YearPicker;
