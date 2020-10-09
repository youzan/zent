import * as React from 'react';
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
  ISingleSepcialProps,
} from './types';

const generateDate: IGenerateDateConfig = dateConfig.week;
const PickerContextProvider = PickerContext.Provider;

export { WeekStartsOnMap };
export interface IWeekPickerProps extends IWeekOption, ISingleSepcialProps {}

const DefaultWeekPickerProps = {
  format: DATE_FORMAT,
  weekStartsOn: WeekStartsOnMap.Monday,
};

export const WeekPicker: React.FC<IWeekPickerProps> = props => {
  const disabledContext = React.useContext(DisabledContext);
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
  const options = React.useMemo(() => ({ weekStartsOn }), [weekStartsOn]);

  const getInputText = React.useCallback(
    (val: Date | null) => weekFormatText(val, format, options),
    [format, options]
  );

  const getSelectedValue = React.useCallback(
    val => getSelectedValueWithDate(val, generateDate, options),
    [options]
  );

  const getCallbackValue = React.useCallback(
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
