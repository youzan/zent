import React from 'react';

export default React.createContext({
  value: [],
  disabled: false,
  readOnly: false,
  isValueEqual: (a, b) => a === b,
  onRadioChange: null,
});
