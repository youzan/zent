import React, { Component } from 'react';
import MonthPicker from 'datetimepicker/MonthPicker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class MonthPickerWrap extends Component {
  render() {
    const { dateFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['dateFormat']);
    return <MonthPicker {...passableProps} format={dateFormat} />;
  }
}
const MonthPickerField = getControlGroup(MonthPickerWrap);

export default MonthPickerField;
