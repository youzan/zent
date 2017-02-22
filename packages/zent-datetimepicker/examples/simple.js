import React, { Component } from 'react';
import { DatePicker, MonthPicker, DateRangePicker } from '../src';
import '../assets/reset.scss';
import '../assets/index.scss';
import 'zent-icon/lib/index.css';

export default class Simple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      value: new Date(),
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
  isDisabledRangeTime(type) {
    const disabledHour = (val) => {
      return type === 'start' ? val < 12 : val > 12;
    };
    const disabledMinute = (val) => {
      return type === 'start' ? val > 30 : val > 30;
    };
    const disabledSecond = (val) => {
      return type === 'start' ? val < 20 : val > 40;
    };
    return {
      disabledHour,
      disabledMinute,
      disabledSecond
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
        <MonthPicker
          onChange={this.onChangeTime}
        />
        <br /><br />
        <DateRangePicker
          disabledDate={this.state.range}
          onChange={this.onChangeRange}
        />
        <br />
        <br />
        <DateRangePicker
          showTime
          disabledDate={this.state.range}
          disabledTime={this.isDisabledRangeTime}
          onChange={this.onChangeRange}
        />
        <ul>
          {logList}
        </ul>
      </div>
    );
  }
}
