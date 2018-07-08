import React, { Component } from 'react';
import QuarterPicker from 'datetimepicker/QuarterPicker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class QuarterPickerWrap extends Component {
  render() {
    const { dateFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['dateFormat']);
    return <QuarterPicker {...passableProps} format={dateFormat} />;
  }
}
const QuarterPickerField = getControlGroup(QuarterPickerWrap);

export default QuarterPickerField;
