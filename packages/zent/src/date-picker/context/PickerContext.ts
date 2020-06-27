import * as React from 'react';
import { II18nLocaleTimePicker } from '../../i18n';
import { IGenerateDateConfig } from '../types';

export interface IPickerContextProps {
  i18n: II18nLocaleTimePicker;
  // single picker
  generateDate?: IGenerateDateConfig;
  getSelectedValue?: (val: Date) => Date;
  getCallbackValue?: (val: Date) => Date | [Date, Date];
  getInputText?: (val: Date, i18n: II18nLocaleTimePicker) => string;
}

const PickerContext = React.createContext<IPickerContextProps | null>(null);

export default PickerContext;
