import React from 'react';
import Select, { SelectTrigger } from 'select';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

const SelectWrap = ({ trigger = SelectTrigger, ...props }) => {
  const passableProps = omit(props, unknownProps);
  const wrappedOnChange = (e, selectedItem) => {
    props.onChange(selectedItem.value);
  };
  return (
    <Select {...passableProps} onChange={wrappedOnChange} trigger={trigger} />
  );
};
const SelectField = getControlGroup(SelectWrap);

export default SelectField;
