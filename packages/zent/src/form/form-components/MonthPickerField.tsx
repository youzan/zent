import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import MonthPicker from '../../datetimepicker/MonthPicker';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormMonthPickerWrapProps {
  dateFormat?: string;
}

class MonthPickerWrap extends Component<IFormMonthPickerWrapProps> {
  render() {
    const { dateFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['dateFormat']);
    return <MonthPicker {...passableProps} format={dateFormat} />;
  }
}
const MonthPickerField = getControlGroup(MonthPickerWrap);

export default MonthPickerField;
