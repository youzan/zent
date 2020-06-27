import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import PickerContext from './context/PickerContext';

import SinglePicker from './components/SinglePickerBase';
import YearPanel from './panels/year-panel';
import { getCallbackValueRangeWithDate } from './utils/getValueInSinglePicker';
import { generateDateConfig } from './utils/dateUtils';
import { formatText } from './utils/formatInputText';
import {
  IDatePickerCommonProps,
  IGenerateDateConfig,
  IValueType,
} from './types';

const generateDate: IGenerateDateConfig = generateDateConfig.year;
const PickerContextProvider = PickerContext.Provider;

interface IYearPickerProps extends IDatePickerCommonProps {
  placeholder?: string;
}

const DefaultYearPickerProps = {
  format: 'YYYY',
  valueType: 'string' as IValueType,
};
export const YearPicker: React.FC<IYearPickerProps> = props => {
  const { format, placeholder, valueType } = props;

  const getInputText = React.useCallback(val => formatText(val, format), [
    format,
  ]);

  const getSelectedValue = React.useCallback(val => val, []);

  const getCallbackValue = React.useCallback(
    val => getCallbackValueRangeWithDate(val, valueType, format, generateDate),
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
