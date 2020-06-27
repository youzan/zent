import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import PickerContext from './context/PickerContext';

import SinglePicker from './components/SinglePickerBase';
import QuarterPanel from './panels/quarter-panel';

import { getCallbackValueRangeWithDate } from './utils/getValueInSinglePicker';
import { generateDateConfig } from './utils/dateUtils';
import { quarterFormatText } from './utils/formatInputText';
import {
  IDatePickerCommonProps,
  IGenerateDateConfig,
  IValueType,
} from './types';

const generateDate: IGenerateDateConfig = generateDateConfig.quarter;
const PickerContextProvider = PickerContext.Provider;

interface IQuarterPickerProps extends IDatePickerCommonProps {
  placeholder?: string;
}

const DefaultQuarterPickerProps = {
  format: 'YYYY-MM',
  valueType: 'string' as IValueType,
};
export const QuarterPicker: React.FC<IQuarterPickerProps> = props => {
  const { format, placeholder, valueType } = props;

  const getInputText = React.useCallback(
    (val, i18n) => quarterFormatText(val, i18n),
    []
  );

  const getSelectedValue = React.useCallback(val => val, []);

  const getCallbackValue = React.useCallback(
    val => getCallbackValueRangeWithDate(val, valueType, format, generateDate),
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
            placeholder={placeholder || i18n.quarter}
            PanelComponent={QuarterPanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
QuarterPicker.defaultProps = DefaultQuarterPickerProps;
export default QuarterPicker;
