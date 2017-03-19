import React, { Component, PropTypes } from 'react';
import { noop } from '../constants';

export default class TimeCell extends Component {
  static PropTypes = {
    onSelect: PropTypes.func
  }

  static defaultProps = {
    onSelect: noop
  }

  onClickCell = (cell) => {
    !cell.isDisabled && this.props.onSelect(cell.value);
  }

  getTbody() {
    const { cells } = this.props;
    return cells.map((row, i) => {
      let tds = row.map((col, j) => {
        return (
          <td className="grid-cell" role="gridcell" key={j}>
            <span
              onClick={() => this.onClickCell(col)}
              className={col.className}
              title={col.value}>
              {col.text}
            </span>
          </td>
        );
      });

      return (
        <tr role="row" key={i} >{tds}</tr>
      );
    });
  }

  render() {
    return (
      <tbody>
        {this.getTbody()}
      </tbody>
    );
  }

}
