import React from 'react';
import Select, { SelectTrigger } from 'zent-select';
import getControlGroup from '../getControlGroup';
import unkownProps from '../unkownProps';
import omit from 'zent-utils/lodash/omit';

const SelectField = getControlGroup(({ trigger = SelectTrigger, ...props }) => {
  const passableProps = omit(props, unkownProps);
  const wrappedOnChange = (e, selectedItem) => {
    props.onChange(selectedItem.value);
  };
  return <Select {...passableProps} onChange={wrappedOnChange} trigger={trigger} />;
});

export default SelectField;
