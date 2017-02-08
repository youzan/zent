/* eslint-disable no-console */

import React from 'react';
import Button from '@youzan/zent-button';

import Pop from '../src/index.js';

import '@youzan/zent-popover/assets/index.scss';
import '@youzan/zent-button/assets/index.scss';
import '@youzan/zent-layout/assets/index.scss';
import '../assets/index.scss';
import '../assets/example.scss';

/* trigger为none时完全由外部控制显示／隐藏 */
export default class Demo extends React.Component {
  state = {
    visible: false
  };

  close = () => {
    this.setState({
      visible: false
    });
  };

  open = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    const content = (
      <div>
        <Button onClick={this.close}>内部关闭</Button>
      </div>
    );

    return (
      <div className="row">
        <div className="zent-col zent-col-offset-2 zent-col-20" style={{ textAlign: 'center', marginBottom: 10 }}>
          <Button disabled={!this.state.visible} onClick={this.close}>
            外部关闭
          </Button>

          <Pop
            content={content}
            trigger="none"
            position="top-right"
            header="header"
            visible={this.state.visible}
          >
            <Button onClick={this.open}>打开</Button>
          </Pop>
        </div>
      </div>
    );
  }
}
