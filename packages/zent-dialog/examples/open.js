import React, { Component } from 'react';

import { openDialog } from '../src';
import '../assets/index.scss';

/* `openDialog`示例 */
export default class OpenDemo extends Component {
  open = () => {
    const closeDialog = openDialog({
      title: '使用openDialog直接打开对话框',
      children: (
        <div>
          <div>foobar</div>
          <button className="zent-btn zent-btn-primary" onClick={this.openInnerDialog}>打开第二个对话框</button>
        </div>
      ),
      footer: <button className="zent-btn zent-btn-primary" onClick={() => closeDialog()}>关闭</button>,
      onClose() {
        console.log('outer dialog closed'); // eslint-disable-line
      },
      style: { width: '500px' }
    });
  };

  openInnerDialog = () => {
    const close = openDialog({
      title: '内层对话框',
      children: (
        <div>
          <div>内层对话框</div>
          <button className="zent-btn zent-btn-primary" onClick={() => close(false)}>关闭(不触发onClose)</button>
        </div>
      ),
      onClose() {
        console.log('inner dialog closed'); // eslint-disable-line
      },
      ref(ref) {
        if (ref) {
          console.log(ref); // eslint-disable-line
        } else {
          console.log('inner ref changed to invalid'); // eslint-disable-line
        }
      },
      style: { width: '300px' }
    });
  };

  render() {
    return (
      <div className="open-demo">
        <button className="zent-btn zent-btn-primary" onClick={this.open}>打开对话框</button>
      </div>
    );
  }
}
