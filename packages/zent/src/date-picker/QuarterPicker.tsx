import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import SinglePicker from './components/SinglePickerBase';
import QuarterPanel from './panels/quarter-panel';

import PickerContext from './context/PickerContext';
import { DisabledContext } from '../disabled';
import { getCallbackValueRangeWithDate } from './utils/getValueInSinglePicker';
import { dateConfig } from './utils/dateUtils';
import { quarterFormatText } from './utils/formatInputText';
import { ISingleSepcialProps, IGenerateDateConfig } from './types';
import { MONTH_FORMAT, defaultDatePickerCommonProps } from './constants';

const generateDate: IGenerateDateConfig = dateConfig.quarter;
const PickerContextProvider = PickerContext.Provider;

export interface IQuarterPickerProps extends ISingleSepcialProps {}

const DefaultQuarterPickerProps = {
  format: MONTH_FORMAT,
};

export const QuarterPicker: React.FC<IQuarterPickerProps> = props => {
  const disabledContext = React.useContext(DisabledContext);
  const propsRequired = {
    ...defaultDatePickerCommonProps,
    ...DefaultQuarterPickerProps,
    ...props,
  };

  const {
    value,
    defaultDate,
    disabled = disabledContext.value,
    placeholder,
    ...restProps
  } = propsRequired;
  const { format, valueType } = restProps;

  const getInputText = React.useCallback(
    i18n => (val: Date | null) => quarterFormatText(val, i18n),
    []
  );

  const getSelectedValue = React.useCallback(val => val, []);

  const getCallbackValue = React.useCallback(
    (val: Date) =>
      getCallbackValueRangeWithDate(val, valueType, format, generateDate),
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
            {...restProps}
            value={Array.isArray(value) ? value[0] : value}
            defaultDate={
              Array.isArray(defaultDate) ? defaultDate[0] : defaultDate
            }
            disabled={disabled}
            placeholder={placeholder || i18n.quarter}
            PanelComponent={QuarterPanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
export default QuarterPicker;
