import React, { Component } from 'react';
import DateRangeQuickPicker from 'date-range-quick-picker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class DateRangeQuickPickerWrap extends Component {
  render() {
    const { dateFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['dateFormat']);
    return <DateRangeQuickPicker {...passableProps} format={dateFormat} />;
  }
}

const DateRangeQuickPickerField = getControlGroup(DateRangeQuickPickerWrap);

export default DateRangeQuickPickerField;
