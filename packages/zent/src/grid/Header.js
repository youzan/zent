import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import map from 'lodash/map';
import forEach from 'lodash/forEach';

class Header extends (PureComponent || Component) {
  rows = [];

  getHeaderRows(currentRow = 0, rows) {
    const { columns } = this.props;

    rows = rows || [];
    rows[currentRow] = rows[currentRow] || [];

    forEach(
      columns,
      ({ name, key, className, title, colSpan, rowSpan }, index) => {
        // if (rowSpan && rows.length < rowSpan) {
        //   while (rows.length < rowSpan) {
        //     rows.push([]);
        //   }
        // }

        const cell = {
          key: name || key || index,
          className: className || '',
          children: title
        };

        if (typeof colSpan === 'number') {
          cell.colSpan = colSpan;
        }

        // if (typeof rowSpan === 'number') {
        //   cell.rowSpan = rowSpan;
        // }

        if (cell.colSpan !== 0) {
          rows[currentRow].push(cell);
        }
      }
    );

    return rows.filter(row => row.length > 0);
  }

  render() {
    const { prefix } = this.props;

    return (
      <thead className={`${prefix}-grid-thead`}>
        {map(this.getHeaderRows(), (row, index) =>
          <tr key={index} className={`${prefix}-grid-tr`}>
            {row.map(props =>
              <th
                {...props}
                className={cx(`${prefix}-grid-th`, props.className)}
              />
            )}
          </tr>
        )}
      </thead>
    );
  }
}

Header.propTypes = {
  prefix: PropTypes.string,
  columns: PropTypes.array
};

export default Header;
