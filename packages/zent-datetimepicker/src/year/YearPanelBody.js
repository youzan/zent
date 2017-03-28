import React, { Component, PropTypes } from 'react';
import { CURRENT_YEAR } from '../utils/';
import classNames from 'zent-utils/classnames';
import PanelCell from '../common/PanelCell';

const ROW = 4;
const COL = 3;

export default class YearPanelBody extends Component {
  static PropTypes = {
    actived: PropTypes.instanceOf(Date),
    onSelect: PropTypes.func
  }

  isSelected(val) {
    return this.props.actived.getFullYear() === val;
  }

  getYears() {
    const years = [];
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
    const years = this.getYears();
    const { onSelect } = this.props;

    return (
      <div className="year-table panel-table">
        <PanelCell onSelect={onSelect} cells={years} />
      </div>
    );
  }
}
