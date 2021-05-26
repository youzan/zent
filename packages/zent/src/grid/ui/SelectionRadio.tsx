import * as React from 'react';
import Radio, { IRadioProps } from '../../radio';
import { IGridInnerSelectionProps } from '../types';

interface IGridInnerSelectionRadioProps<Data>
  extends IGridInnerSelectionProps<Data, IRadioProps<unknown>['onChange']> {
  toggleAllRowsSelected?: (value: boolean) => void;
}

export default function SelectionCheckbox<Data>(
  props: IGridInnerSelectionRadioProps<Data>
) {
  const {
    onChange,
    toggleAllRowsSelected,
    onSelect,
    record,
    rowKey,
    render,
    rowIndex,
  } = props;

  const handleOnChange = React.useCallback(
    rest => {
      toggleAllRowsSelected && toggleAllRowsSelected(false);
      onChange(rest);
      onSelect([record[rowKey]], [record], record);
    },
    [onChange, toggleAllRowsSelected, onSelect, record, rowKey]
  );

  if (typeof render === 'function') {
    return <>{render(record, rowIndex)}</>;
  }

  return <Radio {...props} onChange={handleOnChange} />;
}
