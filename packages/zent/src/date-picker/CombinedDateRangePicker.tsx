import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';

import CombinedPicker from './components/CombinedPickerBase';
import CombinedDatePanel from './panels/combined-date-range-panel';

import PickerContext from './context/PickerContext';
import { generateDateConfig } from './utils/dateUtils';
import {
  ICombinedDateRangeProps,
  IGenerateDateConfig,
  IValueType,
} from './types';

const generateDate: IGenerateDateConfig = generateDateConfig.date;

const PickerContextProvider = PickerContext.Provider;

const DefaultCombinedDateRangeProps = {
  format: 'YYYY-MM-DD',
  valueType: 'string' as IValueType,
};

export const CombinedDateRangePicker: React.FC<ICombinedDateRangeProps> = props => {
  const { placeholder } = props;

  return (
    <Receiver componentName="TimePicker">
      {(i18n: II18nLocaleTimePicker) => (
        <PickerContextProvider value={{ i18n }}>
          <CombinedPicker
            {...props}
            generateDate={generateDate}
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
