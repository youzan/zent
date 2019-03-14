import { createContext } from 'react';
import eq from 'lodash-es/eq';

export default createContext({
  value: [],
  disabled: false,
  readOnly: false,
  isValueEqual: eq,
  onCheckboxChange: null,
});
