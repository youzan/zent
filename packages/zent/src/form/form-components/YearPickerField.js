import React, { Component } from 'react';
import YearPicker from 'datetimepicker/YearPicker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class YearPickerWrap extends Component {
  render() {
    const { dateFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['dateFormat']);
    return <YearPicker {...passableProps} format={dateFormat} />;
  }
}
const YearPickerField = getControlGroup(YearPickerWrap);

export default YearPickerField;
