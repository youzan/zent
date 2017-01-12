import React from 'react';
import Checkbox from '@youzan/zent-checkbox';
import getControlGroup from '../getControlGroup';

const CheckboxGroup = Checkbox.Group;
const CheckboxGroupField = getControlGroup(props => {
  return <CheckboxGroup {...props} />;
});

export default CheckboxGroupField;
