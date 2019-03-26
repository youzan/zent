import React, { Component } from 'react';
import NumberInput from 'number-input';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class NumberInputWrap extends Component {
  render() {
    const passableProps = omit(this.props, unknownProps);
    return <NumberInput {...passableProps} />;
  }
}
const NumberInputField = getControlGroup(NumberInputWrap);

export default NumberInputField;
