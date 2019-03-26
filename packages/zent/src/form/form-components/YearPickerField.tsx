import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import YearPicker from '../../datetimepicker/YearPicker';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormYearPickerWrapProps {
  dateFormat: string;
}

class YearPickerWrap extends Component<IFormYearPickerWrapProps> {
  render() {
    const { dateFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['dateFormat']);
    return <YearPicker {...passableProps} format={dateFormat} />;
  }
}
const YearPickerField = getControlGroup(YearPickerWrap);

export default YearPickerField;
