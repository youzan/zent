import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import QuarterPicker from '../../datetimepicker/QuarterPicker';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormQuarterPickerWrapProps {
  dateFormat?: string;
}

class QuarterPickerWrap extends Component<IFormQuarterPickerWrapProps> {
  render() {
    const { dateFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['dateFormat']);
    return <QuarterPicker {...passableProps} format={dateFormat} />;
  }
}
const QuarterPickerField = getControlGroup(QuarterPickerWrap);

export default QuarterPickerField;
