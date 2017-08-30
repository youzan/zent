import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import forEach from 'lodash/forEach';

class Header extends (PureComponent || Component) {
  rows = [];

  getHeaderRows(currentRow = 0, rows) {
    const { columns } = this.props;

    rows = rows || [];
    rows[currentRow] = rows[currentRow] || [];

    forEach(columns, ({ name, key, className, title }, index) => {
      const cell = {
        key: name || key || index,
        className: className || '',
        children: title
      };

      rows[currentRow].push(cell);
    });

    return rows.filter(row => row.length > 0);
  }

  render() {
    const { prefix } = this.props;

    return (
      <thead className={`${prefix}-grid-thead`}>
        {map(this.getHeaderRows(), (row, index) =>
          <tr key={index}>
            {row.map(props => <th {...props} />)}
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
