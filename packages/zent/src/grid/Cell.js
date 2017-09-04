import React from 'react';
import get from 'lodash/get';

class Cell extends React.PureComponent {
  isInvalidRenderCellText(text) {
    return (
      text &&
      !React.isValidElement(text) &&
      Object.prototype.toString.call(text) === '[object Object]'
    );
  }

  render() {
    const { prefix, column, data, pos } = this.props;
    const { name, bodyRender } = column;

    let text = get(data, name, null);

    if (typeof bodyRender === 'function') {
      text = bodyRender(data, pos, name);
    }

    let tdProps;
    let colSpan;
    let rowSpan;

    if (this.isInvalidRenderCellText(text)) {
      tdProps = text.props || {};
      colSpan = tdProps.colSpan;
      rowSpan = tdProps.rowSpan;
      text = text.children;
    }

    if (rowSpan === 0 || colSpan === 0) {
      return null;
    }

    return (
      <td className={`${prefix}-grid-td`} {...tdProps}>
        {text}
      </td>
    );
  }
}

export default Cell;
