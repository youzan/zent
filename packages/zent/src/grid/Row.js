import React from 'react';
import forEach from 'lodash/forEach';
import Cell from './Cell';

class Row extends React.Component {
  render() {
    const { columns, data } = this.props;

    const cells = [];

    forEach(columns, (column, index) => {
      cells.push(<Cell column={column} data={data} key={index} />);
    });

    return (
      <tr>
        {cells}
      </tr>
    );
  }
}

export default Row;
