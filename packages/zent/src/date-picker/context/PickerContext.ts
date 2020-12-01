import { createContext } from 'react';
import { II18nLocaleTimePicker } from '../../i18n';
import { TimePicker } from '../../i18n/default';

import {
  IGenerateDateConfig,
  SingleDate,
  RangeDate,
  DateNullTuple,
  StringTuple,
} from '../types';

export interface IPickerContextProps {
  i18n: II18nLocaleTimePicker;
  // single picker
  generateDate?: IGenerateDateConfig;
  getSelectedValue?: (val: Date) => Date | null;
  getCallbackValue?: (val: Date) => SingleDate | RangeDate | null;
  getInputText?: (val: Date | null) => string | StringTuple;

  // range picker
  autoComplete?: boolean;
  getCallbackRangeValue?: (val: DateNullTuple) => RangeDate | null;
  getInputRangeText?: (val: DateNullTuple) => StringTuple;
}

const PickerContext = createContext<IPickerContextProps>({
  i18n: TimePicker(),
});

export default PickerContext;
