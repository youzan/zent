import React from 'react';
import Input from 'input';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';
import omit from 'lodash/omit';

const InputWrap = ({ type = 'text', ...rest }) => {
  const passableProps = omit(rest, unknownProps);
  return <Input {...passableProps} type={type} />;
};
const InputField = getControlGroup(InputWrap);

export default InputField;
