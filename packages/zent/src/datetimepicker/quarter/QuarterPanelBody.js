import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getQuarter from 'date-fns/get_quarter';

import PanelCell from '../common/PanelCell';

const ROW = 2;
const COL = 2;

export default class QuarterPanelBody extends PureComponent {
  getQuarters() {
    const { disabledDate, selected, i18n } = this.props;
    const quarters = [];
    let index = 0;
    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      quarters[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        const isSelected = selected && getQuarter(selected) === index + 1;
        const isDisabled = disabledDate && disabledDate(index);
        const className = classNames({
          'panel__cell quarter-panel__cell': true,
          'panel__cell--current': false,
          'panel__cell--selected': isSelected,
          'panel__cell--disabled': isDisabled,
        });
        quarters[rowIndex][colIndex] = {
          text: i18n.panel.quarterNames[index],
          value: index,
          title: i18n.panel.quarterNames[index],
          className,
          isDisabled,
        };
        index++;
      }
    }

    return quarters;
  }

  render() {
    const { onSelect } = this.props;
    const quarters = this.getQuarters();

    return (
      <div className="quarter-table panel-table">
        <PanelCell onSelect={onSelect} cells={quarters} />
      </div>
    );
  }
}
