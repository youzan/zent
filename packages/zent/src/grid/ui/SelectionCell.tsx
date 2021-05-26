import * as React from 'react';
import SelectionCheckboxAll from '../components/SelectionCheckboxAll';
import SelectionCheckbox from '../components/SelectionCheckbox';
import SelectionRadio from '../components/SelectionRadio';

export function selectionCellRender(cell) {
  const cellProps = cell.getCellProps();
  const { isSingleSelect, render, row, ...restProps } = cellProps;
  if (typeof render === 'function') {
    return render(row.original, row.index);
  }
  return isSingleSelect ? (
    <SelectionRadio {...restProps} />
  ) : (
    <SelectionCheckbox {...restProps} />
  );
}

export function selectionHeadRender(header) {
  const { isSingleSelect, ...restProps } = header.getHeaderProps();
  if (isSingleSelect) {
    return <></>;
  }
  return <SelectionCheckboxAll {...restProps} />;
}
