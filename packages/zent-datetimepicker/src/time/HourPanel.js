import React, { Component } from 'react';
import classNames from 'zent-utils/classnames';

import PanelHeader from '../common/PanelHeader';
import TimeCell from './TimeCell';
import { CURRENT, padLeft } from '../utils';

const ROW = 4;
const COL = 7;

export default class HourPanel extends Component {
  isDisabled(val) {
    const { disabledHour } = this.props;
    if (typeof disabledHour === 'function') {
      return disabledHour(val);
    }
  }

  isSelected(val) {
    const { selected } = this.props;
    return selected.getHours() === val;
  }

  isCurrent(val) {
    return CURRENT.getHours() === val;
  }

  getHours() {
    const cells = [];
    let i = 0;
    for (let j = 0; j < ROW; j++) {
      cells[j] = [];
      for (let k = 0; k < COL && i < 24; k++) {
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
    const hours = this.getHours();
    const title = '选择小时';

    return (
      <div className="hour-panel">
        <PanelHeader title={title} showNext={false} prev={hidePanel} />
        <div className="hour-table panel-table">
          <TimeCell cells={hours} onSelect={onSelect} />
        </div>
      </div>

    );
  }
}
