import React, { PureComponent } from 'react';
import classNames from 'classnames';

import PanelHeader from '../common/PanelHeader';
import TimeCell from './TimeCell';
import { padLeft } from '../utils';
import { CURRENT } from '../constants';

const ROW = 4;
const COL = 7;

export default class HourPanel extends PureComponent {
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
      for (let k = 0; k < COL && i < 24; k++) {
        const isDisabled = this.props.isDisabled && this.props.isDisabled(i);
        const isSelected = this.isSelected(i);
        const isCurrent = this.isCurrent(i);
        let className = classNames({
          'panel__cell time-panel__cell': true,
          'panel__cell--disabled': isDisabled,
          'panel__cell--selected': isSelected,
          'panel__cell--current': isCurrent,
        });
        cells[j] = cells[j] || [];
        cells[j][k] = {
          text: padLeft(i),
          value: i,
          isDisabled,
          className,
        };
        i += this.props.step || 1;
      }
    }

    return cells;
  }
  render() {
    const { hidePanel, i18n, onSelect, className, hideHeader } = this.props;
    const hours = this.getHours();

    return (
      <div className={classNames('hour-panel', className)}>
        {!hideHeader && (
          <PanelHeader
            title={i18n.panel.hourSelect}
            showNext={false}
            prev={hidePanel}
          />
        )}
        <div className="hour-table panel-table">
          <TimeCell cells={hours} onSelect={onSelect} />
        </div>
      </div>
    );
  }
}
