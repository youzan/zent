import * as React from 'react';
import classnames from 'classnames';

import Cell from '../Cell';

import { IGridColumn, GridRowClassNameType } from '../types';

interface IGridBodyRowProps<Data> {
  columns: IGridColumn[];
  record: Data;
  prefix: string;
  rowIndex: number;
  onRowClick: (record, index: number, e: React.MouseEvent) => void;
  rowClassName?: GridRowClassNameType;
}

function BodyRow<Data>(props: IGridBodyRowProps<Data>) {
  const { columns, record, prefix, rowIndex, onRowClick, rowClassName } = props;
  const handleOnClick = (e: React.MouseEvent) => {
    onRowClick && onRowClick(record, rowIndex, e);
  };

  const innerRowClassName =
    typeof rowClassName === 'function'
      ? rowClassName(record, rowIndex)
      : rowClassName;

  return (
    <tr
      className={classnames(`${prefix}-grid-tr`, {
        [innerRowClassName]: !!rowClassName,
      })}
      onClick={handleOnClick}
    >
      {columns.map((column, index) => (
        <Cell
          column={column}
          record={record}
          prefix={prefix}
          rowIndex={rowIndex}
          colIndex={index}
          key={column.key || index}
          cellType="td"
        />
      ))}
    </tr>
  );
}

export default BodyRow;
