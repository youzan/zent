import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import PanelCell from '../common/PanelCell';
import { getQuaterFromDate } from '../utils/date';

const ROW = 2;
const COL = 2;

export default class QuaterPanelBody extends (PureComponent || Component) {
  getQuaters() {
    const { disabledDate, selected, i18n } = this.props;
    const quaters = [];
    let index = 0;
    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      quaters[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        const isSelected = selected && getQuaterFromDate(selected) === index;
        const isDisabled = disabledDate && disabledDate(index);
        const className = classNames({
          'panel__cell quater-panel__cell': true,
          'panel__cell--current': false,
          'panel__cell--selected': isSelected,
          'panel__cell--disabled': isDisabled
        });
        quaters[rowIndex][colIndex] = {
          text: i18n.panel.quaterNames[index],
          value: index,
          title: i18n.panel.quaterNames[index],
          className,
          isDisabled
        };
        index++;
      }
    }

    return quaters;
  }

  render() {
    const { onSelect } = this.props;
    const quaters = this.getQuaters();

    return (
      <div className="quater-table panel-table">
        <PanelCell onSelect={onSelect} cells={quaters} />
      </div>
    );
  }
}
