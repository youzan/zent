import React, { Component } from 'react';
import { DatePicker } from '../src';
// import '../assets/reset.scss';
import '../assets/index.scss';
import './example.scss';
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
          format="YYYY-MM-DD"
          disabledTime={this.isDisabledTime}
          disabled
          value={state.value}
          onChange={this.onChangeDate}
        />
        <br /><br />
        <DatePicker
          className="top-left"
          format="YYYY年MM月DD日"
          min="2017/01/01"
          max="2017/11/11"
          valueType="number"
          disabledTime={this.isDisabledTime}
          onChange={this.onChangeDate}
          value={state.value}
        />
        <br /><br />
        <DatePicker
          showTime
          className="top-right"
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择日期和时间"
          valueType="number"
          disabledDate={this.isDisabledDate}
          disabledTime={this.isDisabledTime}
          onChange={this.onChangeDate}
          value={state.value}
        />
        <DatePicker
          showTime
          className="bottom-right"
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择日期和时间"
          valueType="number"
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
