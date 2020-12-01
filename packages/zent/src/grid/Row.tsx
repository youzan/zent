import { PureComponent } from 'react';
import classnames from 'classnames';
import Cell from './Cell';
import { IGridInnerColumn } from './Grid';
import {
  GridRowClassNameType,
  IGridRowClickHandler,
  IGridInnerFixedType,
  IGridScrollDelta,
} from './types';
import noop from '../utils/noop';

interface IGridRowProps<Data> {
  data: Data;
  columns: Array<IGridInnerColumn<Data>>;
  index: number;
  rowIndex: number;
  prefix: string;
  rowClassName?: GridRowClassNameType<Data>;
  mouseOverRowIndex: number;
  onRowClick: IGridRowClickHandler<Data>;
  onRowMouseEnter: (index: number) => void;
  fixed?: IGridInnerFixedType;
  scroll: IGridScrollDelta;
  fixedColumnsBodyRowsHeight: Array<string | number>;
  row?: React.ComponentType;
  rowProps?: (data: Data, index: number) => any;
  disableHoverHighlight: boolean;
}

class Row<Data> extends PureComponent<IGridRowProps<Data>> {
  onMouseEnter = () => {
    const { rowIndex, onRowMouseEnter } = this.props;
    onRowMouseEnter(rowIndex);
  };

  render() {
    const {
      prefix,
      columns,
      data,
      rowIndex,
      rowClassName,
      mouseOverRowIndex,
      onRowClick,
      fixed,
      fixedColumnsBodyRowsHeight,
      row,
      rowProps = noop,
      disableHoverHighlight,
      scroll,
    } = this.props;

    const BodyRow = row || 'tr';

    const cells: React.ReactNode[] = [];

    const className =
      typeof rowClassName === 'function'
        ? rowClassName(data, rowIndex)
        : rowClassName;

    const height =
      fixed && fixedColumnsBodyRowsHeight[rowIndex]
        ? fixedColumnsBodyRowsHeight[rowIndex]
        : undefined;

    ((columns || []) as Array<IGridInnerColumn<any>>).forEach(
      (column, columnIndex) => {
        const pos = {
          row: rowIndex,
          column: columnIndex,
          fixed,
        };

        cells.push(
          <Cell
            column={column}
            data={data}
            pos={pos}
            columnIndex={columnIndex}
            key={columnIndex}
            prefix={prefix}
          />
        );
      }
    );

    const supportMouseEnter = !disableHoverHighlight && scroll && scroll.x;

    return (
      <BodyRow
        className={classnames(`${prefix}-grid-tr`, className, {
          [`${prefix}-grid-tr__disable-highlight`]: disableHoverHighlight,
          [`${prefix}-grid-tr__mouseover`]: mouseOverRowIndex === rowIndex,
        })}
        onClick={e => onRowClick(data, rowIndex, e)}
        onMouseEnter={supportMouseEnter ? this.onMouseEnter : null}
        style={{ height }}
        {...rowProps(data, rowIndex)}
        /* ts-plugin-version-attribute ignores this element, but it may be a tr... */
        data-zv={__ZENT_VERSION__}
      >
        {cells}
      </BodyRow>
    );
  }
}

export default Row;
