import React from 'react';
import ColorPicker from 'colorpicker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

const ColorPickerWrap = props => {
  const passableProps = omit(props, unknownProps);
  return <ColorPicker {...passableProps} color={props.value} />;
};
const ColorPickerField = getControlGroup(ColorPickerWrap);

export default ColorPickerField;
