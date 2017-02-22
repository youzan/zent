import React, { Component } from 'react';
import Sweetalert from '../src';

import '../assets/index.scss';
import 'zent-dialog/lib/index.css';
import 'zent-button/lib/index.css';
import 'zent-icon/lib/index.css';

/* title可以有类型图标 */
export default class TitleIcon extends Component {
  onConfirm() {
    console.log('我真的知道了'); // eslint-disable-line
  }

  onCancel() {
    console.log('我真的取消了'); // eslint-disable-line
  }

  showAlert(type) {
    Sweetalert.alert({
      content: '这个是具体内容',
      title: '这是一个消息标题',
      onConfirm: this.onConfirm,
      type
    });
  }

  showConfirm(type) {
    Sweetalert.confirm({
      content: <div><p>这个是内容</p><p>这个是内容</p></div>,
      title: '这是一个确认标题',
      onConfirm: this.onConfirm,
      onCancel: this.onCancel,
      type
    });
  }

  // showAlertInfo = () => {
  //   Sweetalert.alert({
  //     content: '这个是具体内容',
  //     title: '这是一个消息标题',
  //     onConfirm: this.onConfirm
  //   })
  // }
  //
  // showAlertConfirm = () => {
  //   Sweetalert.confirm({
  //     content: <div><p>这个是内容</p><p>这个是内容</p></div>,
  //     title: '这是一个确认标题',
  //     onConfirm: this.onConfirm,
  //     onCancel: this.onCancel,
  //   })
  // }
  //
  // autoCloseConfirm = () => {
  //   const close = Sweetalert.confirm({
  //     content: <div><p>二秒后自动关闭</p><p>二秒后自动关闭</p></div>,
  //     title: '二秒后自动关闭',
  //     onConfirm: this.onConfirm,
  //     onCancel: this.onCancel,
  //   });
  //
  //   setTimeout(close, 2000);
  // }
  //
  // promiseConfirm = () => {
  //   Sweetalert.confirm({
  //     content: '点击确认按钮，按钮会变成loading状态，三秒后关闭',
  //     title: 'onConfirm返回Promise',
  //     onConfirm: () => new Promise((resolve) => {
  //       setTimeout(() => {
  //         this.onConfirm();
  //         resolve();
  //       }, 3000)
  //     })
  //   })
  // }

  render() {
    return (
      <div>
        <div>
          <button className="zent-btn zent-btn-primary" onClick={this.showAlert.bind(this, 'info')}>alert(info)</button>
          <button className="zent-btn zent-btn-primary" onClick={this.showAlert.bind(this, 'success')}>alert(success)</button>
          <button className="zent-btn zent-btn-primary" onClick={this.showAlert.bind(this, 'error')}>alert(error)</button>
          <button className="zent-btn zent-btn-primary" onClick={this.showAlert.bind(this, 'warning')}>alert(warning)</button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <button className="zent-btn zent-btn-primary" onClick={this.showConfirm.bind(this, 'info')}>confirm(info)</button>
          <button className="zent-btn zent-btn-primary" onClick={this.showConfirm.bind(this, 'success')}>confirm(success)</button>
          <button className="zent-btn zent-btn-primary" onClick={this.showConfirm.bind(this, 'error')}>confirm(error)</button>
          <button className="zent-btn zent-btn-primary" onClick={this.showConfirm.bind(this, 'warning')}>confirm(warning)</button>
        </div>
      </div>
    );
  }
}
