import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import PanelCell from '../common/PanelCell';
import { CURRENT_MONTH } from '../utils/';

const ROW = 4;
const COL = 3;

export default class MonthPanelBody extends (PureComponent || Component) {
  isSelected(val) {
    const { selected } = this.props;

    if (selected && selected instanceof Date) {
      return val === selected.getMonth();
    }
  }

  getMonths() {
    const { disabledDate } = this.props;
    const months = [];
    let index = 0;
    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      months[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        const isCurrent = index === CURRENT_MONTH;
        const isSelected = this.isSelected(index);
        const isDisabled = disabledDate && disabledDate(index);
        const className = classNames({
          'panel__cell month-panel__cell': true,
          'panel__cell--current': isCurrent,
          'panel__cell--selected': isSelected,
          'panel__cell--disabled': isDisabled
        });
        months[rowIndex][colIndex] = {
          text: `${index + 1}月`,
          value: index,
          title: `${index + 1}月`,
          className,
          isDisabled
        };
        index++;
      }
    }

    return months;
  }

  render() {
    const { onSelect } = this.props;
    const months = this.getMonths();

    return (
      <div className="month-table panel-table">
        <PanelCell onSelect={onSelect} cells={months} />
      </div>
    );
  }
}
