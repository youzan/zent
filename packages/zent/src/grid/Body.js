import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';
import Row from './Row';

class Body extends (PureComponent || Component) {
  getRows() {
    const { datasets, columns } = this.props;
    const rst = [];

    forEach(datasets, (data, index) => {
      rst.push(<Row key={index} data={data} columns={columns} />);
    });

    return rst;
  }

  render() {
    const { prefix, columns } = this.props;

    return (
      <tbody className={`${prefix}-grid-thead`}>
        {this.getRows(columns)}
      </tbody>
    );
  }
}

Body.propTypes = {
  prefix: PropTypes.string,
  columns: PropTypes.array
};

export default Body;
