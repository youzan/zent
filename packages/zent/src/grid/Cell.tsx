import * as React from 'react';
import { Component } from 'react';
import classnames from 'classnames';
import { IGridInnerColumn } from './Grid';
import { IGridCellPos } from './types';
import isNil from '../utils/isNil';
import getFromPath from '../utils/getFromPath';

interface IGridCellProps<Data> {
  column: IGridInnerColumn<Data>;
  data: Data;
  pos: IGridCellPos;
  columnIndex: number;
  prefix: string;
}

class Cell<Data> extends Component<IGridCellProps<Data>> {
  isInvalidRenderCellText(text: any) {
    return (
      text &&
      !React.isValidElement(text) &&
      Object.prototype.toString.call(text) === '[object Object]'
    );
  }

  getText = (props: IGridCellProps<Data>) => {
    return props.data?.[`${props.column?.name}`];
  };

  onClick: React.MouseEventHandler<HTMLTableDataCellElement> = e => {
    const {
      data,
      column: { onCellClick },
    } = this.props;
    if (typeof onCellClick === 'function') {
      onCellClick(data, e);
    }
  };

  shouldComponentUpdate(nextProps: IGridCellProps<Data>) {
    // 如果存在 bodyRender 属性则 render
    if (nextProps.column?.hasOwnProperty('bodyRender')) {
      return true;
    }

    // 如果不存在 bodyRender 则比较 name 对应的值是否一致
    return this.getText(this.props) !== this.getText(nextProps);
  }

  render() {
    const { prefix, column, data, pos } = this.props;
    const {
      name,
      bodyRender,
      textAlign,
      nowrap,
      className,
      defaultText,
    } = column;
    let text: any = getFromPath(data, name);
    if (isNil(text) && defaultText) {
      text = defaultText;
    }
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
          [`${prefix}-grid-nowrap`]: nowrap,
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
