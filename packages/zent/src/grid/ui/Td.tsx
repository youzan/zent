import * as React from 'react';
import classnames from 'classnames';
import { clsPrefix } from '../constants';
import { IGridColumn, GridSortType, GridTextAlign } from '../types';

interface ITd {
  children: React.ReactNode;
  type: 'th' | 'td';
  column?: IGridColumn;
  sortType?: GridSortType;
  sortBy?: string;
  onClick?: (e: any) => void;
  colSpan?: number;
  rowSpan?: number;
  width?: number | string;
  textAlign?: GridTextAlign;
  style?: React.CSSProperties;
  className?: string;
}

export default function Td(props: ITd) {
  const {
    children,
    type,
    style,
    column,
    sortBy,
    sortType,
    onClick,
    colSpan,
    rowSpan,
    textAlign,
    className,
  } = props;

  // console.log(props);

  const { name, needSort, nowrap } = column || {};

  const cls = React.useMemo(() => {
    return classnames(className, `${clsPrefix}-${type}`, {
      [`${clsPrefix}-text-align-${textAlign}`]: !!textAlign,
      [`${clsPrefix}-nowrap`]: nowrap,
    });
  }, [type, textAlign, nowrap, className]);

  const sortCls = classnames(`${clsPrefix}-thead-sort`, {
    [`${clsPrefix}-thead-sort-${sortType}`]: sortType,
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
      {needSort ? (
        <div className={`${clsPrefix}-thead-sort-btn`}>
          {children}
          <span className={sortCls}>
            <span className="caret-up" />
            <span className="caret-down" />
          </span>
        </div>
      ) : (
        children
      )}
    </th>
  );
}
