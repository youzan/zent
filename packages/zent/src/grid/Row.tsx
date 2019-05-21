import * as React from 'react';
import { PureComponent } from 'react';
import forEach from 'lodash-es/forEach';
import isFunction from 'lodash-es/isFunction';
import noop from 'lodash-es/noop';
import classnames from 'classnames';
import Cell from './Cell';

class Row extends PureComponent<any, any> {
  render() {
    const {
      prefix,
      columns,
      data,
      rowIndex,
      rowClassName,
      mouseOverRowIndex,
      onRowClick,
      onRowMoverOver,
      fixed,
      scroll,
      fixedColumnsBodyRowsHeight,
      row,
      rowProps = noop,
    } = this.props;

    const BodyRow = row || 'tr';

    const cells = [];

    const className = isFunction(rowClassName)
      ? rowClassName(data, rowIndex)
      : rowClassName;

    const height =
      fixed && fixedColumnsBodyRowsHeight[rowIndex]
        ? fixedColumnsBodyRowsHeight[rowIndex]
        : null;

    forEach(columns, (column, columnIndex) => {
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
        onMouseOver={() => scroll && scroll.x && onRowMoverOver(rowIndex)}
        style={{ height }}
        {...rowProps(data, rowIndex)}
      >
        {cells}
      </BodyRow>
    );
  }
}

export default Row;
