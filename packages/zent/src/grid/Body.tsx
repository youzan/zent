import * as React from 'react';
import { PureComponent } from 'react';
import classnames from 'classnames';
import get from 'lodash-es/get';
import forEach from 'lodash-es/forEach';
import Row from './Row';
import ColGroup from './ColGroup';
import {
  IGridColumn,
  GridFixedType,
  IGridScrollDelta,
  GridRowClassNameType,
} from './types';

export interface IGridBodyProps {
  prefix: string;
  columns: IGridColumn[];
  rowKey: string;
  rowClassName: GridRowClassNameType;
  fixed: GridFixedType;
  scroll: IGridScrollDelta;
  fixedColumnsBodyRowsHeight: number[];
  fixedColumnsBodyExpandRowsHeight: number[];
  expandRowKeys: string[];
  mouseOverRowIndex: number;
  expandRender: (data: any) => React.ReactNode;
  rowProps(data: any, index: number): any;
  datasets: object[];
  components: {
    row?: React.ReactNode;
  };
  onRowClick: (
    data: any,
    index: number,
    event: React.MouseEvent<HTMLTableRowElement>
  ) => void;
  onRowMoverOver: (index: number) => void;
}

class Body extends PureComponent<IGridBodyProps> {
  getRows() {
    const {
      prefix,
      datasets,
      columns,
      rowKey,
      rowClassName,
      onRowClick,
      onRowMoverOver,
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
    const row = [];

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
          onRowMoverOver={onRowMoverOver}
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
            : null;
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

  renderTbody() {
    const { prefix, onRowMoverOver, scroll, columns } = this.props;
    const tbodyClass = classnames(`${prefix}-grid-tbody`, {
      [`${prefix}-grid-tbody-span`]: columns.some(
        item => !!(item.colSpan || item.rowSpan)
      ),
    });

    return (
      <tbody
        onMouseLeave={() => scroll && scroll.x && onRowMoverOver(-1)}
        className={tbodyClass}
      >
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
