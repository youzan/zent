import * as React from 'react';
import { PureComponent } from 'react';
import { noop } from '../constants';
import { DatePickers } from '../common/types';

export interface ITimeCellProps {
  onSelect: (val) => void;
  cells: DatePickers.ITimeCellValue[][];
}

export default class TimeCell extends PureComponent<ITimeCellProps> {
  static defaultProps = {
    onSelect: noop,
  };

  onClickCell = cell => {
    !cell.isDisabled && this.props.onSelect(cell.value);
  };

  getTbody() {
    const { cells } = this.props;
    return cells.map((row, i) => {
      const tds = row.map((col, j) => {
        return (
          <li className="grid-cell" role="gridcell" key={j}>
            <span
              onClick={() => this.onClickCell(col)}
              className={col.className}
              title={`${col.value}`}
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
