import React, { PureComponent } from 'react';
import classNames from 'classnames';

import PanelHeader from '../common/PanelHeader';
import TimeCell from './TimeCell';
import { padLeft } from '../utils';
import { CURRENT } from '../constants';

const ROW = 9;
const COL = 7;

export default class SecondPanel extends PureComponent {
  isSelected(val) {
    const { selected } = this.props;
    return selected.getSeconds() === val;
  }

  isCurrent(val) {
    return CURRENT.getSeconds() === val;
  }

  getSeconds() {
    const cells = [];
    let i = 0;
    for (let j = 0; j < ROW; j++) {
      for (let k = 0; k < COL && i < 60; k++) {
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
    const { hidePanel, onSelect, i18n, className, hideHeader } = this.props;
    const seconds = this.getSeconds();

    return (
      <div className={classNames('second-panel', className)}>
        {!hideHeader && (
          <PanelHeader
            title={i18n.panel.secondSelect}
            showNext={false}
            prev={hidePanel}
          />
        )}
        <div className="second-table panel-table">
          <TimeCell cells={seconds} onSelect={onSelect} />
        </div>
      </div>
    );
  }
}
