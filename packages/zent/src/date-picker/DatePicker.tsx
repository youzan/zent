import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import { DisabledContext } from '../disabled';
import SinglePicker from './components/SinglePickerBase';
import DatePanel from './panels/date-panel';

import PickerContext from './context/PickerContext';
import { getCallbackValueWithDate } from './utils/getValueInSinglePicker';
import { generateDateConfig } from './utils/dateUtils';
import { formatText } from './utils/formatInputText';
import {
  ISingleProps,
  IGenerateDateConfig,
  IShowTime,
  IDisabledTimes,
} from './types';

const generateDate: IGenerateDateConfig = generateDateConfig.date;

const PickerContextProvider = PickerContext.Provider;

export interface IDatePickerProps extends ISingleProps {
  showTime?: IShowTime;
  disabledTimes?: IDisabledTimes;
}
const DefaultDatePickerProps: Partial<IDatePickerProps> = {
  format: 'YYYY-MM-DD',
  valueType: 'string',
};
export const DatePicker: React.FC<IDatePickerProps> = props => {
  const { format, valueType, placeholder } = props;
  const disabledContext = React.useContext(DisabledContext);

  const getInputText = React.useCallback(
    (val: Date) => formatText(val, format),
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
            {...props}
            disabled={disabledContext.value}
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
