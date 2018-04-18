import React, { Component, PureComponent } from 'react';
import DateRangeQuickPicker from 'date-range-quick-picker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class DateRangeQuickPickerWrap extends (PureComponent || Component) {
  render() {
    const passableProps = omit(this.props, unknownProps);
    return <DateRangeQuickPicker {...passableProps} />;
  }
}

const DateRangeQuickPickerField = getControlGroup(DateRangeQuickPickerWrap);

export default DateRangeQuickPickerField;
