import { Component, isValidElement } from 'react';
import classnames from 'classnames';
import { GridColumnContext } from './ColumnContext';
import { IGridInnerColumn } from './Grid';
import { IGridCellPos } from './types';
import isNil from '../utils/isNil';
import getFromPath from '../utils/getFromPath';
import { hasOwnProperty } from '../utils/hasOwn';

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
      !isValidElement(text) &&
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
    if (nextProps.column && hasOwnProperty(nextProps.column, 'bodyRender')) {
      return true;
    }

    // 如果不存在 bodyRender 则比较 name 对应的值是否一致
    return this.getText(this.props) !== this.getText(nextProps);
  }

  static contextType = GridColumnContext;

  render() {
    const { prefix, column, data, pos } = this.props;
    const { isValueEmpty: isValueEmptyInCtx, defaultText: defaultTextInCtx } =
      this.context;
    const {
      name,
      bodyRender,
      textAlign,
      nowrap,
      noWrap,
      className,
      defaultText = defaultTextInCtx,
      isValueEmpty = isValueEmptyInCtx ?? isNil,
    } = column;
    let text: any = getFromPath(data, name);
    if (isValueEmpty(text) && !isNil(defaultText)) {
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
          [`${prefix}-grid-nowrap`]: noWrap ?? nowrap,
          [`${prefix}-grid-td-multiple-row`]: tdProps && tdProps.rowSpan > 1,
          [`${prefix}-grid-td-selection`]:
            ['selection-column', 'selection-column-single'].indexOf(
              column.key
            ) !== -1,
          [`${prefix}-grid-td-expand`]: column.key === 'expand-column',
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
