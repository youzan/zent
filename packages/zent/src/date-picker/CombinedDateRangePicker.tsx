import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import PickerContext from './context/PickerContext';

import CombinedPicker from './components/CombinedPickerBase';
import CombinedDatePanel from './panels/combined-date-range-panel';
import {
  setDate,
  getDate,
  addDays,
  isSameDay,
  startOfDay,
  endOfDay,
  endOfMonth,
} from 'date-fns';

import {
  IDatePickerCommonProps,
  IGenerateDateConfig,
  SingleDate,
  IValueType,
} from './types';

const generateDateConfig: IGenerateDateConfig = {
  set: setDate,
  get: getDate,
  offsetDate: addDays,
  isSame: isSameDay,
  startDate: startOfDay,
  endDate: endOfDay,
  circleEndDate: endOfMonth,
};

const PickerContextProvider = PickerContext.Provider;

interface ICombinedDateRangeProps
  extends IDatePickerCommonProps<[SingleDate, SingleDate]> {
  placeholder?: string[];
  showTime?: boolean;
  width?: number;
}
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
            generateDateConfig={generateDateConfig}
            {...DefaultCombinedDateRangeProps}
            {...props}
            placeholder={placeholder || [i18n.start, i18n.end]}
            PanelComponent={CombinedDatePanel}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
export default CombinedDateRangePicker;
