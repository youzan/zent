import React, { PureComponent } from 'react';
import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';
import classnames from 'classnames';
import Cell from './Cell';

class Row extends PureComponent {
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
    } = this.props;

    const cells = [];

    const className = isFunction(rowClassName)
      ? rowClassName(data, rowIndex)
      : rowClassName;

    const height =
      fixed && fixedColumnsBodyRowsHeight[rowIndex]
        ? fixedColumnsBodyRowsHeight[rowIndex]
        : null;

    forEach(columns, (column, columnIndex) => {
      let pos = {
        row: rowIndex,
        column: columnIndex,
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
      <tr
        className={classnames(`${prefix}-grid-tr`, className, {
          [`${prefix}-grid-tr__mouseover`]: mouseOverRowIndex === rowIndex,
        })}
        onClick={e => onRowClick(data, rowIndex, e)}
        onMouseOver={() => scroll && scroll.x && onRowMoverOver(rowIndex)}
        style={{ height }}
      >
        {cells}
      </tr>
    );
  }
}

export default Row;
