import React from 'react';
import Checkbox from 'zent-checkbox';
import getControlGroup from '../getControlGroup';
import unkownProps from '../unkownProps';
import omit from 'zent-utils/lodash/omit';

const CheckboxField = getControlGroup(props => {
  const passableProps = omit(props, unkownProps);
  return <Checkbox className="zent-form__checkbox" checked={props.value === true} {...passableProps} />;
});

export default CheckboxField;
