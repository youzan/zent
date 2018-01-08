import React, { Component } from 'react';
import Checkbox from 'checkbox';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

const CheckboxGroup = Checkbox.Group;

class CheckboxGroupWrap extends Component {
  render() {
    const passableProps = omit(this.props, unknownProps);
    return (
      <CheckboxGroup className="zent-form__checkbox-group" {...passableProps} />
    );
  }
}

const CheckboxGroupField = getControlGroup(CheckboxGroupWrap);

export default CheckboxGroupField;
