import React, { Component } from 'react';
import { padLeft } from '../utils';
import HourPanel from './HourPanel';
import MinutePanel from './MinutePanel';
import SecondPanel from './SecondPanel';

function noop() { }

const stateMap = {
  hour: 'openHour',
  minute: 'openMinute',
  second: 'openSecond'
};

export default class TimePanel extends Component {
  static defaultProps = {
    onChange: noop
  }
  constructor(props) {
    super(props);
    this.state = {
      openHour: false,
      openMinute: false,
      openSecond: false,
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
      openHour: false,
      time
    });
    this.props.onChange(time);
  }
  onSelectMinute = (val) => {
    let time = new Date(this.state.time);
    time.setMinutes(val);
    this.setState({
      openMinute: false,
      time
    });
    this.props.onChange(time);
  }
  onSelectSecond = (val) => {
    let time = new Date(this.state.time);
    time.setSeconds(val);
    this.setState({
      openSecond: false,
      time
    });
    this.props.onChange(time);
  }
  openHour = () => {
    this.setState({
      openHour: true
    });
  }
  openMinute = () => {
    this.setState({
      openMinute: true
    });
  }
  openSecond = () => {
    this.setState({
      openSecond: true
    });
  }
  hidePanel = (type) => {
    const key = stateMap[type];
    this.setState({
      [key]: false
    });
  }
  render() {
    const { time, openHour, openMinute, openSecond } = this.state;
    const disabledTime = this.props.disabledTime || {};
    return (
      <div className="time-panel">
        {openHour ? <HourPanel disabledHour={disabledTime.disabledHour} onSelect={this.onSelectHour} selected={time} hidePanel={this.hidePanel} /> : null}
        {openMinute ? <MinutePanel disabledMinute={disabledTime.disabledMinute} onSelect={this.onSelectMinute} selected={time} hidePanel={this.hidePanel} /> : null}
        {openSecond ? <SecondPanel disabledSecond={disabledTime.disabledSecond} onSelect={this.onSelectSecond} selected={time} hidePanel={this.hidePanel} /> : null}

        <div className="time-panel__preview">
          <span className="time__number" onClick={this.openHour}>{padLeft(time.getHours())}</span>
          <span className="time__diliver">:</span>
          <span className="time__number" onClick={this.openMinute}>{padLeft(time.getMinutes())}</span>
          <span className="time__diliver">:</span>
          <span className="time__number" onClick={this.openSecond}>{padLeft(time.getSeconds())}</span>
        </div>
      </div>
    );
  }
}
