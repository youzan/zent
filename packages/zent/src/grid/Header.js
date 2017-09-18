import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import filter from 'lodash/filter';

class Header extends (PureComponent || Component) {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.getHeaderRows(props)
    };
  }

  getHeaderRows = (props, currentRow = 0, rows) => {
    const { columns } = props || this.props;

    rows = rows || [];
    rows[currentRow] = rows[currentRow] || [];

    forEach(
      columns,
      ({ name, key, className, title, colSpan, rowSpan }, index) => {
        const cell = {
          key: name || key || index,
          className: className || '',
          children: title
        };

        if (typeof colSpan === 'number') {
          cell.colSpan = colSpan;
        }

        if (cell.colSpan !== 0) {
          rows[currentRow].push(cell);
        }
      }
    );

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
    if (nextProps.columns !== this.props.columns) {
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

  render() {
    const { prefix } = this.props;

    return (
      <thead className={`${prefix}-grid-thead`}>
        {map(this.state.rows, (row, index) => (
          <tr key={index} className={`${prefix}-grid-tr`}>
            {row.map(props => (
              <th
                {...props}
                className={cx(`${prefix}-grid-th`, props.className)}
              />
            ))}
          </tr>
        ))}
      </thead>
    );
  }
}

Header.propTypes = {
  prefix: PropTypes.string,
  columns: PropTypes.array
};

export default Header;
