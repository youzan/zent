import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import Checkbox from '../../checkbox';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormCheckboxWrapProps {
  value: boolean;
}

class CheckboxWrap extends Component<IFormCheckboxWrapProps> {
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
