import React, { PureComponent, Component } from 'react';
import DateRangePicker from 'datetimepicker/DateRangePicker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class DateRangePickerWrap extends (PureComponent || Component) {
  render() {
    const passableProps = omit(this.props, unknownProps);
    return <DateRangePicker {...passableProps} />;
  }
}
const DateRangePickerField = getControlGroup(DateRangePickerWrap);

export default DateRangePickerField;
