import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import Loading from 'loading';
import classnames from 'classnames';
import noop from 'lodash/noop';
import ColumnsManager from './ColumnsManager';
import ColGroup from './ColGroup';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const defaultPageInfo = {
  current: 1,
  pageSize: 10
};

class Grid extends (PureComponent || Component) {
  constructor(props) {
    super(props);
    this.columnsManager = new ColumnsManager(props);
  }

  onChange = conf => {
    this.props.onChange(conf);
  };

  getTable() {
    const { prefix, datasets, selection } = this.props;
    const columns = this.columnsManager.columns;

    return (
      <table className={`${prefix}-grid-table`}>
        <ColGroup columns={columns} />
        <Header prefix={prefix} columns={columns} selection={selection} />
        <Body
          prefix={prefix}
          columns={columns}
          datasets={datasets}
          selection={selection}
        />
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
            defaultPageInfo={defaultPageInfo}
            onChange={this.onChange}
            hasPagination={this.hasPagination}
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
  onChange: PropTypes.func,
  selection: PropTypes.object
};

Grid.defaultProps = {
  className: '',
  prefix: 'zent',
  datasets: [],
  columns: [],
  loading: false,
  pageInfo: false,
  onChange: noop,
  selection: null
};

export default Grid;
