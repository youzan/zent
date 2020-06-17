import { createContext } from 'react';
import { II18nLocaleTimePicker } from '../../i18n';

export interface II18nLocaleContext {
  i18n: II18nLocaleTimePicker;
  onHover?: (val: Date) => any;
}

export default createContext<II18nLocaleContext | null>(null);
