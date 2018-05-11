import React, { Component } from 'react';
import DateRangeQuickPicker from 'date-range-quick-picker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class DateRangeQuickPickerWrap extends Component {
  render() {
    const { wrappedFormat } = this.props;
    const passableProps = omit(this.props, unknownProps);
    return <DateRangeQuickPicker {...passableProps} format={wrappedFormat} />;
  }
}

const DateRangeQuickPickerField = getControlGroup(DateRangeQuickPickerWrap);

export default DateRangeQuickPickerField;
