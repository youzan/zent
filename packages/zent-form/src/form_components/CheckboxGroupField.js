import React from 'react';
import Checkbox from 'zent-checkbox';
import getControlGroup from '../getControlGroup';

const CheckboxGroup = Checkbox.Group;
const CheckboxGroupField = getControlGroup(props => {
  return <CheckboxGroup className="zent-form__checkbox-group" {...props} />;
});

export default CheckboxGroupField;
