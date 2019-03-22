import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import Checkbox from '../../checkbox';
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
