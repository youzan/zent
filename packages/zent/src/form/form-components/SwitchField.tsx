import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import Switch from '../../switch';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormSwitchWrapProps {
  value: boolean;
}

class SwitchWrap extends Component<IFormSwitchWrapProps> {
  render() {
    const passableProps = omit(this.props, unknownProps);
    return (
      <Switch {...passableProps} size="small" checked={this.props.value} />
    );
  }
}
const SwitchField = getControlGroup(SwitchWrap);

export default SwitchField;
