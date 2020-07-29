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
import { DATE_FORMAT } from './constants';
import {
  ISingleProps,
  IGenerateDateConfig,
  WeekStartsOnMap,
  IWeekOption,
  RangeDate,
} from './types';

const PickerContextProvider = PickerContext.Provider;
const generateDate: IGenerateDateConfig = dateConfig.week;

export interface IWeekPickerProps
  extends IWeekOption,
    Omit<ISingleProps, 'value' | 'defaultDate'> {
  value?: RangeDate;
  defaultDate?: RangeDate;
}
export { WeekStartsOnMap };
const DefaultWeekPickerProps: Partial<IWeekPickerProps> = {
  format: DATE_FORMAT,
  valueType: 'string',
  weekStartsOn: WeekStartsOnMap.Monday,
};

export const WeekPicker: React.FC<IWeekPickerProps> = ({
  value,
  defaultDate,
  disabled,
  ...restProps
}) => {
  const { format, valueType, placeholder, weekStartsOn } = restProps;
  const disabledContext = React.useContext(DisabledContext);

  // generate week-date method's option
  const options = React.useMemo(() => ({ weekStartsOn }), [weekStartsOn]);

  const getInputText = React.useCallback(
    val => weekFormatText(val, format, options),
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
            disabled={disabledContext.value || disabled}
            seperator={i18n.to}
            placeholder={placeholder || i18n.week}
            PanelComponent={WeekPanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
WeekPicker.defaultProps = DefaultWeekPickerProps;
export default WeekPicker;
