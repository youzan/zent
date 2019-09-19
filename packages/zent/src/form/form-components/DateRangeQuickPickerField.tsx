import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import DateRangeQuickPicker, {
  DateRangeQuickPickerChangeCallback,
  DateRangeQuickPickerPresetValue,
} from '../../date-range-quick-picker';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormDateRangeQuickPickerWrapProps {
  dateFormat?: string;
  onChange: DateRangeQuickPickerChangeCallback;
}

interface IFormDateRangeQuickPickerWrapState {
  chosenDays?: DateRangeQuickPickerPresetValue;
}

class DateRangeQuickPickerWrap extends Component<
  IFormDateRangeQuickPickerWrapProps,
  IFormDateRangeQuickPickerWrapState
> {
  state: IFormDateRangeQuickPickerWrapState = {};

  render() {
    const { dateFormat } = this.props;
    const { chosenDays } = this.state;
    const passableProps: any = omit(this.props, unknownProps, ['dateFormat']);
    return (
      <DateRangeQuickPicker
        {...passableProps}
        format={dateFormat}
        chooseDays={chosenDays}
        onChange={this.onChange}
      />
    );
  }

  onChange = (value, chosenDays) => {
    this.setState({
      chosenDays,
    });
    this.props.onChange(value);
  };
}

const DateRangeQuickPickerField = getControlGroup(DateRangeQuickPickerWrap);

export default DateRangeQuickPickerField;
