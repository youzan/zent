import React, { Component } from 'react';
import { MonthPicker } from '../src';
// import '../assets/reset.scss';
import '../assets/index.scss';
import 'zent-icon/lib/index.css';

export default class Month extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      value: new Date()
    };
  }
  onChangeMonth = (val) => {
    this.setState({
      value: val,
      logs: [...this.state.logs, `选择月份 ${val}`]
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
        <MonthPicker
          disabled
          value={this.state.value}
          onChange={this.onChangeMonth}
        />
        <br /><br />
        <MonthPicker
          value={this.state.value}
          onChange={this.onChangeMonth}
        />
        <ul>
          {logList}
        </ul>
      </div>
    );
  }
}
