import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';

import CombinedPicker from './components/CombinedPickerBase';
import CombinedDatePanel from './panels/combined-date-range-panel';

import { DisabledContext } from '../disabled';
import PickerContext from './context/PickerContext';
import { dateConfig } from './utils/dateUtils';
import { IRangeProps, IGenerateDateConfig, IShowTime } from './types';
import { formatTextRange } from './utils/formatInputText';
import { INPUT_WIDTH, COMBINED_INPUT_WIDTH, DATE_FORMAT } from './constants';

const generateDate: IGenerateDateConfig = dateConfig.date;

const PickerContextProvider = PickerContext.Provider;

export interface ICombinedDateRangePickerProps extends IRangeProps {
  showTime?: IShowTime<string[]>;
}
const DefaultCombinedDateRangeProps: Partial<ICombinedDateRangePickerProps> = {
  format: DATE_FORMAT,
  valueType: 'string',
};

export const CombinedDateRangePicker: React.FC<ICombinedDateRangePickerProps> = props => {
  const { placeholder, format, width, showTime, disabled } = props;
  const disabledContext = React.useContext(DisabledContext);

  const getInputText = React.useCallback(
    (val: [Date, Date]) => formatTextRange(val, format),
    [format]
  );
  return (
    <Receiver componentName="TimePicker">
      {(i18n: II18nLocaleTimePicker) => (
        <PickerContextProvider value={{ i18n, getInputText }}>
          <CombinedPicker
            {...props}
            width={width ?? (!!showTime ? COMBINED_INPUT_WIDTH : INPUT_WIDTH)}
            disabled={disabledContext.value || disabled}
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
CombinedDateRangePicker.defaultProps = DefaultCombinedDateRangeProps;
export default CombinedDateRangePicker;
