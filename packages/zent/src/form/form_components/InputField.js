import React from 'react';
import Input from 'input';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

const InputWrap = ({ type = 'text', ...rest }) => {
  const passableProps = omit(rest, unknownProps);
  return <Input {...passableProps} type={type} />;
};
const InputField = getControlGroup(InputWrap);

export default InputField;
