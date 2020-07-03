import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import PickerContext from './context/PickerContext';

import SinglePicker from './components/SinglePickerBase';
import QuarterPanel from './panels/quarter-panel';

import { getCallbackValueRangeWithDate } from './utils/getValueInSinglePicker';
import { generateDateConfig } from './utils/dateUtils';
import { quarterFormatText } from './utils/formatInputText';
import { ISingleProps, IGenerateDateConfig } from './types';

const generateDate: IGenerateDateConfig = generateDateConfig.quarter;
const PickerContextProvider = PickerContext.Provider;

export interface IQuarterPickerProps extends ISingleProps {}

const DefaultQuarterPickerProps: Partial<IQuarterPickerProps> = {
  format: 'YYYY-MM',
  valueType: 'string',
};
export const QuarterPicker: React.FC<IQuarterPickerProps> = props => {
  const { format, placeholder, valueType } = props;

  const getInputText = React.useCallback(
    i18n => val => quarterFormatText(val, i18n),
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
            getInputText: getInputText(i18n),
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
