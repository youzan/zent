import React, { Component } from 'react';
import Notify from '../src';
import Button from '@youzan/zent-button';
import '../assets/index.scss';
import '@youzan/zent-button/assets/index.scss';

export default class Demo extends Component {

  testSuccess = () => {
    Notify.success('Hello', 1000);
  }

  testError = () => {
    Notify.error('Error');
  }

  customContent = () => {
    Notify.success(
      <div>
        <span style={{ color: '#f67' }}>
          颜色
        </span>
        <i>斜体</i>
        <b>粗体</b>
      </div>
    );
  }

  clearNotify = () => {
    Notify.clear();
  }

  render() {
    return (
      <div className="demo-block">
        <Button onClick={this.testSuccess}>成功通知</Button>
        <Button onClick={this.testError}>错误通知</Button>
        <Button onClick={this.customContent}>内容可以是任意React node</Button>
        <Button onClick={this.clearNotify}>清除Notify</Button>
      </div>
    );
  }
}

