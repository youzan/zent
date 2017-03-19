import React, { Component, PropTypes } from 'react';
import { noop } from '../constants';

export default class PanelCell extends Component {
  static PropTypes = {
    onHover: PropTypes.func,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    onHover: noop
  }

  onClickCell = (cell) => {
    !cell.isDisabled && this.props.onSelect(cell.value);
  }

  getTbody() {
    const { cells, onHover } = this.props;
    return cells.map((row, i) => {
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
  }

  render() {
    return (
      <tbody>
        {this.getTbody()}
      </tbody>
    );
  }

}
