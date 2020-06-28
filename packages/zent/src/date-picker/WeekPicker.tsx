import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import PickerContext from './context/PickerContext';
const PickerContextProvider = PickerContext.Provider;

import SinglePicker from './components/SinglePickerBase';
import WeekPanel from './panels/week-panel';

import {
  getSelectedValueWithDate,
  getCallbackValueRangeWithDate,
} from './utils/getValueInSinglePicker';
import { generateDateConfig } from './utils/dateUtils';
import { weekFormatText } from './utils/formatInputText';

import {
  IDatePickerCommonProps,
  IGenerateDateConfig,
  WeekStartsOnMap,
  IWeekStartsOnKey,
  IValueType,
} from './types';

const generateDate: IGenerateDateConfig = generateDateConfig.week;

const DefaultWeekPickerProps = {
  format: 'YYYY-MM-DD',
  valueType: 'string' as IValueType,
  weekStartsOn: 'Monday' as IWeekStartsOnKey,
};

export interface IWeekPickerProps extends IDatePickerCommonProps {
  placeholder?: string;
  weekStartsOn?: IWeekStartsOnKey;
}

export const WeekPicker: React.FC<IWeekPickerProps> = props => {
  const { format, valueType, placeholder, weekStartsOn } = props;

  // generate week-date method's option
  const options = React.useMemo(
    () => ({ weekStartsOn: WeekStartsOnMap[weekStartsOn] }),
    [weekStartsOn]
  );

  const getInputText = React.useCallback(
    (val, i18n) => weekFormatText(val, i18n, format, options),
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
            {...props}
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
