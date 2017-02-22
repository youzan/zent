import React from 'react';
import Select, { SelectTrigger } from 'zent-select';
import getControlGroup from '../getControlGroup';

const SelectField = getControlGroup(({ trigger = SelectTrigger, ...props }) => {
  let wrappedOnChange = (e, selectedItem) => {
    props.onChange(selectedItem.value);
  };
  return <Select {...props} onChange={wrappedOnChange} trigger={trigger} />;
});

export default SelectField;
