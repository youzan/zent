import React, { Component } from 'react';
import Input from 'input';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class InputWrap extends Component {
  render() {
    const { type = 'text', ...rest } = this.props;
    const passableProps = omit(rest, unknownProps);
    return <Input {...passableProps} type={type} />;
  }
}

const InputField = getControlGroup(InputWrap);

export default InputField;
