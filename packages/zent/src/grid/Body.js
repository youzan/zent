import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import Row from './Row';
import ColGroup from './ColGroup';

class Body extends (PureComponent || Component) {
  getRows() {
    const {
      prefix,
      datasets,
      columns,
      rowKey,
      rowClassName,
      onRowClick,
      fixed,
      fixedColumnsBodyRowsHeight
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
          onRowClick={onRowClick}
          fixed={fixed}
          fixedColumnsBodyRowsHeight={fixedColumnsBodyRowsHeight}
        />
      );
    });

    return row;
  }

  renderTbody() {
    const { prefix } = this.props;

    return <tbody className={`${prefix}-grid-tbody`}>{this.getRows()}</tbody>;
  }

  render() {
    const { scroll, fixed, prefix, columns } = this.props;
    const bodyStyle = {};
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

Body.propTypes = {
  prefix: PropTypes.string,
  columns: PropTypes.array
};

export default Body;
