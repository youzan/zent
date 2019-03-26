import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { noop } from '../constants';

export default class PanelCell extends PureComponent {
  static propTypes = {
    onHover: PropTypes.func,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    onHover: noop,
  };

  onClickCell = cell => {
    !cell.isDisabled && this.props.onSelect(cell.value);
  };

  getTbody() {
    const { cells, onHover } = this.props;
    return cells.map((row, i) => {
      let tds = row.map((col, j) => {
        return (
          <li className="grid-cell" role="gridcell" key={j}>
            <div
              onClick={() => this.onClickCell(col)}
              onMouseOver={() => onHover(col.value)}
              className={col.className}
              title={col.title}
            >
              {col.text}
            </div>
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
    return <div>{this.getTbody()}</div>;
  }
}
