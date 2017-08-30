import React from 'react';
import get from 'lodash/get';

class Cell extends React.Component {
  render() {
    const { prefix, column, data, pos } = this.props;
    const { name, bodyRender } = column;

    let text = get(data, name, null);

    if (typeof bodyRender === 'function') {
      text = bodyRender(data, pos, name);
    }

    return (
      <td className={`${prefix}-grid-td`}>
        {text}
      </td>
    );
  }
}

export default Cell;
