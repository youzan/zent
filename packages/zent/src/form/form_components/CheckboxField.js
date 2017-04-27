import React from 'react';
import Checkbox from 'checkbox';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

const CheckboxWrap = props => {
  const passableProps = omit(props, unknownProps);
  return (
    <Checkbox
      className="zent-form__checkbox"
      checked={props.value === true}
      {...passableProps}
    />
  );
};
const CheckboxField = getControlGroup(CheckboxWrap);

export default CheckboxField;
