import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import SinglePicker from './components/SinglePickerBase';
import QuarterPanel from './panels/quarter-panel';

import PickerContext from './context/PickerContext';
import { DisabledContext } from '../disabled';
import { getCallbackValueRangeWithDate } from './utils/getValueInSinglePicker';
import { dateConfig } from './utils/dateUtils';
import { quarterFormatText } from './utils/formatInputText';
import { ISingleProps, IGenerateDateConfig, RangeDate } from './types';
import { MONTH_FORMAT } from './constants';

const generateDate: IGenerateDateConfig = dateConfig.quarter;
const PickerContextProvider = PickerContext.Provider;

export interface IQuarterPickerProps
  extends Omit<ISingleProps, 'value' | 'defaultDate'> {
  value?: RangeDate;
  defaultDate?: RangeDate;
}

const DefaultQuarterPickerProps: Partial<IQuarterPickerProps> = {
  format: MONTH_FORMAT,
  valueType: 'string',
};
export const QuarterPicker: React.FC<IQuarterPickerProps> = props => {
  const disabledContext = React.useContext(DisabledContext);
  const {
    value,
    defaultDate,
    disabled = disabledContext.value,
    ...restProps
  } = props;
  const { format, placeholder, valueType } = restProps;

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
QuarterPicker.defaultProps = DefaultQuarterPickerProps;
export default QuarterPicker;
