import * as React from 'react';
import { PureComponent } from 'react';
import classnames from 'classnames';
import forEach from 'lodash-es/forEach';

import ColGroup from './ColGroup';
import {
  GridSortType,
  IGridOnChangeConfig,
  IGridScrollDelta,
  IGridInnerFixedType,
} from './types';
import { IGridInnerColumn } from './Grid';
import Store from './Store';

export interface IGridHeaderProps<Data> {
  prefix: string;
  columns: Array<IGridInnerColumn<Data>>;
  sortType: GridSortType;
  defaultSortType?: GridSortType;
  sortBy?: string;
  onChange: (config: IGridOnChangeConfig) => void;
  store: Store;
  fixed?: IGridInnerFixedType;
  fixedColumnsHeadRowsHeight: Array<number | string>;
  scroll: IGridScrollDelta;
}

interface IGridHeaderState<Data> {
  rows: Array<Array<IGridInnerColumn<Data>>>;
}

class Header<Data> extends PureComponent<
  IGridHeaderProps<Data>,
  IGridHeaderState<Data>
> {
  constructor(props: IGridHeaderProps<Data>) {
    super(props);

    this.state = {
      rows: this.getHeaderRows(props),
    };
  }

  unsubscribe: any;

  onSort = (column: IGridInnerColumn<Data>, props: IGridHeaderProps<Data>) => {
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

  getChildren = (
    column: IGridInnerColumn<Data>,
    props: IGridHeaderProps<Data>
  ) => {
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
    passProps?: IGridHeaderProps<Data>,
    columns?: Array<IGridInnerColumn<Data>>,
    currentRow = 0,
    rows: Array<Array<IGridInnerColumn<Data>>> = []
  ) => {
    const props = passProps || this.props;
    const { prefix, columns: propsColumns } = props;

    columns = columns || propsColumns;
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

    return rows.filter(row => row.length > 0);
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

  componentWillReceiveProps(nextProps: IGridHeaderProps<Data>) {
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
        {(rows || []).map((row, index) => {
          const height =
            fixed && headerHeight
              ? (headerHeight as number) / rowsLen
              : undefined;
          return (
            <tr
              key={index}
              className={`${prefix}-grid-tr`}
              style={{
                height,
              }}
            >
              {row.map(props => (
                <th {...(props as any)} />
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
