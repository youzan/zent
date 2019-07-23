import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import Radio from '../../radio';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

const RadioGroup = Radio.Group;

export interface IFormRadioGroupWrapProps {
  value: unknown;
}

class RadioGroupWrap extends Component<IFormRadioGroupWrapProps> {
  render() {
    const passableProps: any = omit(this.props, unknownProps);
    return <RadioGroup className="zent-form__radio-group" {...passableProps} />;
  }
}

const RadioGroupField = getControlGroup(RadioGroupWrap);

export default RadioGroupField;
