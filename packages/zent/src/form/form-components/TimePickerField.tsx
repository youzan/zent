import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import TimePicker from '../../datetimepicker/TimePicker';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormTimePickerWrapProps {
  timeFormat: string;
}

class TimePickerWrap extends Component<IFormTimePickerWrapProps> {
  render() {
    const { timeFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['timeFormat']);
    return <TimePicker {...passableProps} format={timeFormat} />;
  }
}
const TimePickerField = getControlGroup(TimePickerWrap);

export default TimePickerField;
