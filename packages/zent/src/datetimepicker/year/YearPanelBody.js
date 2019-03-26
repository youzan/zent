import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { CURRENT_YEAR } from '../constants';
import PanelCell from '../common/PanelCell';

const ROW = 4;
const COL = 3;

export default class YearPanelBody extends PureComponent {
  static propTypes = {
    actived: PropTypes.instanceOf(Date),
    onSelect: PropTypes.func,
  };

  getYears() {
    const years = [];
    let index = 0;
    const { actived, selected, disabledDate } = this.props;
    const beginYear = actived.getFullYear() - 4;

    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      years[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        const val = beginYear + index;
        const isCurrent = val === CURRENT_YEAR;
        const isSelected =
          selected instanceof Date && selected.getFullYear() === val;
        const isDisabled = disabledDate && disabledDate(val);
        const className = classNames({
          'year-panel__cell panel__cell': true,
          'panel__cell--current': isCurrent,
          'panel__cell--selected': isSelected,
          'panel__cell--disabled': isDisabled,
        });
        years[rowIndex][colIndex] = {
          text: val,
          value: val,
          title: `${val}`,
          className,
          isDisabled,
        };
        index++;
      }
    }

    return years;
  }

  render() {
    const { onSelect } = this.props;
    const years = this.getYears();

    return (
      <div className="year-table panel-table">
        <PanelCell onSelect={onSelect} cells={years} />
      </div>
    );
  }
}
