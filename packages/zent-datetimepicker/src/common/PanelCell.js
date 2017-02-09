import React, { Component } from 'react';
import { CELL_PROPS } from '../constants';

export default class PanelCell extends Component {
  static defaultProps = CELL_PROPS
  onClickCell = (cell) => {
    !cell.isDisabled && this.props.onSelect(cell.value);
  }
  render() {
    const { cells, onHover } = this.props;
    let trs = cells.map((row, i) => {
      let tds = row.map((col, j) => {
        return (
          <td className="grid-cell" role="gridcell" key={j}>
            <div
              onClick={() => this.onClickCell(col)}
              onMouseOver={() => onHover(col.value)}
              className={col.className}
              title={col.value}>
              {col.text}
            </div>
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
