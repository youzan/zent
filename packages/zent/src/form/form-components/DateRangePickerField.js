import React, { Component } from 'react';
import DateRangePicker from 'datetimepicker/DateRangePicker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class DateRangePickerWrap extends Component {
  render() {
    const { wrappedFormat } = this.props;
    const passableProps = omit(this.props, unknownProps);
    return <DateRangePicker {...passableProps} format={wrappedFormat} />;
  }
}
const DateRangePickerField = getControlGroup(DateRangePickerWrap);

export default DateRangePickerField;
