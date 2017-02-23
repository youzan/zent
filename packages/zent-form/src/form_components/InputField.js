import React from 'react';
import Input from 'zent-input';
import getControlGroup from '../getControlGroup';
import unkownProps from '../unkownProps';
import omit from 'zent-utils/lodash/omit';

const InputField = getControlGroup(({ type = 'text', ...rest }) => {
  const passableProps = omit(rest, unkownProps);
  return <Input {...passableProps} type={type} />;
});

export default InputField;
