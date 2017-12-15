import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import PanelCell from '../common/PanelCell';
import { getSeasonFromDate } from '../utils/date';

const ROW = 2;
const COL = 2;

export default class SeasonPanelBody extends (PureComponent || Component) {
  getSeasons() {
    const { disabledDate, selected } = this.props;
    const seasons = [];
    let index = 0;
    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      seasons[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        const isSelected = selected && getSeasonFromDate(selected) === index;
        const isDisabled = disabledDate && disabledDate(index);
        const className = classNames({
          'panel__cell season-panel__cell': true,
          'panel__cell--current': false,
          'panel__cell--selected': isSelected,
          'panel__cell--disabled': isDisabled
        });
        seasons[rowIndex][colIndex] = {
          text: `${index + 1}季度`,
          value: index,
          title: `${index + 1}季度`,
          className,
          isDisabled
        };
        index++;
      }
    }

    return seasons;
  }

  render() {
    const { onSelect } = this.props;
    const seasons = this.getSeasons();

    return (
      <div className="season-table panel-table">
        <PanelCell onSelect={onSelect} cells={seasons} />
      </div>
    );
  }
}
