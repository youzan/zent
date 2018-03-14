import React, { PureComponent, Component } from 'react';
import ColorPicker from 'colorpicker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class ColorPickerWrap extends (PureComponent || Component) {
  render() {
    const passableProps = omit(this.props, unknownProps);
    return <ColorPicker {...passableProps} color={this.props.value} />;
  }
}
const ColorPickerField = getControlGroup(ColorPickerWrap);

export default ColorPickerField;
