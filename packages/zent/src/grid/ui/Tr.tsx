import * as React from 'react';
import classnames from 'classnames';
import { clsPrefix } from '../constants';
import { GridRowClassNameType, IGridRowClickHandler } from '../types';

interface ITr<Data> {
  children: React.ReactNode;
  rowClassName: string | GridRowClassNameType;
  rowIndex?: number;
  record?: Data;
  className?: string;
  onRowClick?: IGridRowClickHandler<Data>;
}

export default function Tr<Data>(props: ITr<Data>) {
  const {
    children,
    rowClassName,
    record,
    rowIndex,
    className,
    onRowClick,
  } = props;

  const cls = React.useMemo(() => {
    const rowCls =
      typeof rowClassName === 'function'
        ? rowClassName(record, rowIndex)
        : rowClassName;
    return classnames(`${clsPrefix}-tr`, {
      [className]: !!className,
      [rowCls]: !!rowCls,
    });
  }, [rowClassName, record, rowIndex, className]);

  const handleOnClick = React.useCallback(
    (e: React.MouseEvent<HTMLTableRowElement>) => {
      if (onRowClick) {
        onRowClick(record, rowIndex, e);
      }
    },
    [onRowClick, record, rowIndex]
  );

  return (
    <tr className={cls} onClick={handleOnClick}>
      {children}
    </tr>
  );
}
