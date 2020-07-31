import * as React from 'react';
import { II18nLocaleTimePicker } from '../../i18n';
import { TimePicker } from '../../i18n/default';

import {
  IGenerateDateConfig,
  SingleDate,
  RangeDate,
  DateNullArray,
  StringArray,
} from '../types';

export interface IPickerContextProps {
  i18n: II18nLocaleTimePicker;
  // single picker
  generateDate?: IGenerateDateConfig;
  getSelectedValue?: (val: Date) => Date | null;
  getCallbackValue?: (val: Date) => SingleDate | RangeDate | null;
  getInputText?: (val: Date | null) => string | StringArray;

  // range picker
  getCallbackRangeValue?: (val: DateNullArray) => RangeDate | null;
  getInputRangeText?: (val: DateNullArray) => StringArray;
}

const PickerContext = React.createContext<IPickerContextProps>({
  i18n: TimePicker(),
});

export default PickerContext;
