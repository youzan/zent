import { useContext, useMemo, useCallback } from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import SinglePicker from './components/SinglePickerBase';
import WeekPanel from './panels/week-panel';

import PickerContext from './context/PickerContext';
import { DisabledContext } from '../disabled';
import {
  getSelectedValueWithDate,
  getCallbackValueRangeWithDate,
} from './utils/getValueInSinglePicker';
import { dateConfig } from './utils/dateUtils';
import { weekFormatText } from './utils/formatInputText';
import { DATE_FORMAT, defaultDatePickerCommonProps } from './constants';
import {
  IGenerateDateConfig,
  WeekStartsOnMap,
  IWeekOption,
  ISingleSpecialProps,
  IValueType,
  ISingleSpecialRelatedType,
} from './types';

const generateDate: IGenerateDateConfig = dateConfig.week;
const PickerContextProvider = PickerContext.Provider;

export { WeekStartsOnMap };
export interface IWeekPickerProps<T extends IValueType = 'string'>
  extends IWeekOption,
    Omit<ISingleSpecialProps, 'valueType' | 'onChange'>,
    ISingleSpecialRelatedType<T> {
  hideFooter?: boolean;
}

const DefaultWeekPickerProps = {
  format: DATE_FORMAT,
  weekStartsOn: WeekStartsOnMap.Monday,
};

export const WeekPicker = <T extends IValueType = 'string'>(
  props: IWeekPickerProps<T>
) => {
  const disabledContext = useContext(DisabledContext);
  const propsRequired = {
    ...defaultDatePickerCommonProps,
    ...DefaultWeekPickerProps,
    ...props,
  };

  const {
    value,
    defaultDate,
    disabled = disabledContext.value,
    placeholder,
    ...restProps
  } = propsRequired;
  const { weekStartsOn, format, valueType } = restProps;

  // generate week-date method's option
  const options = useMemo(() => ({ weekStartsOn }), [weekStartsOn]);

  const getInputText = useCallback(
    (val: Date | null) => weekFormatText(val, format, options),
    [format, options]
  );

  const getSelectedValue = useCallback(
    val => getSelectedValueWithDate(val, generateDate, options),
    [options]
  );

  const getCallbackValue = useCallback(
    val =>
      getCallbackValueRangeWithDate(
        val,
        valueType,
        format,
        generateDate,
        options
      ),
    [valueType, format, options]
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
            {...restProps}
            value={Array.isArray(value) ? value[0] : value}
            defaultDate={
              Array.isArray(defaultDate) ? defaultDate[0] : defaultDate
            }
            disabled={disabled}
            seperator={i18n.to}
            placeholder={placeholder || i18n.week}
            PanelComponent={WeekPanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
export default WeekPicker;
