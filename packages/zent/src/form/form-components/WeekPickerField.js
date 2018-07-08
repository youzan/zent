import React, { Component } from 'react';
import WeekPicker from 'datetimepicker/WeekPicker';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class WeekPickerWrap extends Component {
  render() {
    const { dateFormat } = this.props;
    const passableProps = omit(this.props, unknownProps, ['dateFormat']);
    return <WeekPicker {...passableProps} format={dateFormat} />;
  }
}
const WeekPickerField = getControlGroup(WeekPickerWrap);

export default WeekPickerField;
