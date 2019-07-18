import * as React from 'react';
import { PureComponent } from 'react';
import classnames from 'classnames';
import map from 'lodash-es/map';
import forEach from 'lodash-es/forEach';
import filter from 'lodash-es/filter';

import ColGroup from './ColGroup';
import {
  IGridColumn,
  GridSortType,
  IGridOnChangeConfig,
  GridFixedType,
  IGridScrollDelta,
} from './types';

export interface IGridHeaderProps {
  prefix: string;
  columns: IGridColumn[];
  sortType: GridSortType;
  sortBy: string;
  defaultSortType: GridSortType;
  onChange: (config: IGridOnChangeConfig) => void;
  store: any;
  fixed: GridFixedType;
  fixedColumnsHeadRowsHeight: number[];
  scroll: IGridScrollDelta;
}

class Header extends PureComponent<IGridHeaderProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.getHeaderRows(props),
    };
  }

  unsubscribe: any;

  onSort = (column, props) => {
    const { sortBy, sortType = '', defaultSortType = 'desc' } = props;
    const name = column.name;
    let newSortType: GridSortType;

    if (name === sortBy) {
      if (sortType === '') {
        newSortType = defaultSortType;
      } else if (sortType === defaultSortType) {
        newSortType = defaultSortType === 'asc' ? 'desc' : 'asc';
      } else {
        newSortType = '';
      }
    }

    if (name !== sortBy) {
      newSortType = defaultSortType;
    }

    this.props.onChange({
      sortBy: name,
      sortType: newSortType,
    });
  };

  getChildren = (column, props) => {
    const { prefix, sortBy, sortType } = props;
    const cn = classnames(`${prefix}-grid-thead-sort`, {
      [`${prefix}-grid-thead-sort-${sortType}`]:
        sortType && column.name === sortBy,
    });

    if (column.needSort) {
      return (
        <div
          onClick={() => this.onSort(column, props)}
          className={`${prefix}-grid-thead-sort-btn`}
        >
          {column.title}
          <span className={cn}>
            <span className="caret-up" />
            <span className="caret-down" />
          </span>
        </div>
      );
    }
    return column.title;
  };

  getHeaderRows = (
    props?: any,
    columns?: any[],
    currentRow = 0,
    rows?: any[]
  ) => {
    props = props || this.props;
    const { prefix, columns: propsColumns } = props;
    columns = columns || propsColumns;

    rows = rows || [];
    rows[currentRow] = rows[currentRow] || [];

    forEach(columns, (column, index) => {
      if (column.rowSpan && rows.length < column.rowSpan) {
        while (rows.length < column.rowSpan) {
          rows.push([]);
        }
      }
      const {
        name,
        key,
        className,
        colSpan,
        rowSpan,
        nowrap,
        textAlign,
      } = column;
      const cell: any = {
        key: name || key || index,
        className: classnames(`${prefix}-grid-th`, className, {
          [`${prefix}-grid-text-align-${textAlign}`]: textAlign,
          [`${prefix}-grid-nowrap`]: nowrap,
        }),
        children: this.getChildren(column, props),
      };

      if (column.children) {
        this.getHeaderRows(props, column.children, currentRow + 1, rows);
      }
      if (typeof colSpan === 'number') {
        cell.colSpan = colSpan;
      }
      if (typeof rowSpan === 'number') {
        cell.rowSpan = rowSpan;
      }
      if (cell.colSpan !== 0) {
        rows[currentRow].push(cell);
      }
    });

    return filter(rows, row => row.length > 0);
  };

  subscribe = () => {
    const { store } = this.props;
    this.unsubscribe = store.subscribe('columns', () => {
      this.setState({ rows: this.getHeaderRows() });
    });
  };

  componentDidMount() {
    this.subscribe();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.columns !== this.props.columns ||
      nextProps.sortType !== this.props.sortType ||
      nextProps.sortBy !== this.props.sortBy
    ) {
      this.setState({
        rows: this.getHeaderRows(nextProps),
      });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  renderThead() {
    const { prefix, fixed, fixedColumnsHeadRowsHeight } = this.props;
    const { rows } = this.state;
    const headerHeight = fixedColumnsHeadRowsHeight[0];
    const rowsLen = rows.length;

    return (
      <thead className={`${prefix}-grid-thead`}>
        {map(rows, (row, index) => {
          const height = fixed && headerHeight ? headerHeight / rowsLen : null;
          return (
            <tr
              key={index}
              className={`${prefix}-grid-tr`}
              style={{
                height,
              }}
            >
              {row.map(props => (
                <th {...props} />
              ))}
            </tr>
          );
        })}
      </thead>
    );
  }

  render() {
    const { scroll, fixed, prefix, columns } = this.props;
    const headerStyle: React.CSSProperties = {};
    if (!fixed && scroll.x) {
      headerStyle.width = scroll.x;
    }
    return scroll.y ? (
      <table className={`${prefix}-grid-table`} style={headerStyle}>
        <ColGroup columns={columns} />
        {this.renderThead()}
      </table>
    ) : (
      this.renderThead()
    );
  }
}

export default Header;
