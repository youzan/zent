import React from 'react';
import forEach from 'lodash/forEach';
import Cell from './Cell';

class Row extends React.Component {
  render() {
    const { prefix, columns, data, rowIndex } = this.props;

    const cells = [];

    forEach(columns, (column, columnIndex) => {
      let pos = {
        row: rowIndex,
        column: columnIndex
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
      <tr className={`${prefix}-grid-tr`}>
        {cells}
      </tr>
    );
  }
}

export default Row;
