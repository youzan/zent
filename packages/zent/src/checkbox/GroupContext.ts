import { createContext } from 'react';

export default createContext({
  value: [],
  disabled: false,
  readOnly: false,
  isValueEqual: (a, b) => a === b,
  onCheckboxChange: null,
});
