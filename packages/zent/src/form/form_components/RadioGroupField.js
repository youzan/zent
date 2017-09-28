import React, { Component } from 'react';
import Radio from 'radio';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

const RadioGroup = Radio.Group;

class RadioGroupWrap extends Component {
  render() {
    const passableProps = omit(this.props, unknownProps);
    return <RadioGroup className="zent-form__radio-group" {...passableProps} />;
  }
}

const RadioGroupField = getControlGroup(RadioGroupWrap);

export default RadioGroupField;
