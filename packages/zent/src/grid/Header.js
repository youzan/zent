import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import filter from 'lodash/filter';

import ColGroup from './ColGroup';

class Header extends (PureComponent || Component) {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.getHeaderRows(props)
    };
  }

  onSort = (column, props) => {
    const { sortBy } = props;
    let name = column.name;
    let sortType = '';

    if (name === sortBy) {
      if (this.props.sortType === '') {
        sortType = 'desc';
      }
      if (this.props.sortType === 'desc') {
        sortType = 'asc';
      }
      if (this.props.sortType === 'asc') {
        sortType = '';
      }
    }

    if (name !== sortBy) {
      sortType = 'desc';
    }

    this.props.onChange({
      sortBy: name,
      sortType
    });
  };

  getChildren = (column, props) => {
    const { prefix, sortBy, sortType } = props;

    if (column.needSort) {
      return (
        <a
          onClick={() => this.onSort(column, props)}
          className={`${prefix}-grid-thead-sort-btn`}
        >
          {column.title}
          {column.name === sortBy && (
            <span
              className={
                sortType
                  ? `${prefix}-grid-thead-sort-${sortType}`
                  : `${prefix}-grid-thead-sort`
              }
            />
          )}
        </a>
      );
    }
    return column.title;
  };

  getHeaderRows = (props, currentRow = 0, rows) => {
    props = props || this.props;
    const { prefix, columns } = props;

    rows = rows || [];
    rows[currentRow] = rows[currentRow] || [];

    forEach(columns, (column, index) => {
      const { name, key, className, colSpan, nowrap, textAlign } = column;
      const cell = {
        key: name || key || index,
        className: classnames(`${prefix}-grid-th`, className, {
          [`${prefix}-grid-text-align-${textAlign}`]: textAlign,
          [`${prefix}-grid-nowrap`]: nowrap
        }),
        children: this.getChildren(column, props)
      };

      if (typeof colSpan === 'number') {
        cell.colSpan = colSpan;
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
        rows: this.getHeaderRows(nextProps)
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

    return (
      <thead className={`${prefix}-grid-thead`}>
        {map(this.state.rows, (row, index) => {
          const height =
            fixed && fixedColumnsHeadRowsHeight[index]
              ? fixedColumnsHeadRowsHeight[index]
              : null;
          return (
            <tr
              key={index}
              className={`${prefix}-grid-tr`}
              style={{
                height
              }}
            >
              {row.map(props => <th {...props} />)}
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
  columns: PropTypes.array
};

export default Header;
