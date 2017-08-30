import React from 'react';
import get from 'lodash/get';

class Cell extends React.Component {
  render() {
    const { column, data } = this.props;
    const { name } = column;

    let text = get(data, name);

    return (
      <td>
        {text}
      </td>
    );
  }
}

export default Cell;
