import React, { PureComponent } from 'react';
import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';
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
      let pos = {
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
