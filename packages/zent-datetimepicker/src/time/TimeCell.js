import React, { Component } from 'react';
import { CELL_PROPS } from '../constants';

export default class TimeCell extends Component {
  static defaultProps = CELL_PROPS
  onClickCell = (cell) => {
    !cell.isDisabled && this.props.onSelect(cell.value);
  }
  render() {
    const { cells } = this.props;
    let trs = cells.map((row, i) => {
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
    return (
      <tbody>
        {trs}
      </tbody>
    );
  }

}
