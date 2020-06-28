import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import PickerContext from './context/PickerContext';

import SinglePicker from './components/SinglePickerBase';
import DatePanel from './panels/date-panel';

import { getCallbackValueWithDate } from './utils/getValueInSinglePicker';
import { generateDateConfig } from './utils/dateUtils';
import { formatText } from './utils/formatInputText';
import {
  IDatePickerCommonProps,
  IGenerateDateConfig,
  IValueType,
  IShowTime,
} from './types';

const generateDate: IGenerateDateConfig = generateDateConfig.date;

const DefaultDatePickerProps = {
  format: 'YYYY-MM-DD',
  valueType: 'string' as IValueType,
};
const PickerContextProvider = PickerContext.Provider;

interface IDatePickerProps extends IDatePickerCommonProps {
  placeholder?: string;
  showTime?: IShowTime;
}

export const DatePicker: React.FC<IDatePickerProps> = props => {
  const { format, valueType, placeholder } = props;

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
            placeholder={placeholder || i18n.date}
            PanelComponent={DatePanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
DatePicker.defaultProps = DefaultDatePickerProps;
export default DatePicker;
