import React, { Component } from 'react';
import Sweetalert from '../src';

import '../assets/index.scss';
import 'zent-dialog/lib/index.css';
import 'zent-button/lib/index.css';

/* 快捷使用弹窗组件 */
export default class Example extends Component {
  onConfirm() {
    console.log('confirm'); // eslint-disable-line
  }

  onCancel() {
    console.log('cancel'); // eslint-disable-line
  }

  showAlertInfo = () => {
    Sweetalert.alert({
      style: { width: '300px' },
      content: '这个是具体内容',
      title: '这是一个消息标题',
      onConfirm: this.onConfirm
    });
  }

  showAlertConfirm = () => {
    Sweetalert.confirm({
      content: <div><p>这个是内容</p><p>这个是内容</p></div>,
      title: '这是一个确认标题',
      onConfirm: this.onConfirm,
      onCancel: this.onCancel,
    });
  }

  autoCloseConfirm = () => {
    const close = Sweetalert.confirm({
      content: <div><p>二秒后自动关闭</p><p>二秒后自动关闭</p></div>,
      title: '二秒后自动关闭',
      onConfirm: this.onConfirm,
      onCancel: this.onCancel,
    });

    setTimeout(close, 2000);
  }

  promiseConfirm = () => {
    Sweetalert.confirm({
      content: '点击确认按钮，按钮会变成loading状态，三秒后关闭',
      title: 'onConfirm返回Promise',
      onConfirm: () => new Promise((resolve) => {
        setTimeout(() => {
          this.onConfirm();
          resolve();
        }, 3000);
      })
    });
  }

  promiseConfirmReject = () => {
    Sweetalert.confirm({
      content: '点击确认按钮，按钮会变成loading状态，三秒后停止loading',
      title: 'onConfirm返回Promise',
      onConfirm: () => new Promise((resolve, reject) => {
        setTimeout(() => {
          this.onConfirm();
          reject();
        }, 3000);
      })
    });
  }

  render() {
    return (
      <div>
        <button className="zent-btn zent-btn-primary" onClick={this.showAlertInfo}>消息对话框</button>
        <button className="zent-btn zent-btn-primary" onClick={this.showAlertConfirm}>确认对话框</button>
        <button className="zent-btn zent-btn-primary" onClick={this.autoCloseConfirm}>自动关闭对话框</button>
        <button className="zent-btn zent-btn-primary" onClick={this.promiseConfirm}>自动关闭对话框(Promise)</button>
        <button className="zent-btn zent-btn-primary" onClick={this.promiseConfirmReject}>Promise.reject</button>
      </div>
    );
  }
}
