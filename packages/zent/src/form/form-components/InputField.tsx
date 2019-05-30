import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import Input, { InputType } from '../../input';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormInputWrapProps {
  type?: InputType;
}

class InputWrap extends Component<IFormInputWrapProps> {
  render() {
    const { type = 'text', ...rest } = this.props;
    const passableProps = omit(rest, unknownProps);
    return <Input {...passableProps} type={type as any} />;
  }
}

const InputField = getControlGroup(InputWrap);

export default InputField;
