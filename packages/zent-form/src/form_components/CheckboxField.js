import React from 'react';
import Checkbox from 'zent-checkbox';
import getControlGroup from '../getControlGroup';

const CheckboxField = getControlGroup(props => {
  return <Checkbox checked={props.value === true} {...props} />;
});

export default CheckboxField;
