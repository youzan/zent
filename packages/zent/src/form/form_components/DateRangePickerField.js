import React from 'react';
import DateRangePicker from 'datetimepicker/DateRangePicker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

const DateRangePickerWrap = props => {
  const passableProps = omit(props, unknownProps);
  return <DateRangePicker {...passableProps} />;
};
const DateRangePickerField = getControlGroup(DateRangePickerWrap);

export default DateRangePickerField;
