import React from 'react';
import Radio from 'zent-radio';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';
import omit from 'zent-utils/lodash/omit';

const RadioGroup = Radio.Group;
const RadioGroupField = getControlGroup(props => {
  const passableProps = omit(props, unknownProps);
  return <RadioGroup className="zent-form__radio-group" {...passableProps} />;
});

export default RadioGroupField;
