import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import filter from 'lodash/filter';

import ColGroup from './ColGroup';

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.getHeaderRows(props),
    };
  }

  onSort = (column, props, newSortType) => {
    const { sortBy } = props;
    let name = column.name;
    let sortType = '';

    if (name === sortBy) {
      if (newSortType === this.props.sortType) {
        sortType = '';
      } else {
        sortType = newSortType;
      }
    }

    if (name !== sortBy) {
      sortType = newSortType;
    }

    this.props.onChange({
      sortBy: name,
      sortType,
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
        <div className={`${prefix}-grid-thead-sort-btn`}>
          {column.title}
          <span className={cn}>
            <span
              onClick={() => this.onSort(column, props, 'asc')}
              className="caret-up"
            />
            <span
              onClick={() => this.onSort(column, props, 'desc')}
              className="caret-down"
            />
          </span>
        </div>
      );
    }
    return column.title;
  };

  getHeaderRows = (props, columns, currentRow = 0, rows) => {
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
      const cell = {
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
    const headerStyle = {};
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

Header.propTypes = {
  prefix: PropTypes.string,
  columns: PropTypes.array,
};

export default Header;
