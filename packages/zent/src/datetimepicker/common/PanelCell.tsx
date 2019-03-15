import * as React from 'react';
import { PureComponent } from 'react';
import { noop } from '../constants';
import { DatePickers } from './types';

export interface IPanelCellProps {
  onHover: (value: Date) => void;
  onSelect: (value: Date) => void;
  cells: DatePickers.IPanelCellValue[][];
}

export default class PanelCell extends PureComponent<IPanelCellProps> {
  static defaultProps = {
    onHover: noop,
  };

  onClickCell = cell => {
    !cell.isDisabled && this.props.onSelect(cell.value);
  };

  getTbody() {
    const { cells, onHover } = this.props;
    return cells.map((row, i) => {
      const tds = row.map((col, j) => {
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
