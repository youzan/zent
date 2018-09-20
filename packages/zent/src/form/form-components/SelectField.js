import React, { Component } from 'react';
import Select, { SelectTrigger } from 'select';
import omit from 'lodash/omit';

import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

class SelectWrap extends Component {
  onChange = (e, selectedItem) => {
    const { tags, value, onChange } = this.props;
    const selectedValue = selectedItem.value;
    if (tags) {
      const tagsValue = value || [];
      if (tagsValue.indexOf(selectedValue) === -1) {
        onChange(tagsValue.concat(selectedValue));
      }
      return;
    }
    onChange(selectedValue);
  };

  onDelete = deletedItem => {
    const { value, onChange } = this.props;
    onChange(value.filter(selectValue => selectValue !== deletedItem.value));
  };

  render() {
    const { trigger = SelectTrigger, ...props } = this.props;
    const passableProps = omit(props, unknownProps);
    return (
      <Select
        {...passableProps}
        onChange={this.onChange}
        onDelete={this.onDelete}
        trigger={trigger}
      />
    );
  }
}

const SelectField = getControlGroup(SelectWrap);

export default SelectField;
