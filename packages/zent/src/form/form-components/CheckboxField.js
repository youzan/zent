import React, { Component } from 'react';
import Checkbox from 'checkbox';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class CheckboxWrap extends Component {
  render() {
    const passableProps = omit(this.props, unknownProps);
    return (
      <Checkbox
        className="zent-form__checkbox"
        checked={this.props.value === true}
        {...passableProps}
      />
    );
  }
}

const CheckboxField = getControlGroup(CheckboxWrap);

export default CheckboxField;
