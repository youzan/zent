import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import { DisabledContext } from '../disabled';
import SinglePicker from './components/SinglePickerBase';
import DatePanel from './panels/date-panel';

import PickerContext from './context/PickerContext';
import { getCallbackValueWithDate } from './utils/getValueInSinglePicker';
import { dateConfig } from './utils/dateUtils';
import { formatText } from './utils/formatInputText';
import {
  ISingleProps,
  IGenerateDateConfig,
  IShowTime,
  IDisabledTime,
  IValueType,
  ISingleRelatedType,
} from './types';
import { DATE_FORMAT, defaultDatePickerCommonProps } from './constants';

const generateDate: IGenerateDateConfig = dateConfig.date;
const PickerContextProvider = PickerContext.Provider;

export interface IDatePickerProps<T extends IValueType = 'string'>
  extends Omit<ISingleProps, 'valueType' | 'onChange'>,
    ISingleRelatedType<T> {
  showTime?: IShowTime;
  disabledTime?: IDisabledTime;
}
const defaultDatePickerProps = {
  format: DATE_FORMAT,
};

export const DatePicker = <T extends IValueType = 'string'>(
  props: IDatePickerProps<T>
) => {
  const disabledContext = React.useContext(DisabledContext);
  const propsRequired = {
    ...defaultDatePickerCommonProps,
    ...defaultDatePickerProps,
    ...props,
  };

  const {
    format,
    valueType,
    placeholder,
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
            placeholder={placeholder || i18n.date}
            PanelComponent={DatePanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
export default DatePicker;
