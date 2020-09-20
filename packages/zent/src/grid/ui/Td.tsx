import * as React from 'react';
import classnames from 'classnames';
import {
  IGridFixedPosition,
  IGridColumn,
  GridSortType,
  GridTextAlign,
} from '../types';

interface ITd {
  prefix: string;
  children: React.ReactNode;
  type: 'th' | 'td';
  position?: IGridFixedPosition;
  column?: IGridColumn;
  sortType?: GridSortType;
  sortBy?: string;
  onClick?: (e: any) => void;
  colSpan?: number;
  rowSpan?: number;
  width?: number | string;
  textAlign?: GridTextAlign;
}

export default function Td(props: ITd) {
  const {
    prefix,
    children,
    type,
    position = {},
    column,
    sortBy,
    sortType,
    onClick,
    colSpan,
    rowSpan,
    textAlign,
  } = props;
  const {
    left,
    right,
    fixed,
    isFirstRightFixedColumn,
    isLastLeftFixedColumn,
  } = position;

  const { name, needSort, nowrap } = column || {};

  const style = React.useMemo(() => {
    const style: React.CSSProperties = {};

    if (fixed === 'right') {
      style.right = `${right}px`;
    } else if (fixed) {
      style.left = `${left}px`;
    }
    return style;
  }, [left, right, fixed]);

  const cls = React.useMemo(() => {
    return classnames(`${prefix}-grid-${type}`, {
      [`${prefix}-grid-fixed ${prefix}-grid-fixed-${fixed}`]: !!fixed,
      [`${prefix}-grid-fixed-right-first`]: isFirstRightFixedColumn,
      [`${prefix}-grid-fixed-left-last`]: isLastLeftFixedColumn,
      [`${prefix}-grid-thead-sort`]: needSort,
      [`${prefix}-grid-thead-sort-${sortType}`]: sortType && name === sortBy,
      [`${prefix}-grid-text-align-${textAlign}`]: !!textAlign,
      [`${prefix}-grid-nowrap`]: nowrap,
    });
  }, [
    prefix,
    type,
    fixed,
    isFirstRightFixedColumn,
    isLastLeftFixedColumn,
    sortType,
    sortBy,
    needSort,
    name,
    textAlign,
    nowrap,
  ]);

  const sortCls = classnames(`${prefix}-grid-thead-sort`, {
    [`${prefix}-grid-thead-sort-${sortType}`]:
      sortType && column.name === sortBy,
  });

  if (type === 'th' && colSpan === 0) {
    return null;
  }

  return type === 'td' ? (
    <td
      className={cls}
      style={style}
      colSpan={colSpan > 1 ? colSpan : undefined}
      rowSpan={rowSpan > 1 ? rowSpan : undefined}
    >
      {children}
    </td>
  ) : (
    <th
      className={cls}
      style={style}
      onClick={onClick}
      colSpan={colSpan > 1 ? colSpan : undefined}
      rowSpan={rowSpan > 1 ? rowSpan : undefined}
    >
      {children}
      {needSort ? (
        <span className={sortCls}>
          <span className="caret-up" />
          <span className="caret-down" />
        </span>
      ) : null}
    </th>
  );
}
