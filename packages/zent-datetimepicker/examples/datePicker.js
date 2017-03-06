import React, { Component } from 'react';
import { DatePicker } from '../src';
import '../assets/reset.scss';
import '../assets/index.scss';
import 'zent-icon/lib/index.css';

export default class Simple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      value: new Date()
    };
  }
  isDisabledDate(val) {
    if (val.getMonth() % 2 === 0) {
      return true;
    }
  }
  isDisabledTime() {
    const disabledHour = (val) => {
      return val < 12;
    };
    const disabledMinute = (val) => {
      return val > 30;
    };
    const disabledSecond = (val) => {
      return val < 20;
    };
    return {
      disabledHour,
      disabledMinute,
      disabledSecond
    };
  }
  onChangeDate = (val) => {
    this.setState({
      value: val,
      logs: [...this.state.logs, `选择日期 ${val}`]
    });
  }
  reset = () => {
    this.setState({
      value: ''
    });
  }
  render() {
    const state = this.state;
    const logList = state.logs.map((log, i) => {
      return (
        <li key={i}>{log}</li>
      );
    });
    return (
      <div>
        <p>disabled</p>
        <DatePicker
          format="yyyy-mm-dd"
          disabledTime={this.isDisabledTime}
          disabled
          value={state.value}
          onChange={this.onChangeDate}
        />
        <br /><br />
        <DatePicker
          format="yyyy-mm-dd"
          min="2017.01.01"
          max="2017.11.11"
          disabledTime={this.isDisabledTime}
          onChange={this.onChangeDate}
          value={state.value}
        />
        <button type="button" onClick={this.reset}>reset</button>
        <br /><br />
        <DatePicker
          showTime
          format="yyyy-mm-dd HH:MM:ss"
          placeholder="请选择日期和时间"
          disabledDate={this.isDisabledDate}
          disabledTime={this.isDisabledTime}
          onChange={this.onChangeDate}
          value={state.value}
        />
        <br /><br />
        <ul>
          {logList}
        </ul>
      </div>
    );
  }
}
