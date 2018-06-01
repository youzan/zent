import React, { Component } from 'react';
import TimeRangePicker from 'datetimepicker/TimeRangePicker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class TimeRangePickerWrap extends Component {
  render() {
    const { timeFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['timeFormat']);
    return <TimeRangePicker {...passableProps} format={timeFormat} />;
  }
}
const TimeRangePickerField = getControlGroup(TimeRangePickerWrap);

export default TimeRangePickerField;
