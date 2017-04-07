import React, { Component, PropTypes } from 'react';
import { padLeft } from '../utils';
import HourPanel from './HourPanel';
import MinutePanel from './MinutePanel';
import SecondPanel from './SecondPanel';

const stateMap = {
  hour: 'openHour',
  minute: 'openMinute',
  second: 'openSecond'
};

export default class TimePanel extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    actived: PropTypes.instanceOf(Date),
    onOpen: PropTypes.func,
    onClose: PropTypes.func
  }

  state = {
    openHour: false,
    openMinute: false,
    openSecond: false
  }

  componentWillReceiveProps(next) {
    if (next.hidePanel) {
      this.hideAllPanel();
    }
  }

  onSelectTime(type) {
    return (val) => {
      this.props.onChange(val, type);
      this.hidePanel(type)();
    };
  }

  openPanel = (type) => {
    return () => {
      const key = stateMap[type];
      this.setState({
        [key]: true
      });

      this.props.onOpen && this.props.onOpen();
    };
  }

  hidePanel = (type) => {
    return () => {
      const key = stateMap[type];
      this.setState({
        [key]: false
      });

      this.props.onClose && this.props.onClose();
    };
  }

  hideAllPanel() {
    this.setState({
      openHour: false,
      openMinute: false,
      openSecond: false
    });
  }

  render() {
    const { openHour, openMinute, openSecond } = this.state;
    const { actived, disabledTime } = this.props;

    return (
      <div className="time-panel">
        {openHour &&
          <HourPanel
            selected={actived}
            disabledHour={disabledTime && disabledTime.disabledHour}
            onSelect={this.onSelectTime('hour')}
            hidePanel={this.hidePanel('hour')}
          />
        }
        {openMinute &&
          <MinutePanel
            selected={actived}
            disabledMinute={disabledTime && disabledTime.disabledMinute}
            onSelect={this.onSelectTime('minute')}
            hidePanel={this.hidePanel('minute')}
          />
        }
        {openSecond &&
          <SecondPanel
            selected={actived}
            disabledSecond={disabledTime && disabledTime.disabledSecond}
            onSelect={this.onSelectTime('second')}
            hidePanel={this.hidePanel('second')}
          />
        }

        <div className="time-panel__preview">
          <span className="time__number" onClick={this.openPanel('hour')}>{padLeft(actived.getHours())} 时</span>
          <span className="time__number" onClick={this.openPanel('minute')}>{padLeft(actived.getMinutes())} 分</span>
          <span className="time__number" onClick={this.openPanel('second')}>{padLeft(actived.getSeconds())} 秒</span>
        </div>
      </div>
    );
  }
}
