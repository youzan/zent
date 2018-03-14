import React, { PureComponent, Component } from 'react';
import Switch from 'switch';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class SwitchWrap extends (PureComponent || Component) {
  render() {
    const passableProps = omit(this.props, unknownProps);
    return (
      <Switch {...passableProps} size="small" checked={this.props.value} />
    );
  }
}
const SwitchField = getControlGroup(SwitchWrap);

export default SwitchField;
