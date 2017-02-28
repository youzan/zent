/* eslint-disable no-console */

import React, { Component } from 'react';
import Pop from '../src/index.js';

import 'zent-popover/assets/index.scss';
import 'zent-button/assets/index.scss';
import 'zent-layout/assets/index.scss';
import '../assets/index.scss';
import '../assets/example.scss';

function confirm() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('点击了确定');
      resolve();
    }, 1000);
  });
}

function cancel(close) {
  setTimeout(() => {
    console.log('点击了取消');
    close();
  }, 1000);
}

/* 可以通过设置onConfirm回调触发表现为 confirm 形式的 pop , 通过confirmText以及cancelText可自定义按钮名 */
export default class Demo extends Component {
  state = {
    visible: false
  };

  render() {
    return (
      <div className="row">
        <div
          className="zent-col zent-col-offset-3 zent-col-3"
          style={{ textAlign: 'center', marginBottom: 10 }}
        >
          <Pop
            trigger="click"
            content="测试内容"
            position="bottom-center"
            onConfirm={confirm}
            onCancel={cancel}
            confirmText="OK"
            type="danger"
          >
            <button
              className="zent-btn zent-btn-default zent-btn-block"
            >
              Confirm
            </button>
          </Pop>
        </div>

        <div
          className="zent-col zent-col-offset-7 zent-col-4"
          style={{ textAlign: 'center', marginBottom: 10 }}
        >
          <Pop
            trigger="none"
            content={<button onClick={() => this.setState({ visible: false })}>close</button>}
            position="bottom-center"
            visible={this.state.visible}
            onVisibleChange={v => this.setState({ visible: v })}
            onConfirm={confirm}
            onCancel={cancel}
            confirmText="OK"
            type="danger"
          >
            <button
              className="zent-btn zent-btn-default zent-btn-block"
              onClick={() => this.setState({ visible: true })}
            >
              trigger='none'
            </button>
          </Pop>
        </div>
      </div>
    );
  }
}
