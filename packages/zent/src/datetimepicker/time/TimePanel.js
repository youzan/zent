import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { padLeft, isSameDate } from '../utils';
import HourPanel from './HourPanel';
import MinutePanel from './MinutePanel';
import SecondPanel from './SecondPanel';

const stateMap = {
  hour: 'openHour',
  minute: 'openMinute',
  second: 'openSecond',
};

const disabledMap = {
  hour: 'disabledHour',
  minute: 'disabledMinute',
  second: 'disabledSecond',
};

export default class TimePanel extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    actived: PropTypes.instanceOf(Date),
  };

  state = {
    openHour: false,
    openMinute: false,
    openSecond: false,
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
      this.setState({ [key]: true });
    };
  };

  hidePanel = type => {
    return () => {
      const key = stateMap[type];
      this.setState({ [key]: false });
    };
  };

  isDisabled = type => {
    const { disabledTime, min, max, actived } = this.props;
    let fns;
    if (disabledTime) {
      return disabledTime[disabledMap[type]];
    }

    if (min && max && isSameDate(min, actived) && isSameDate(max, actived)) {
      fns = {
        hour: val => val < min.getHours() || val > max.getHours(),
        minute: val =>
          (actived.getHours() === min.getHours() && val < min.getMinutes()) ||
          (actived.getHours() === max.getHours() && val > max.getMinutes()),
        second: val =>
          (actived.getHours() === min.getHours() &&
            actived.getMinutes() === min.getMinutes() &&
            val < min.getSeconds()) ||
          (actived.getHours() === max.getHours() &&
            actived.getMinutes() === max.getMinutes() &&
            val > max.getSeconds()),
      };
      return fns[type];
    }

    if (min && isSameDate(min, actived)) {
      fns = {
        hour: val => val < min.getHours(),
        minute: val =>
          actived.getHours() === min.getHours() && val < min.getMinutes(),
        second: val =>
          actived.getHours() === min.getHours() &&
          actived.getMinutes() === min.getMinutes() &&
          val < min.getSeconds(),
      };
      return fns[type];
    }

    if (max && isSameDate(max, actived)) {
      fns = {
        hour: val => val > max.getHours(),
        minute: val => val > max.getMinutes(),
        second: val => val > max.getSeconds(),
      };
      return fns[type];
    }
  };

  render() {
    const {
      state: { openHour, openMinute, openSecond },
      props: { actived, i18n },
    } = this;

    return (
      <div className="time-panel">
        {openHour && (
          <HourPanel
            className="panel-content"
            selected={actived}
            isDisabled={this.isDisabled('hour')}
            onSelect={this.onSelectTime('hour')}
            hidePanel={this.hidePanel('hour')}
            i18n={i18n}
          />
        )}
        {openMinute && (
          <MinutePanel
            className="panel-content"
            selected={actived}
            isDisabled={this.isDisabled('minute')}
            onSelect={this.onSelectTime('minute')}
            hidePanel={this.hidePanel('minute')}
            i18n={i18n}
          />
        )}
        {openSecond && (
          <SecondPanel
            className="panel-content"
            selected={actived}
            isDisabled={this.isDisabled('second')}
            onSelect={this.onSelectTime('second')}
            hidePanel={this.hidePanel('second')}
            i18n={i18n}
          />
        )}

        <div className="time-panel__preview">
          <span className="time__number" onClick={this.openPanel('hour')}>
            {padLeft(actived.getHours())}
            {i18n.panel.hour}
          </span>
          <span className="time__number" onClick={this.openPanel('minute')}>
            {padLeft(actived.getMinutes())}
            {i18n.panel.minute}
          </span>
          <span className="time__number" onClick={this.openPanel('second')}>
            {padLeft(actived.getSeconds())}
            {i18n.panel.second}
          </span>
        </div>
      </div>
    );
  }
}
