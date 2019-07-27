import * as React from 'react';
import { PureComponent } from 'react';
import forEach from 'lodash-es/forEach';
import isFunction from 'lodash-es/isFunction';
import noop from 'lodash-es/noop';
import classnames from 'classnames';
import Cell from './Cell';
import { IGridInnerColumn } from './Grid';
import {
  GridRowClassNameType,
  IGridRowClickHander,
  IGridInnerFixedType,
  IGridScrollDelta,
} from './types';

interface IGridRowProps<Data> {
  data: Data;
  columns: Array<IGridInnerColumn<Data>>;
  index: number;
  rowIndex: number;
  prefix: string;
  rowClassName?: GridRowClassNameType<Data>;
  mouseOverRowIndex: number;
  onRowClick: IGridRowClickHander<Data>;
  onRowMouseEnter: (index: number) => void;
  fixed?: IGridInnerFixedType;
  scroll: IGridScrollDelta;
  fixedColumnsBodyRowsHeight: Array<string | number>;
  row?: React.ComponentType;
  rowProps?: (data: Data, index: number) => any;
}

class Row<Data> extends PureComponent<IGridRowProps<Data>> {
  render() {
    const {
      prefix,
      columns,
      data,
      rowIndex,
      rowClassName,
      mouseOverRowIndex,
      onRowClick,
      onRowMouseEnter,
      fixed,
      scroll,
      fixedColumnsBodyRowsHeight,
      row,
      rowProps = noop,
    } = this.props;

    const BodyRow = row || 'tr';

    const cells: React.ReactNode[] = [];

    const className = isFunction(rowClassName)
      ? rowClassName(data, rowIndex)
      : rowClassName;

    const height =
      fixed && fixedColumnsBodyRowsHeight[rowIndex]
        ? fixedColumnsBodyRowsHeight[rowIndex]
        : undefined;

    forEach(columns as Array<IGridInnerColumn<any>>, (column, columnIndex) => {
      const pos = {
        row: rowIndex,
        column: columnIndex,
        fixed,
      };

      cells.push(
        <Cell
          column={column}
          data={data}
          pos={pos}
          columnIndex={columnIndex}
          key={columnIndex}
          prefix={prefix}
        />
      );
    });

    return (
      <BodyRow
        className={classnames(`${prefix}-grid-tr`, className, {
          [`${prefix}-grid-tr__mouseover`]: mouseOverRowIndex === rowIndex,
        })}
        onClick={e => onRowClick(data, rowIndex, e)}
        onMouseEnter={() => scroll && scroll.x && onRowMouseEnter(rowIndex)}
        style={{ height }}
        {...rowProps(data, rowIndex)}
      >
        {cells}
      </BodyRow>
    );
  }
}

export default Row;
