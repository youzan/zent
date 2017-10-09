import React from 'react';
import NumberInput from 'number-input';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

const NumberInputWrap = props => {
  const passableProps = omit(props, unknownProps);
  return <NumberInput {...passableProps} />;
};
const NumberInputField = getControlGroup(NumberInputWrap);

export default NumberInputField;
