import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import DateRangePicker from '../../datetimepicker/DateRangePicker';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormDateRangePickerWrapProps {
  dateFormat?: string;
}

class DateRangePickerWrap extends Component<IFormDateRangePickerWrapProps> {
  render() {
    const { dateFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['dateFormat']);
    return <DateRangePicker {...passableProps} format={dateFormat} />;
  }
}
const DateRangePickerField = getControlGroup(DateRangePickerWrap);

export default DateRangePickerField;
