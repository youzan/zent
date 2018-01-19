import React from 'react';
import PropTypes from 'prop-types';
import CombineDateRangePicker from './CombineDateRangePicker';
import SplitDateRangePicker from './SplitDateRangePicker';

const pickerMap = {
  combine: CombineDateRangePicker,
  split: SplitDateRangePicker
};

export default function DateRangePicker(props) {
  const { type, ...pickerProps } = props;
  const Picker = pickerMap[type];

  return <Picker {...pickerProps} />;
}

DateRangePicker.defaultProps = {
  type: 'combine'
};

DateRangePicker.propTypes = {
  type: PropTypes.oneOf(['combine', 'split'])
};
