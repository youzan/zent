import React, { Component } from 'react';
import get from 'lodash/get';
import has from 'lodash/has';
import classnames from 'classnames';

class Cell extends Component {
  isInvalidRenderCellText(text) {
    return (
      text &&
      !React.isValidElement(text) &&
      Object.prototype.toString.call(text) === '[object Object]'
    );
  }

  getText = props => {
    return get(props, `data.${get(props, 'column.name')}`);
  };

  onClick = e => {
    const { data, column: { onCellClick } } = this.props;
    if (typeof onCellClick === 'function') {
      onCellClick(data, e);
    }
  };

  shouldComponentUpdate(nextProps) {
    // 如果存在 bodyRender 属性则 render
    if (has(nextProps.column, 'bodyRender')) {
      return true;
    }

    // 如果不存在 bodyRender 则比较 name 对应的值是否一致
    return this.getText(this.props) !== this.getText(nextProps);
  }

  render() {
    const { prefix, column, data, pos } = this.props;
    const { name, bodyRender, textAlign, nowrap, className } = column;

    let text = get(data, name, null);
    let tdProps;
    let colSpan;
    let rowSpan;

    if (typeof bodyRender === 'function') {
      text = bodyRender(data, pos, name);
      if (this.isInvalidRenderCellText(text)) {
        tdProps = text.props || {};
        colSpan = tdProps.colSpan;
        rowSpan = tdProps.rowSpan;
        text = text.children;
      }
    }

    if (this.isInvalidRenderCellText(text)) {
      text = null;
    }

    if (rowSpan === 0 || colSpan === 0) {
      return null;
    }

    return (
      <td
        className={classnames(`${prefix}-grid-td`, className, {
          [`${prefix}-grid-text-align-${textAlign}`]: textAlign,
          [`${prefix}-grid-nowrap`]: nowrap
        })}
        {...tdProps}
        onClick={this.onClick}
      >
        {text}
      </td>
    );
  }
}

export default Cell;
