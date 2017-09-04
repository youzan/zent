import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';
import Row from './Row';

class Body extends (PureComponent || Component) {
  getRows() {
    const { prefix, datasets, columns, selection } = this.props;
    const row = [];

    forEach(datasets, (data, index) => {
      row.push(
        <Row
          data={data}
          columns={columns}
          index={index}
          rowIndex={index}
          prefix={prefix}
          key={index}
          selection={selection}
        />
      );
    });

    return row;
  }

  render() {
    const { prefix } = this.props;

    return (
      <tbody className={`${prefix}-grid-tbody`}>
        {this.getRows()}
      </tbody>
    );
  }
}

Body.propTypes = {
  prefix: PropTypes.string,
  columns: PropTypes.array
};

export default Body;
