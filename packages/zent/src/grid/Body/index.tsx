import * as React from 'react';
import BodyRow from './BodyRow';
import {
  IGridColumn,
  IGridRowClickHandler,
  GridRowClassNameType,
  // GridSortType,
  // IGridOnChangeConfig,
  // IGridInnerFixedType,
  // IGridScrollDelta,
} from '../types';

export interface IGridBodyProps<Data> {
  prefix: string;
  columns: Array<IGridColumn<Data>>;
  datasets: Array<Data>;
  rowKey: string;
  rowClassName?: GridRowClassNameType;
  onRowClick?: IGridRowClickHandler<Data>;
  // sortType: GridSortType;
  // defaultSortType?: GridSortType;
  // sortBy?: string;
  // onChange: (config: IGridOnChangeConfig) => void;
  // fixed?: IGridInnerFixedType;
  // fixedColumnsHeadRowsHeight: Array<number | string>;
  // scroll: IGridScrollDelta;
}

function Body<Data>(props: IGridBodyProps<Data>) {
  const { prefix, columns, datasets, rowKey, onRowClick, rowClassName } = props;
  return (
    <tbody className={`${prefix}-grid-header`}>
      {datasets.map((record, index) => (
        <BodyRow
          columns={columns}
          record={record}
          key={rowKey}
          prefix={prefix}
          onRowClick={onRowClick}
          rowClassName={rowClassName}
          rowIndex={index}
        />
      ))}
    </tbody>
  );
}

export default Body;
