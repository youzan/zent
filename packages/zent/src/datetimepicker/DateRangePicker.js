import React from 'react';
import CombineDateRangePicker from './CombineDateRangePicker';
import SplitDateRangePicker from './SplitDateRangePicker';

export default function DateRangePicker(props) {
  const { type, ...pickerProps } = props;
  const Picker =
    type === 'combine' ? CombineDateRangePicker : SplitDateRangePicker;

  return <Picker {...pickerProps} />;
}

DateRangePicker.defaultProps = {
  type: 'combine'
};
