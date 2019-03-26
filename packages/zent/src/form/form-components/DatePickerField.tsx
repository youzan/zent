import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import DatePicker from '../../datetimepicker/DatePicker';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormDatePickerWrapProps {
  dateFormat?: string;
}

class DatePickerWrap extends Component<IFormDatePickerWrapProps> {
  render() {
    const { dateFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['dateFormat']);
    return <DatePicker {...passableProps} format={dateFormat} />;
  }
}
const DatePickerField = getControlGroup(DatePickerWrap);

export default DatePickerField;
