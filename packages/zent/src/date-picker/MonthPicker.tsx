import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import SinglePicker from './components/SinglePickerBase';
import MonthPanel from './panels/month-panel';
import { DisabledContext } from '../disabled';

import PickerContext from './context/PickerContext';
import { getCallbackValueWithDate } from './utils/getValueInSinglePicker';
import { dateConfig } from './utils/dateUtils';
import { formatText } from './utils/formatInputText';
import { ISingleProps, IGenerateDateConfig } from './types';
import { MONTH_FORMAT } from './constants';

const generateDate: IGenerateDateConfig = dateConfig.month;
const PickerContextProvider = PickerContext.Provider;

export interface IMonthPickerProps extends ISingleProps {}

const DefaultMonthPickerProps: Partial<IMonthPickerProps> = {
  format: MONTH_FORMAT,
  valueType: 'string',
};
export const MonthPicker: React.FC<IMonthPickerProps> = props => {
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
            placeholder={placeholder || i18n.month}
            PanelComponent={MonthPanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
MonthPicker.defaultProps = DefaultMonthPickerProps;
export default MonthPicker;
