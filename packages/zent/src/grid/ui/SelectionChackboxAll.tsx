import * as React from 'react';
import Checkbox, { ICheckboxProps } from '../../checkbox';
import { IGridSelection } from '../types';

interface IGridSelectionCheckboxProps<Data> {
  disabled?: boolean;
  onChange?: ICheckboxProps<unknown>['onChange'];
  render?: (data: Data, rowIndex: number | string) => React.ReactNode;
  header: any;
  selection: IGridSelection<Data>;
}

export default function SelectionCheckboxAll<Data>(
  props: IGridSelectionCheckboxProps<Data>
) {
  const { header, selection, onChange } = props;
  const { onSelect, getCheckboxProps } = selection;
  const { rows } = header;

  const [checked, setChecked] = React.useState(false);

  const disabled = React.useMemo(
    () =>
      header.rows.every(
        item => getCheckboxProps && getCheckboxProps(item.original).disabled
      ),
    [header, getCheckboxProps]
  );

  const indeterminate = React.useMemo(() => {
    return rows.some(item => item.isSelected);
  }, [rows]);

  const handleOnSelectAllChange = React.useCallback(
    e => {
      setChecked(e.target.checked);
      onChange(e);
      const { checked } = e.target;
      const selectedRowKeys = [];
      const selectedRows = [];
      if (checked) {
        for (let i = 0; i < rows.length; i++) {
          const originalRow = rows[i].original;
          const { disabled } = getCheckboxProps
            ? getCheckboxProps(originalRow)
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
    [rows, onSelect, onChange, getCheckboxProps]
  );

  return (
    <Checkbox
      {...props}
      disabled={disabled}
      checked={checked}
      onChange={handleOnSelectAllChange}
      indeterminate={indeterminate && checked ? false : indeterminate}
    />
  );
}
