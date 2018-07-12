import React, { PureComponent } from 'react';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import isWithinRange from 'date-fns/is_within_range';

import {
  goDays,
  isSameDate,
  isBeforeMonth,
  isAfterMonth,
  formatDate,
} from '../utils/';
import { CURRENT } from '../constants';
import PanelCell from '../common/PanelCell';

const ROW = 6;
const COL = 7;

export default class DatePanelBody extends PureComponent {
  isSelected(val) {
    const { selected, disableSelectedHighlight } = this.props;
    if (!selected || disableSelectedHighlight) return false;

    if (isArray(selected)) {
      return selected.some(item => isSameDate(val, item));
    }

    return isSameDate(val, selected);
  }

  isInSelect(val) {
    const { selected, disableSelectedHighlight } = this.props;

    if (isArray(selected) && selected[0] && selected[1]) {
      const [start, end] = selected;
      const inRange = val > start && val < end;
      if (disableSelectedHighlight) {
        // If selected highligh is disabled, highlight as a part of the selected range
        return inRange || isSameDate(val, start) || isSameDate(val, end);
      }

      return inRange && !isSameDate(val, end);
    }

    return false;
  }

  isInRange(val) {
    const { range } = this.props;
    if (isArray(range) && range[0] && range[1]) {
      return isWithinRange(val, range[0], range[1]);
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
          'panel__cell--in-selected': isInSelect,
        });
        days[rowIndex][colIndex] = {
          text: val.getDate(),
          value: val,
          title: formatDate(val, 'YYYY-MM-DD'),
          isDisabled,
          className,
        };
        index++;
      }
    }

    return days;
  }

  render() {
    const { onSelect, onHover, i18n } = this.props;
    const days = this.getDays();

    return (
      <div className="date-table panel-table">
        <ul className="panel-table__row panel-table__head">
          {i18n.panel.dayNames.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <PanelCell onSelect={onSelect} onHover={onHover} cells={days} />
      </div>
    );
  }
}
