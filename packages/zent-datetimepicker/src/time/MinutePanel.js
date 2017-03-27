import React, { Component } from 'react';
import classNames from 'zent-utils/classnames';

import PanelHeader from '../common/PanelHeader';
import TimeCell from './TimeCell';
import { CURRENT, padLeft } from '../utils';

const ROW = 9;
const COL = 7;

export default class MinutePanel extends Component {
  isDisabled(val) {
    const { disabledMinute } = this.props;
    if (typeof disabledMinute === 'function') {
      return disabledMinute(val);
    }
  }

  isSelected(val) {
    const { selected } = this.props;
    return selected.getMinutes() === val;
  }

  isCurrent(val) {
    return CURRENT.getMinutes() === val;
  }

  getMinutes() {
    const cells = [];
    let i = 0;
    for (let j = 0; j < ROW; j++) {
      cells[j] = [];
      for (let k = 0; k < COL && i < 60; k++) {
        const isDisabled = this.isDisabled(i);
        const isSelected = this.isSelected(i);
        const isCurrent = this.isCurrent(i);
        let className = classNames({
          'panel__cell time-panel__cell': true,
          'panel__cell--disabled': isDisabled,
          'panel__cell--selected': isSelected,
          'panel__cell--current': isCurrent
        });
        cells[j][k] = {
          text: padLeft(i),
          value: i,
          isDisabled,
          className
        };
        i++;
      }
    }

    return cells;
  }

  render() {
    const { hidePanel, onSelect } = this.props;
    const minutes = this.getMinutes();
    const title = '选择分钟';

    return (
      <div className="minute-panel">
        <PanelHeader title={title} showNext={false} prev={hidePanel} />
        <div className="minute-table panel-table">
          <TimeCell cells={minutes} onSelect={onSelect} />
        </div>
      </div>

    );
  }
}
