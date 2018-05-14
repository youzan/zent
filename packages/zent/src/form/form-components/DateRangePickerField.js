import React, { Component } from 'react';
import DateRangePicker from 'datetimepicker/DateRangePicker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class DateRangePickerWrap extends Component {
  render() {
    const { dateFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['dateFormat']);
    return <DateRangePicker {...passableProps} format={dateFormat} />;
  }
}
const DateRangePickerField = getControlGroup(DateRangePickerWrap);

export default DateRangePickerField;
