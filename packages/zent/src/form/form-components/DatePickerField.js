import React, { Component } from 'react';
import DatePicker from 'datetimepicker/DatePicker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class DatePickerWrap extends Component {
  render() {
    const { dateFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['dateFormat']);
    return <DatePicker {...passableProps} format={dateFormat} />;
  }
}
const DatePickerField = getControlGroup(DatePickerWrap);

export default DatePickerField;
