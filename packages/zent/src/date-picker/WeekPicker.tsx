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
  ISingleProps,
  IGenerateDateConfig,
  WeekStartsOnMap,
  IWeekOption,
} from './types';

const generateDate: IGenerateDateConfig = generateDateConfig.week;

export interface IWeekPickerProps extends ISingleProps, IWeekOption {}
export { WeekStartsOnMap };
const DefaultWeekPickerProps: Partial<IWeekPickerProps> = {
  format: 'YYYY-MM-DD',
  valueType: 'string',
  weekStartsOn: WeekStartsOnMap.Monday,
};

export const WeekPicker: React.FC<IWeekPickerProps> = props => {
  const { format, valueType, placeholder, weekStartsOn } = props;

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
            {...props}
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
