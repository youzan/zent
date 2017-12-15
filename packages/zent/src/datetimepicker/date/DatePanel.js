import React, { Component, PureComponent } from 'react';
import formatDate from 'zan-utils/date/formatDate';

import { I18nReciever as Reciever } from 'i18n';
import { TimePicker as I18nDefault } from 'i18n/default';

import DatePanelBody from './DatePanelBody';
import MonthPanel from '../month/MonthPanel';
import TimePanel from '../time/TimePanel';
import PanelHeader from '../common/PanelHeader';

export default class DatePanel extends (PureComponent || Component) {
  static defaultProps = {
    showPrev: true,
    showNext: true
  };

  state = {
    showMonth: false
  };

  showMonth = () => {
    this.setState({
      showMonth: true
    });
  };

  /*
   * 在 monthPicker 的时候选择年不隐藏 monthPanel.
   */
  onSelectMonth = (val, hide) => {
    this.props.onChange(val);
    this.setState({
      showMonth: hide || false
    });
  };

  render() {
    const { state, props } = this;
    let monthPanel;
    let timePanel;
    if (state.showMonth) {
      monthPanel = (
        <MonthPanel
          actived={props.actived}
          selected={props.selected}
          onChange={this.onSelectMonth}
          onSelect={this.onSelectMonth}
        />
      );
    }
    if (props.showTime) {
      timePanel = <TimePanel {...props.showTime} />;
    }

    return (
      <div className="date-panel">
        <Reciever componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => (
            <PanelHeader
              title={formatDate(
                props.actived,
                i18n.panel.titleFormat,
                i18n.i18nMark
              )}
              onClickTitle={this.showMonth}
              prev={props.onPrev}
              next={props.onNext}
              showPrev={props.showPrev}
              showNext={props.showNext}
            />
          )}
        </Reciever>
        <DatePanelBody
          actived={props.actived}
          range={props.range}
          selected={props.selected}
          disabledDate={props.disabledDate}
          onSelect={props.onSelect}
          onHover={props.onHover}
        />
        {state.showMonth && monthPanel}
        {props.showTime && timePanel}
      </div>
    );
  }
}
