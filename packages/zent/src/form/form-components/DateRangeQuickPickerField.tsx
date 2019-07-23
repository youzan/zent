import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import DateRangeQuickPicker, {
  DateRangeQuickPickerChangeCallback,
} from '../../date-range-quick-picker';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormDateRangeQuickPickerWrapProps {
  dateFormat?: string;
  onChange: DateRangeQuickPickerChangeCallback;
}

class DateRangeQuickPickerWrap extends Component<
  IFormDateRangeQuickPickerWrapProps
> {
  render() {
    const { dateFormat } = this.props;
    const passableProps: any = omit(this.props, unknownProps, ['dateFormat']);
    return <DateRangeQuickPicker {...passableProps} format={dateFormat} />;
  }
}

const DateRangeQuickPickerField = getControlGroup(DateRangeQuickPickerWrap);

export default DateRangeQuickPickerField;
