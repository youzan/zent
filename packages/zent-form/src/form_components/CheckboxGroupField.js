import React from 'react';
import Checkbox from 'zent-checkbox';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';
import omit from 'zent-utils/lodash/omit';

const CheckboxGroup = Checkbox.Group;
const CheckboxGroupField = getControlGroup(props => {
  const passableProps = omit(props, unknownProps);
  return <CheckboxGroup className="zent-form__checkbox-group" {...passableProps} />;
});

export default CheckboxGroupField;
