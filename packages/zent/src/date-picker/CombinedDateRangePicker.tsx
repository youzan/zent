import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';

import CombinedPicker from './components/CombinedPickerBase';
import CombinedDatePanel from './panels/combined-date-range-panel';

import PickerContext from './context/PickerContext';
import { generateDateConfig } from './utils/dateUtils';
import { IRangeProps, IGenerateDateConfig, IShowTime } from './types';
import { formatTextRange } from './utils/formatInputText';

const generateDate: IGenerateDateConfig = generateDateConfig.date;

const PickerContextProvider = PickerContext.Provider;

export interface ICombinedDateRangePickerProps {
  showTime?: IShowTime<string[]>;
}
const DefaultCombinedDateRangeProps: Partial<IRangeProps> = {
  format: 'YYYY-MM-DD',
  valueType: 'string',
};

export const CombinedDateRangePicker: React.FC<IRangeProps> = props => {
  const { placeholder, format } = props;
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
