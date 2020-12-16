import { useContext, useCallback } from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import SinglePicker from './components/SinglePickerBase';
import MonthPanel from './panels/month-panel';
import { DisabledContext } from '../disabled';

import PickerContext from './context/PickerContext';
import { getCallbackValueWithDate } from './utils/getValueInSinglePicker';
import { dateConfig } from './utils/dateUtils';
import { formatText } from './utils/formatInputText';
import {
  ISingleProps,
  IGenerateDateConfig,
  IValueType,
  ISingleRelatedType,
} from './types';
import { MONTH_FORMAT, defaultDatePickerCommonProps } from './constants';

const generateDate: IGenerateDateConfig = dateConfig.month;
const PickerContextProvider = PickerContext.Provider;

export interface IMonthPickerProps<T extends IValueType = 'string'>
  extends Omit<ISingleProps, 'valueType' | 'onChange'>,
    ISingleRelatedType<T> {}

const DefaultMonthPickerProps = {
  format: MONTH_FORMAT,
};

export const MonthPicker = <T extends IValueType = 'string'>(
  props: IMonthPickerProps<T>
) => {
  const disabledContext = useContext(DisabledContext);
  const propsRequired = {
    ...defaultDatePickerCommonProps,
    ...DefaultMonthPickerProps,
    ...props,
  };

  const {
    format,
    valueType,
    placeholder,
    disabled = disabledContext.value,
  } = propsRequired;

  const getInputText = useCallback(
    (val: Date | null) => formatText(val, format),
    [format]
  );

  const getSelectedValue = useCallback((val: Date) => val, []);

  const getCallbackValue = useCallback(
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
            placeholder={placeholder || i18n.month}
            PanelComponent={MonthPanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
export default MonthPicker;
