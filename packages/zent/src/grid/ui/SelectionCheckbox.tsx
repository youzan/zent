import * as React from 'react';
import Checkbox, { ICheckboxProps } from '../../checkbox';
import Pop from '../../pop';

interface IGridSelectionCheckboxProps<Data> {
  disabled?: boolean;
  reason?: boolean;
  onChange: ICheckboxProps<unknown>['onChange'];
  render: (data: Data, rowIndex: number) => React.ReactNode;
  row: any;
  onSelect?: (
    selectRowKey: string[],
    selectedRows: Data[],
    currentRow: Data
  ) => void;
}

export default function SelectionCheckbox<Data>(
  props: IGridSelectionCheckboxProps<Data>
) {
  const { disabled, reason, render, row } = props;
  if (render) {
    return <div>{render(row.original, row.index)}</div>;
  }
  if (disabled && reason) {
    return (
      <Pop trigger="hover" position="top-left" centerArrow content={reason}>
        <Checkbox disabled {...props} />
      </Pop>
    );
  }
  return <Checkbox {...props} />;
}
