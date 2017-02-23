import React from 'react';
import Radio from 'zent-radio';
import getControlGroup from '../getControlGroup';
import unkownProps from '../unkownProps';
import omit from 'zent-utils/lodash/omit';

const RadioGroup = Radio.Group;
const RadioGroupField = getControlGroup(props => {
  const passableProps = omit(props, unkownProps);
  return <RadioGroup className="zent-form__radio-group" {...passableProps} />;
});

export default RadioGroupField;
