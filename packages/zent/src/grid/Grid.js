import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Loading } from 'zent';
import ColumnsManager from './ColumnsManager';
import ColGroup from './ColGroup';
import Header from './Header';
import Body from './Body';

class Grid extends (PureComponent || Component) {
  constructor(props) {
    super(props);
    this.columnsManager = new ColumnsManager(props.columns);
  }

  getTable() {
    const { prefix, datasets } = this.props;
    const columns = this.columnsManager.columns;

    return (
      <table>
        <ColGroup columns={columns} />
        <Header prefix={prefix} columns={columns} />
        <Body prefix={prefix} columns={columns} datasets={datasets} />
      </table>
    );
  }

  render() {
    const { prefix, loading } = this.props;

    return (
      <div className={classnames(`${prefix}-grid`)}>
        <Loading show={loading}>
          {this.getTable()}
        </Loading>
      </div>
    );
  }
}

Grid.propTypes = {
  className: PropTypes.string,
  prefix: PropTypes.string,
  datasets: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool
};

Grid.defaultProps = {
  className: '',
  prefix: 'zent',
  datasets: [],
  columns: [],
  loading: false
};

export default Grid;
