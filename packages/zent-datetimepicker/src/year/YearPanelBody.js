import React, { Component } from 'react';
import { CURRENT_YEAR } from '../utils/';
import classNames from 'zent-utils/classnames';
import PanelCell from '../common/PanelCell';

const ROW = 4;
const COL = 3;

export default class YearPanelBody extends Component {
  isSelected(val) {
    return this.props.actived.getFullYear() === val;
  }
  getYears() {
    let years = [];
    let index = 0;
    const actived = this.props.actived;
    const beginYear = actived.getFullYear() - 4;
    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      years[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        const val = beginYear + index;
        const isCurrent = val === CURRENT_YEAR;
        const isSelected = this.isSelected(val);
        const className = classNames({
          'year-panel__cell panel__cell': true,
          'panel__cell--current': isCurrent,
          'panel__cell--selected': isSelected
        });
        years[rowIndex][colIndex] = {
          text: val,
          value: val,
          className
        };
        index++;
      }
    }
    return years;
  }

  render() {
    let years = this.getYears();
    return (
      <table className="year-table panel__table">
        <PanelCell onSelect={this.props.onSelect} cells={years} />
      </table>
    );
  }
}
