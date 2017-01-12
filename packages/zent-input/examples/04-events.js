import React, { Component } from 'react';
import Input from '../src';
import '../assets/index.scss';


export default class Events extends Component {
  state = {
    value: 'hello'
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  onPressEnter = () => {
    alert('You have press enter ^_^ '); // eslint-disable-line
  }

  onKeyDown = evt => {
    console.log('key down, keyCode is %s', evt.keyCode); // eslint-disable-line
  }

  onKeyUp = evt => {
    console.log('key up, keyCode is %s', evt.keyCode); // eslint-disable-line
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <div>
          <Input value={value} onChange={this.onChange} />
          <span> {value}</span>
        </div>
        <br />
        <div>
          <Input onPressEnter={this.onPressEnter} /> Try Press Enter
        </div>
        <br />
        <div>
          <Input onKeyDown={this.onKeyDown} /> KeyDown Event
        </div>
        <br />
        <div>
          <Input onKeyUp={this.onKeyUp} /> KeyUp Event
        </div>
        <br />
        <div>
          <Input onKeyUp={this.onKeyUp} onPressEnter={this.onPressEnter} /> KeyUp & Press Enter
        </div>
      </div>
    );
  }
}
