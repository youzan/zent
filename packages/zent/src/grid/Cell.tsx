import * as React from 'react';
import classnames from 'classnames';

import { IGridColumn } from './types';
interface IGridCellProps<Data> {
  cellType: 'td' | 'th';
  record: Data;
  column: IGridColumn;
  rowIndex: number;
  colIndex: number;
  prefix: string;
}

function getCellChildNode({ cellType, record, column, rowIndex, colIndex }) {
  if (cellType === 'th') {
    return column.title;
  }

  if (typeof column.bodyRender === 'function') {
    return column.bodyRender(record, { row: rowIndex, col: colIndex });
  }

  return record[column.name];
}

function Cell<Data>(props: IGridCellProps<Data>) {
  const { cellType, prefix } = props;
  const Component = cellType;

  const childNode = getCellChildNode(props);

  const componentProps = React.useMemo(() => {
    const cls = classnames(`${prefix}-grid-${cellType}`);
    return {
      className: cls,
    };
  }, [prefix, cellType]);

  return <Component {...componentProps}>{childNode}</Component>;
}

export default Cell;
