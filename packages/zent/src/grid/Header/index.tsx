import * as React from 'react';
import {
  IGridColumn,
  // GridSortType,
  // IGridOnChangeConfig,
  // IGridInnerFixedType,
  // IGridScrollDelta,
} from '../types';

export interface IGridHeaderProps<Data> {
  prefix: string;
  columns: Array<IGridColumn<Data>>;
  // sortType: GridSortType;
  // defaultSortType?: GridSortType;
  // sortBy?: string;
  // onChange: (config: IGridOnChangeConfig) => void;
  // fixed?: IGridInnerFixedType;
  // fixedColumnsHeadRowsHeight: Array<number | string>;
  // scroll: IGridScrollDelta;
}

function Header<Data>(props: IGridHeaderProps<Data>) {
  const { prefix, columns } = props;
  return (
    <thead className={`${prefix}-grid-header`}>
      <tr className={`${prefix}-grid-tr`}>
        {columns.map(({ key, title }, index) => (
          <th className={`${prefix}-grid-th`} key={key || index}>
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Header;
