import * as React from 'react';
import { II18nLocaleTimePicker } from '../../i18n';
import { IGenerateDateConfig, SingleDate, RangeDate } from '../types';

export interface IPickerContextProps {
  i18n: II18nLocaleTimePicker;
  // single picker
  generateDate?: IGenerateDateConfig;
  getSelectedValue?: (val: Date) => Date;
  getCallbackValue?: (val: Date | Date[]) => SingleDate | RangeDate;
  getInputText?: (val: Date | [Date, Date]) => string | string[];

  // range picker
  getStartCustomProps?: (val: [Date, Date]) => any;
  getEndCustomProps?: (val: [Date, Date]) => any;
}

const PickerContext = React.createContext<IPickerContextProps | null>(null);

export default PickerContext;
