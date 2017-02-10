import React, { Component } from 'react';
import { goDays, isSameDate, isBeforeMonth, isAfterMonth, CURRENT } from '../utils/';
import classNames from 'zent-utils/classnames';
import PanelCell from '../common/PanelCell';

const ROW = 6;
const COL = 7;

export default class DatePanelBody extends Component {
  isSelected(val) {
    if (!this.props.selected) {
      return false;
    }
    const selectedDate = this.props.selected;
    if (Array.isArray(selectedDate)) {
      let i = 0;
      selectedDate.forEach((item) => {
        isSameDate(val, item) ? i++ : '';
      });
      return i > 0;
    }
    return isSameDate(val, selectedDate);
  }
  isInRange(val) {
    const { range } = this.props;
    if (Array.isArray(range) && range[0] && range[1]) {
      if (val > range[0] && val < range[1]) {
        return true;
      }
    }
    return false;
  }
  days() {
    const props = this.props;
    let days = [];
    let index = 0;
    let copy = new Date(props.actived.getFullYear(), props.actived.getMonth(), props.actived.getDate());
    let firstDay = new Date(copy.setDate(1));
    let diff = parseInt(firstDay.getDay(), 10);
    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      days[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        const val = goDays(firstDay, index - diff);
        const isBefore = isBeforeMonth(val, props.actived);
        const isAfter = isAfterMonth(val, props.actived);
        const isCurrent = isSameDate(val, CURRENT);
        const isDisabled = props.disabledDate(val);
        const isSelected = this.isSelected(val);
        const isInRange = this.isInRange(val);
        const className = classNames({
          'panel__cell date-panel__cell': true,
          'panel__cell--different': isBefore || isAfter,
          'panel__cell--current': !isDisabled && isCurrent,
          'panel__cell--disabled': isDisabled,
          'panel__cell--selected': isSelected,
          'panel__cell--in-range': isInRange
        });
        days[rowIndex][colIndex] = {
          text: val.getDate(),
          value: val,
          isDisabled,
          className
        };
        index++;
      }
    }
    return days;
  }

  render() {
    const props = this.props;
    const days = this.days();
    return (
      <table className="date-table panel__table">
        <thead>
          <tr>
            <th>日</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
          </tr>
        </thead>
        <PanelCell onSelect={props.onSelect} onHover={props.onHover} cells={days} />
      </table>
    );
  }
}
