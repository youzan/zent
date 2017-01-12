import React, { Component } from 'react';
import { format } from '../utils/format';
import HourSelect from './HourSelect';
import MinuteSelect from './MinuteSelect';
import SecondSelect from './SecondSelect';

function noop() { }

export default class TimePanel extends Component {
  static defaultProps = {
    onChange: noop
  }
  constructor(props) {
    super(props);
    this.state = {
      time: props.actived
    };
  }
  componentWillReceiveProps(next) {
    if ('actived' in next) {
      this.setState({
        time: next.actived
      });
    }
  }
  onSelectHour = (val) => {
    let time = new Date(this.state.time);
    time.setHours(val);
    this.setState({
      time
    });
    this.props.onChange(time);
  }
  onSelectMinute = (val) => {
    let time = new Date(this.state.time);
    time.setMinutes(val);
    this.setState({
      time
    });
    this.props.onChange(time);
  }
  onSelectSecond = (val) => {
    let time = new Date(this.state.time);
    time.setSeconds(val);
    this.setState({
      time
    });
    this.props.onChange(time);
  }
  render() {
    const { time } = this.state;
    const disabledTime = this.props.disabledTime || {};
    return (
      <div className="time-panel">
        <div className="time-panel__select">
          <HourSelect disabledHour={disabledTime.disabledHour} onSelect={this.onSelectHour} selected={time} />
          <MinuteSelect disabledMinute={disabledTime.disabledMinute} onSelect={this.onSelectMinute} selected={time} />
          <SecondSelect disabledSecond={disabledTime.disabledSecond} onSelect={this.onSelectSecond} selected={time} />
        </div>
        <div className="time-panel__preview">
          {format(time, this.props.format)}
        </div>
      </div>
    );
  }
}
