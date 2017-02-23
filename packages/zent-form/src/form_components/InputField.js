import React from 'react';
import Input from 'zent-input';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';
import omit from 'zent-utils/lodash/omit';

const InputField = getControlGroup(({ type = 'text', ...rest }) => {
  const passableProps = omit(rest, unknownProps);
  return <Input {...passableProps} type={type} />;
});

export default InputField;
