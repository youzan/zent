import * as React from 'react';
import Checkbox from '../../checkbox';
import { TableToggleAllRowsSelectedProps } from 'react-table';

export default function SelectionCheckboxAll(
  props: TableToggleAllRowsSelectedProps
) {
  return <Checkbox {...props} />;
}
