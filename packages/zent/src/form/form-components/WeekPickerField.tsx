import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import WeekPicker from '../../datetimepicker/WeekPicker';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormWeekPickerWrapProps {
  dateFormat: string;
}

class WeekPickerWrap extends Component<IFormWeekPickerWrapProps> {
  render() {
    const { dateFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['dateFormat']);
    return <WeekPicker {...passableProps} format={dateFormat} />;
  }
}
const WeekPickerField = getControlGroup(WeekPickerWrap);

export default WeekPickerField;
