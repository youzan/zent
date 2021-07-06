import { createContext } from 'react';

import * as defaultI18n from './default';
import { ILocaleData } from './locale';

export default createContext<ILocaleData>(defaultI18n);
