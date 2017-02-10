import React from 'react';
import Input from 'zent-input';
import getControlGroup from '../getControlGroup';

const InputField = getControlGroup(({ type = 'text', ...passableProps }) => {
  return <Input {...passableProps} type={type} />;
});

export default InputField;
