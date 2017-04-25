import React from 'react';
import Checkbox from 'zent-checkbox';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';
import omit from 'lodash/omit';

const CheckboxWrap = props => {
  const passableProps = omit(props, unknownProps);
  return <Checkbox className="zent-form__checkbox" checked={props.value === true} {...passableProps} />;
};
const CheckboxField = getControlGroup(CheckboxWrap);

export default CheckboxField;
