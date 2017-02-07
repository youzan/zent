import React, { Component } from 'react';
import { DatePicker, TimePicker, MonthPicker, RangePicker } from '../src';
import '../assets/reset.scss';
import '../assets/index.scss';
import '@youzan/zent-icon/lib/index.css';

/*
## Write Something here

You can write guides for users here
*/

export default class Simple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      value: '2017.01.01',
      range: ['2017.01.01', '2017.06.01']
    };
  }
  isDisabledDate(val) {
    if (val.getMonth() < 6) {
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
  getTimeConfig = () => {
    return {
      format: 'HH:MM'
    };
  }
  onChangeMonth = (val) => {
    this.setState({
      logs: [...this.state.logs, `选择月份 ${val}`]
    });
  }
  onChangeDate = (val) => {
    this.setState({
      value: val,
      logs: [...this.state.logs, `选择日期 ${val}`]
    });
  }
  onChangeTime = (val) => {
    this.setState({
      logs: [...this.state.logs, `选择时间 ${val}`]
    });
  }
  onChangeRange = (val) => {
    this.setState({
      logs: [...this.state.logs, `选择时间段 ${val.join('~')}`]
    });
  }
  reset = () => {
    this.setState({
      value: ''
    });
  }
  render() {
    const logList = this.state.logs.map((log, i) => {
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
          onChange={this.onChangeDate}
        />
        <br /><br />
        <DatePicker
          format="yyyy-mm-dd"
          min="2016.01.03"
          max="2017.01.06"
          disabledTime={this.isDisabledTime}
          onChange={this.onChangeDate}
          value={this.state.value}
        />
        <button type="button" onClick={this.reset}>reset</button>
        <br /><br />
        <DatePicker
          format="yyyy-mm-dd HH:MM:ss"
          showTime
          placeholder="请选择日期和时间"
          disabledDate={this.isDisabledDate}
          disabledTime={this.isDisabledTime}
          onChange={this.onChangeDate}
        />
        <br /><br />
        <TimePicker
          disabledTime={this.isDisabledTime}
          onChange={this.onChangeTime}
          format="HH:MM"
        />
        <br /><br />
        <MonthPicker
          onChange={this.onChangeTime}
        />
        <br /><br />
        <RangePicker disabledDate={this.state.range} onChange={this.onChangeRange} />
        <ul>
          {logList}
        </ul>
      </div>
    );
  }
}
