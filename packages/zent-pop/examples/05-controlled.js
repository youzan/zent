/* eslint-disable no-console */

import React, { Component } from 'react';

import Button from 'zent-button';

import Pop from '../src/index.js';

import 'zent-popover/assets/index.scss';
import 'zent-button/assets/index.scss';
import 'zent-layout/assets/index.scss';
import '../assets/index.scss';
import '../assets/example.scss';

const onShow = () => {
  console.log('show');
};

const onClose = () => {
  console.log('close');
};

const onBeforeShow = (cont) => {
  setTimeout(cont, 500);
};

const onBeforeClose = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
};

const addClick = () => {
  console.log('额外事件');
};

class Single extends Component {
  state = {
    visible: false
  };

  render() {
    const content = (
      <div style={{ width: 160 }}>
        <button onClick={() => this.setState({ visible: false })}>close</button>
        <div style={{ marginTop: 10 }}><input /></div>
      </div>
    );

    return (
      <div
        className="zent-col zent-col-4"
        style={{ textAlign: 'center', marginBottom: 10 }}
      >
        <Pop
          content={content}
          trigger={this.props.trigger}
          position="bottom-center"
          onShow={onShow}
          onClose={onClose}
          onBeforeShow={onBeforeShow}
          onBeforeClose={onBeforeClose}
          visible={this.state.visible}
          onVisibleChange={v => this.setState({ visible: v })}
        >
          {this.props.trigger !== 'focus' ?
            <Button onClick={addClick}>
              {this.props.trigger}
            </Button> :
            <input placeholder="focus" onChange={(evt) => console.log(evt.target.value)} />
          }
        </Pop>
      </div>
    );
  }
}

const Demo = function () {
  let arr = ['click', 'focus', 'hover'];

  return (
    <div>
      <p>打开关闭都有延迟</p>
      <div className="row">
        {arr.map((item, index) => <Single key={index} trigger={item} />)}
      </div>
    </div>

  );
};

export default Demo;
