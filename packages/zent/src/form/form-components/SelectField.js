import React, { Component } from 'react';
import Select, { SelectTrigger } from 'select';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class SelectWrap extends Component {
  render() {
    const { trigger = SelectTrigger, ...props } = this.props;
    const passableProps = omit(props, unknownProps);
    const wrappedOnChange = (e, selectedItem) => {
      props.onChange(selectedItem.value);
    };
    return (
      <Select {...passableProps} onChange={wrappedOnChange} trigger={trigger} />
    );
  }
}

const SelectField = getControlGroup(SelectWrap);

export default SelectField;
