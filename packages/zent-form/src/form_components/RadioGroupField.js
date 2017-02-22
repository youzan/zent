import React from 'react';
import Radio from 'zent-radio';
import getControlGroup from '../getControlGroup';

const RadioGroup = Radio.Group;
const RadioGroupField = getControlGroup(props => {
  return <RadioGroup className="zent-form__radio-group" {...props} />;
});

export default RadioGroupField;
