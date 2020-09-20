import * as React from 'react';
import { IGridColumn } from './types';

export interface IGridColGroupProps<Data> {
  columns: Array<IGridColumn<Data>>;
  originColumns: Array<IGridColumn<Data>>;
}

function ColGroup<Data>({ columns, originColumns }: IGridColGroupProps<Data>) {
  const cols = columns.map((column, index) => {
    const width =
      typeof column.width === 'number' ? `${column.width}px` : column.width;
    return <col key={column.key || index} style={{ width, minWidth: width }} />;
  });

  return <colgroup>{cols}</colgroup>;
}

export default ColGroup;
