import { useContext, useCallback } from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import SinglePicker from './components/SinglePickerBase';
import YearPanel from './panels/year-panel';

import PickerContext from './context/PickerContext';
import { DisabledContext } from '../disabled';
import { getCallbackValueWithDate } from './utils/getValueInSinglePicker';
import { dateConfig } from './utils/dateUtils';
import { formatText } from './utils/formatInputText';
import {
  ISingleProps,
  IGenerateDateConfig,
  IValueType,
  ISingleRelatedType,
} from './types';
import { YEAR_FORMAT, defaultDatePickerCommonProps } from './constants';

const generateDate: IGenerateDateConfig = dateConfig.year;
const PickerContextProvider = PickerContext.Provider;

export interface IYearPickerProps<T extends IValueType = 'string'>
  extends Omit<ISingleProps, 'valueType' | 'onChange'>,
    ISingleRelatedType<T> {}
const DefaultYearPickerProps = {
  format: YEAR_FORMAT,
};

export const YearPicker = <T extends IValueType = 'string'>(
  props: IYearPickerProps<T>
) => {
  const disabledContext = useContext(DisabledContext);
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
            placeholder={placeholder || i18n.year}
            PanelComponent={YearPanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
export default YearPicker;
