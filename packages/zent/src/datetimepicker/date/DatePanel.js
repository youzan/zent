import React, { PureComponent } from 'react';

import { formatDate } from '../utils';
import DatePanelBody from './DatePanelBody';
import MonthPanel from '../month/MonthPanel';
import TimePanel from '../time/TimePanel';
import PanelHeader from '../common/PanelHeader';

export default class DatePanel extends PureComponent {
  static defaultProps = {
    showPrev: true,
    showNext: true,
  };

  state = {
    showMonth: false,
  };

  showMonth = () => {
    this.setState({
      showMonth: true,
    });
  };

  /*
   * 在 monthPicker 的时候选择年不隐藏 monthPanel.
   */
  onSelectMonth = (val, hide) => {
    this.props.onChange(val);
    this.setState({
      showMonth: hide || false,
    });
  };

  render() {
    const {
      props: {
        actived,
        disabledDate,
        i18n,
        onHover,
        onNext,
        onPrev,
        onSelect,
        range,
        selected,
        showNext,
        showPrev,
        showTime,
        disableSelectedHighlight,
      },
      state: { showMonth },
    } = this;

    let monthPanel;
    let timePanel;
    if (showMonth) {
      monthPanel = (
        <MonthPanel
          actived={actived}
          selected={selected}
          onChange={this.onSelectMonth}
          onSelect={this.onSelectMonth}
          i18n={i18n}
        />
      );
    }
    if (showTime) {
      timePanel = <TimePanel {...showTime} i18n={i18n} />;
    }

    return (
      <div className="date-panel">
        <PanelHeader
          title={formatDate(actived, i18n.panel.titleFormat)}
          onClickTitle={this.showMonth}
          prev={onPrev}
          next={onNext}
          showPrev={showPrev}
          showNext={showNext}
        />
        <DatePanelBody
          disableSelectedHighlight={disableSelectedHighlight}
          actived={actived}
          range={range}
          selected={selected}
          disabledDate={disabledDate}
          onSelect={onSelect}
          onHover={onHover}
          i18n={i18n}
        />
        {showMonth && monthPanel}
        {showTime && timePanel}
      </div>
    );
  }
}
