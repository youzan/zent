import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import formatDate from 'zan-utils/date/formatDate';

import {
  goDays,
  isSameDate,
  isBeforeMonth,
  isAfterMonth,
  CURRENT
} from '../utils/';
import PanelCell from '../common/PanelCell';

const ROW = 6;
const COL = 7;

export default class DatePanelBody extends (PureComponent || Component) {
  isSelected(val) {
    const { selected } = this.props;
    if (!selected) return false;

    if (Array.isArray(selected)) {
      let i = 0;
      selected.forEach(item => {
        isSameDate(val, item) ? i++ : '';
      });
      return i > 0;
    }

    return isSameDate(val, selected);
  }

  isInSelect(val) {
    const { selected } = this.props;
    if (Array.isArray(selected) && selected[0] && selected[1]) {
      if (val > selected[0] && val < selected[1]) {
        return true;
      }
    }

    return false;
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

  getDays() {
    const { actived, disabledDate } = this.props;
    const days = [];
    const copy = new Date(
      actived.getFullYear(),
      actived.getMonth(),
      actived.getDate(),
      actived.getHours(),
      actived.getMinutes(),
      actived.getSeconds()
    );
    const firstDay = new Date(copy.setDate(1));
    const diff = parseInt(firstDay.getDay(), 10);
    let index = 0;

    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      days[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        const val = goDays(firstDay, index - diff);
        const isBefore = isBeforeMonth(val, actived);
        const isAfter = isAfterMonth(val, actived);
        const isCurrent = isSameDate(val, CURRENT);
        const isDisabled = disabledDate(val);
        const isSelected = this.isSelected(val);
        const isInSelect = this.isInSelect(val);
        const isInRange = this.isInRange(val);
        const className = classNames({
          'panel__cell date-panel__cell': true,
          'panel__cell--different': isBefore || isAfter,
          'panel__cell--current': !isDisabled && isCurrent,
          'panel__cell--disabled': isDisabled,
          'panel__cell--selected': isSelected,
          'panel__cell--in-range': isInRange,
          'panel__cell--in-selected': isInSelect
        });
        days[rowIndex][colIndex] = {
          text: val.getDate(),
          value: val,
          title: formatDate(val, 'YYYY-MM-DD'),
          isDisabled,
          className
        };
        index++;
      }
    }

    return days;
  }

  getThead() {
    const arr = ['日', '一', '二', '三', '四', '五', '六'];

    return arr.map((item, i) => {
      return <li key={i}>{item}</li>;
    });
  }

  render() {
    const { onSelect, onHover } = this.props;
    const days = this.getDays();

    return (
      <div className="date-table panel-table">
        <ul className="panel-table__row panel-table__head">
          {this.getThead()}
        </ul>
        <PanelCell onSelect={onSelect} onHover={onHover} cells={days} />
      </div>
    );
  }
}
