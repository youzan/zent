import * as React from 'react';
import { BaseGridInnerColumnsType } from './types';

export interface IGridColGroupProps<Data> {
  columns: Array<BaseGridInnerColumnsType>;
}

function ColGroup<Data>({ columns }: IGridColGroupProps<Data>) {
  const cols = React.useMemo(() => {
    return columns.map((column, index) => {
      const width =
        typeof column.width === 'number' ? `${column.width}px` : column.width;
      return (
        <col key={column.key || index} style={{ width, minWidth: width }} />
      );
    });
  }, [columns]);

  return <colgroup>{cols}</colgroup>;
}

export default ColGroup;
