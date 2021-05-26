import * as React from 'react';
import Checkbox from '../../checkbox';
import { IGridSelection, GridHeaderRowType } from '../types';

interface IGridSelectionCheckboxProps<Data> {
  disabled?: boolean;
  render?: (data: Data, rowIndex: number | string) => React.ReactNode;
  header?: GridHeaderRowType;
  selection: IGridSelection<Data>;
  indeterminate?: boolean;
  onChange: (e: any) => void;
}

export default function SelectionCheckboxAll<Data>(
  props: IGridSelectionCheckboxProps<Data>
) {
  const { header, selection } = props;
  const { onSelect, getCheckboxProps } = selection;
  const { rows = [] } = header || {};

  const handleOnSelectAllChange = React.useCallback(
    e => {
      const { checked } = e.target;
      props.header.toggleAllRowsSelected(checked);
      const selectedRowKeys = [];
      const selectedRows = [];
      if (checked) {
        for (let i = 0; i < rows.length; i++) {
          const originalRow = rows[i].original;
          const { disabled } = getCheckboxProps
            ? getCheckboxProps(originalRow as Data)
            : { disabled: false };
          if (!disabled) {
            selectedRowKeys.push(originalRow.id);
            selectedRows.push(originalRow);
          }
        }
      } else {
        onSelect([], [], null);
      }
      onSelect(selectedRowKeys, selectedRows, null);
    },
    [props.header, onSelect, rows, getCheckboxProps]
  );

  return <Checkbox {...props} onChange={handleOnSelectAllChange} />;
}
