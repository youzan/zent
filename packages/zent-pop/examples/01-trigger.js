/* eslint-disable no-console */

import React from 'react';

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

/* pop 有三种触发方式 */
const content = function () {
  return (
    <div style={{ width: 160 }}>
      <a>我在测试</a>
      <div style={{ marginTop: 10 }}><input /></div>
    </div>
  );
};

const addClick = () => {
  console.log('额外事件');
};

const Single = function (props) {
  return (
    <div
      className="zent-col zent-col-4"
      style={{ textAlign: 'center', marginBottom: 10 }}
    >
      <Pop
        content={content()}
        trigger={props.trigger}
        position="bottom-center"
        onShow={onShow}
        onClose={onClose}
      >
        {props.trigger !== 'focus' ?
          <Button onClick={addClick}>
            {props.trigger}
          </Button> :
          <input placeholder="focus" onChange={(evt) => console.log(evt.target.value)} />
        }
      </Pop>
    </div>
  );
};

class NoneTriggerDemo extends React.Component {
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
    return (
      <div className="zent-col zent-col-6" style={{ textAlign: 'center', marginBottom: 10 }}>
        <Button disabled={!this.state.visible} onClick={this.close}>
          外部关闭
        </Button>

        <span>&nbsp;</span>

        <Pop
          content={<Button onClick={this.close}>内部关闭</Button>}
          trigger="none"
          position="top-right"
          header="trigger is none"
          visible={this.state.visible}
          onShow={onShow}
          onClose={onClose}
        >
          <Button onClick={this.open}>打开(none)</Button>
        </Pop>
      </div>
    );
  }
}

const Demo = function () {
  let arr = ['click', 'focus', 'hover'];

  return (
    <div className="row">
      {arr.map((item, index) => <Single key={index} trigger={item} />)}

      <NoneTriggerDemo />
    </div>
  );
};

export default Demo;
