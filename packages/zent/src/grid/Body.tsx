import * as React from 'react';
import { PureComponent } from 'react';
import classnames from 'classnames';
import get from 'lodash-es/get';
import forEach from 'lodash-es/forEach';
import Row from './Row';
import ColGroup from './ColGroup';
import {
  IGridScrollDelta,
  GridRowClassNameType,
  IGridRowClickHander,
  IGridExpandation,
  IGridInnerFixedType,
} from './types';
import { IGridInnerColumn } from './Grid';

export interface IGridBodyProps<Data> {
  prefix: string;
  columns: Array<IGridInnerColumn<Data>>;
  rowKey: string;
  rowClassName?: GridRowClassNameType<Data>;
  fixed?: IGridInnerFixedType;
  scroll: IGridScrollDelta;
  fixedColumnsBodyRowsHeight: Array<number | string>;
  fixedColumnsBodyExpandRowsHeight: Array<number | string>;
  expandRowKeys: boolean[];
  mouseOverRowIndex: number;
  expandRender: IGridExpandation<Data>['expandRender'];
  rowProps?: (data: Data, index: number) => any;
  datasets: Data[];
  components?: {
    row?: React.ComponentType;
  };
  onRowClick: IGridRowClickHander<Data>;
  onRowMouseEnter: (index: number) => void;
}

class Body<Data> extends PureComponent<IGridBodyProps<Data>> {
  getRows() {
    const {
      prefix,
      datasets,
      columns,
      rowKey,
      rowClassName,
      onRowClick,
      onRowMouseEnter,
      mouseOverRowIndex,
      fixed,
      scroll,
      expandRowKeys,
      expandRender,
      fixedColumnsBodyRowsHeight,
      fixedColumnsBodyExpandRowsHeight,
      components,
      rowProps,
    } = this.props;
    const row: React.ReactNode[] = [];

    forEach(datasets, (data, index) => {
      row.push(
        <Row
          data={data}
          columns={columns}
          index={index}
          rowIndex={index}
          prefix={prefix}
          key={rowKey ? get(data, rowKey) : index}
          rowClassName={rowClassName}
          mouseOverRowIndex={mouseOverRowIndex}
          onRowClick={onRowClick}
          onRowMouseEnter={onRowMouseEnter}
          fixed={fixed}
          scroll={scroll}
          fixedColumnsBodyRowsHeight={fixedColumnsBodyRowsHeight}
          row={components && components.row}
          rowProps={rowProps}
        />
      );
      if (expandRender && expandRowKeys.length > 0) {
        const height =
          fixed && fixedColumnsBodyExpandRowsHeight[index]
            ? fixedColumnsBodyExpandRowsHeight[index]
            : undefined;
        const trProps = {
          key: `${index}-expand`,
          className: `${prefix}-grid-tr__expanded`,
          style: { display: expandRowKeys[index] ? '' : 'none', height },
        };
        if (fixed !== 'right') {
          row.push(
            <tr {...trProps}>
              <td />
              <td colSpan={columns.length - 1}>{expandRender(data)}</td>
            </tr>
          );
        } else {
          row.push(
            <tr {...trProps}>
              <td colSpan={columns.length} />
            </tr>
          );
        }
      }
    });

    return row;
  }

  onBodyMouseLeave = () => {
    const { onRowMouseEnter, scroll } = this.props;

    scroll && scroll.x && onRowMouseEnter(-1);
  };

  renderTbody() {
    const { prefix, columns } = this.props;
    const tbodyClass = classnames(`${prefix}-grid-tbody`, {
      [`${prefix}-grid-tbody-span`]: columns.some(
        item => !!(item.colSpan || item.rowSpan)
      ),
    });

    return (
      <tbody onMouseLeave={this.onBodyMouseLeave} className={tbodyClass}>
        {this.getRows()}
      </tbody>
    );
  }

  render() {
    const { scroll, fixed, prefix, columns } = this.props;
    const bodyStyle: React.CSSProperties = {};
    if (!fixed && scroll.x) {
      bodyStyle.width = scroll.x;
    }
    return scroll.y ? (
      <table className={`${prefix}-grid-table`} style={bodyStyle}>
        <ColGroup columns={columns} />
        {this.renderTbody()}
      </table>
    ) : (
      this.renderTbody()
    );
  }
}

export default Body;
