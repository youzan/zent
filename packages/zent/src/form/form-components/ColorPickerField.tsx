import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import ColorPicker from '../../colorpicker';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormColorPickerWrapProps {
  value?: string;
}

class ColorPickerWrap extends Component<IFormColorPickerWrapProps> {
  render() {
    const passableProps = omit(this.props, unknownProps);
    return <ColorPicker {...passableProps} color={this.props.value} />;
  }
}
const ColorPickerField = getControlGroup(ColorPickerWrap);

export default ColorPickerField;
