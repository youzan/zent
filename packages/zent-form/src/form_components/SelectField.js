import React from 'react';
import Select, { SelectTrigger } from 'zent-select';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';
import omit from 'zent-utils/lodash/omit';

const SelectField = getControlGroup(({ trigger = SelectTrigger, ...props }) => {
  const passableProps = omit(props, unknownProps);
  const wrappedOnChange = (e, selectedItem) => {
    props.onChange(selectedItem.value);
  };
  return <Select {...passableProps} onChange={wrappedOnChange} trigger={trigger} />;
});

export default SelectField;
