import { Component } from 'react';
import * as React from 'react';
import omit from 'lodash-es/omit';

import Select, { SelectTrigger } from '../../select';
import getControlGroup from '../getControlGroup';
import unknownProps from '../unknownProps';

export interface IFormSelectWrapProps {
  trigger?: any;
  onChange(value: any): void;
  data: unknown[];
}

class SelectWrap extends Component<IFormSelectWrapProps> {
  render() {
    const { trigger = SelectTrigger, ...props } = this.props;
    const passableProps = omit(props, unknownProps) as { data: unknown[] };
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
