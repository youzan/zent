import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';

import CombinedPicker from './components/CombinedPickerBase';
import CombinedDatePanel from './panels/combined-date-range-panel';

import { DisabledContext } from '../disabled';
import PickerContext from './context/PickerContext';
import { dateConfig } from './utils/dateUtils';
import {
  IRangeProps,
  IGenerateDateConfig,
  IShowTime,
  DateNullTuple,
  StringTuple,
} from './types';
import { formatTextRange } from './utils/formatInputText';
import {
  INPUT_WIDTH,
  COMBINED_INPUT_WIDTH,
  DATE_FORMAT,
  defaultDatePickerCommonProps,
} from './constants';

const generateDate: IGenerateDateConfig = dateConfig.date;
const PickerContextProvider = PickerContext.Provider;

export interface ICombinedDateRangePickerProps extends IRangeProps {
  showTime?: IShowTime<StringTuple>;
}
const DefaultCombinedDateRangeProps = {
  format: DATE_FORMAT,
};

export const CombinedDateRangePicker: React.FC<ICombinedDateRangePickerProps> = props => {
  const disabledContext = React.useContext(DisabledContext);
  const propsRequired = {
    ...defaultDatePickerCommonProps,
    ...DefaultCombinedDateRangeProps,
    ...props,
  };

  const {
    placeholder,
    format,
    width,
    showTime,
    disabled = disabledContext.value,
  } = propsRequired;

  const getInputRangeText = React.useCallback(
    (val: DateNullTuple) => formatTextRange(val, format),
    [format]
  );

  return (
    <Receiver componentName="TimePicker">
      {(i18n: II18nLocaleTimePicker) => (
        <PickerContextProvider value={{ i18n, getInputRangeText }}>
          <CombinedPicker
            {...propsRequired}
            width={width ?? (!!showTime ? COMBINED_INPUT_WIDTH : INPUT_WIDTH)}
            disabled={disabled}
            generateDate={generateDate}
            seperator={i18n.to}
            placeholder={placeholder || [i18n.start, i18n.end]}
            PanelComponent={CombinedDatePanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
export default CombinedDateRangePicker;
