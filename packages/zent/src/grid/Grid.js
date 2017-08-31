import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'zent';
import classnames from 'classnames';
import noop from 'lodash/noop';
import ColumnsManager from './ColumnsManager';
import ColGroup from './ColGroup';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

class Grid extends (PureComponent || Component) {
  constructor(props) {
    super(props);
    this.columnsManager = new ColumnsManager(props.columns);
  }

  onChange = conf => {
    this.props.onChange(conf);
  };

  getTable() {
    const { prefix, datasets } = this.props;
    const columns = this.columnsManager.columns;

    return (
      <table className={`${prefix}-grid-table`}>
        <ColGroup columns={columns} />
        <Header prefix={prefix} columns={columns} />
        <Body prefix={prefix} columns={columns} datasets={datasets} />
      </table>
    );
  }

  render() {
    const { prefix, loading, pageInfo } = this.props;

    return (
      <div className={classnames(`${prefix}-grid`)}>
        <Loading show={loading}>
          {this.getTable()}
          <Footer
            prefix={prefix}
            pageInfo={pageInfo}
            onChange={this.onChange}
          />
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
  loading: PropTypes.bool,
  pageInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onChange: PropTypes.func
};

Grid.defaultProps = {
  className: '',
  prefix: 'zent',
  datasets: [],
  columns: [],
  loading: false,
  pageInfo: false,
  onChange: noop
};

export default Grid;
