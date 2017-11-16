import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { padLeft, isSameDate } from '../utils';
import HourPanel from './HourPanel';
import MinutePanel from './MinutePanel';
import SecondPanel from './SecondPanel';

const stateMap = {
  hour: 'openHour',
  minute: 'openMinute',
  second: 'openSecond'
};

const disabledMap = {
  hour: 'disabledHour',
  minute: 'disabledMinute',
  second: 'disabledSecond'
};

export default class TimePanel extends (PureComponent || Component) {
  static propTypes = {
    onChange: PropTypes.func,
    actived: PropTypes.instanceOf(Date)
  };

  state = {
    openHour: false,
    openMinute: false,
    openSecond: false
  };

  onSelectTime(type) {
    return val => {
      this.props.onChange(val, type);
      this.hidePanel(type)();
    };
  }

  openPanel = type => {
    return () => {
      const key = stateMap[type];
      this.setState({
        [key]: true
      });
    };
  };

  hidePanel = type => {
    return () => {
      const key = stateMap[type];
      this.setState({
        [key]: false
      });
    };
  };

  isDisabled = type => {
    const { disabledTime, min, max, actived } = this.props;
    let fns;
    if (disabledTime) {
      return disabledTime[disabledMap[type]];
    } else if (min && isSameDate(min, actived)) {
      fns = {
        hour: val => val < min.getHours(),
        minute: val =>
          actived.getHours() === min.getHours() && val < min.getMinutes(),
        second: val =>
          actived.getHours() === min.getHours() &&
          actived.getMinutes() === min.getMinutes() &&
          val < min.getSeconds()
      };
      return fns[type];
    } else if (max && isSameDate(max, actived)) {
      fns = {
        hour: val => val > max.getHours(),
        minute: val => val > max.getMinutes(),
        second: val => val > max.getSeconds()
      };
      return fns[type];
    }
  };

  render() {
    const { state, props } = this;
    const { openHour, openMinute, openSecond } = state;
    const { actived } = props;

    return (
      <div className="time-panel">
        {openHour && (
          <HourPanel
            selected={actived}
            isDisabled={this.isDisabled('hour')}
            onSelect={this.onSelectTime('hour')}
            hidePanel={this.hidePanel('hour')}
          />
        )}
        {openMinute && (
          <MinutePanel
            selected={actived}
            isDisabled={this.isDisabled('minute')}
            onSelect={this.onSelectTime('minute')}
            hidePanel={this.hidePanel('minute')}
          />
        )}
        {openSecond && (
          <SecondPanel
            selected={actived}
            isDisabled={this.isDisabled('second')}
            onSelect={this.onSelectTime('second')}
            hidePanel={this.hidePanel('second')}
          />
        )}

        <div className="time-panel__preview">
          <span className="time__number" onClick={this.openPanel('hour')}>
            {padLeft(actived.getHours())} 时
          </span>
          <span className="time__number" onClick={this.openPanel('minute')}>
            {padLeft(actived.getMinutes())} 分
          </span>
          <span className="time__number" onClick={this.openPanel('second')}>
            {padLeft(actived.getSeconds())} 秒
          </span>
        </div>
      </div>
    );
  }
}
