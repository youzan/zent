import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import NumberInput from '../../number-input';
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
