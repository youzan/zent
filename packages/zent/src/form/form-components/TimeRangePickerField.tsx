import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import TimeRangePicker from '../../datetimepicker/TimeRangePicker';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormTimeRangePickerWrapProps {
  timeFormat: string;
}

class TimeRangePickerWrap extends Component<IFormTimeRangePickerWrapProps> {
  render() {
    const { timeFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['timeFormat']);
    return <TimeRangePicker {...passableProps} format={timeFormat} />;
  }
}
const TimeRangePickerField = getControlGroup(TimeRangePickerWrap);

export default TimeRangePickerField;
