import * as React from 'react';
import Radio, { IRadioProps } from '../../radio';

interface IGridSelectionCheckboxProps<Data> {
  disabled?: boolean;
  rowIndex?: number | string;
  onChange: IRadioProps<unknown>['onChange'];
  render: (data: Data, rowIndex: number | string) => React.ReactNode;
  record: any;
  toggleAllRowsSelected?: (value: boolean) => void;
  onSelect?: (
    selectRowKey: string[],
    selectedRows: Data[],
    currentRow: Data
  ) => void;
}

export default function SelectionCheckbox<Data>(
  props: IGridSelectionCheckboxProps<Data>
) {
  const { onChange, toggleAllRowsSelected, onSelect, record } = props;

  const handleOnChange = React.useCallback(
    rest => {
      toggleAllRowsSelected && toggleAllRowsSelected(false);
      onChange(rest);
      onSelect([record.id], [record], record);
    },
    [onChange, toggleAllRowsSelected, onSelect, record]
  );

  return <Radio {...props} onChange={handleOnChange} />;
}
