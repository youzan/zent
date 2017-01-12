/* eslint-disable no-console */

import React from 'react';
import Pop from '../src/index.js';
import '../assets/index.scss';

/* 组件接收的参数是可以动态改变的 */
export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  onVisibleChange(show) {
    console.log('外部1');
    this.setState({
      visible: show
    });
  }

  onClose() {
    console.log('外部2');
    this.setState({
      visible: false
    });
  }

  render() {
    const header = 'header';
    const content = (
      <div>
        <button onClick={() => this.onClose()}>点击关闭</button>
      </div>
    );
    const position = 'top-right';

    return (
      <div className="row">
        <div
          className="zent-col zent-col-offset-2 zent-col-20"
          style={{ textAlign: 'center', marginBottom: 10 }}
       >
          <Pop
            content={content}
            trigger="click"
            position={position}
            header={header}
          >
            <button
              className="zent-btn zent-btn-default zent-btn-block"
            >
              点击切换
            </button>
          </Pop>
          <Pop
            content={content}
            trigger="click"
            position={position}
            header={header}
            visible={this.state.visible}
            onVisibleChange={(show) => this.onVisibleChange(show)}
          >
            <button
              className="zent-btn zent-btn-default zent-btn-block"
            >
              外部控制
            </button>
          </Pop>
        </div>
      </div>
    );
  }
}
