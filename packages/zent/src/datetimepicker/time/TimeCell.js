import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { noop } from '../constants';

export default class TimeCell extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    onSelect: noop,
  };

  onClickCell = cell => {
    !cell.isDisabled && this.props.onSelect(cell.value);
  };

  getTbody() {
    const { cells } = this.props;
    return cells.map((row, i) => {
      let tds = row.map((col, j) => {
        return (
          <li className="grid-cell" role="gridcell" key={j}>
            <span
              onClick={() => this.onClickCell(col)}
              className={col.className}
              title={col.value}
            >
              {col.text}
            </span>
          </li>
        );
      });

      return (
        <ul className="panel-table__row" role="row" key={i}>
          {tds}
        </ul>
      );
    });
  }

  render() {
    return <div className="panel-table__list">{this.getTbody()}</div>;
  }
}
