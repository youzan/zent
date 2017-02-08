/* eslint-disable no-console */

import React from 'react';
import Pop from '../src/index.js';

import '@youzan/zent-popover/assets/index.scss';
import '@youzan/zent-button/assets/index.scss';
import '@youzan/zent-layout/assets/index.scss';
import '../assets/index.scss';
import '../assets/example.scss';

/* pop 有三种触发方式 */

const content = function () {
  return (
    <div style={{ width: 160 }}>
      <p><a >我在测试</a></p>
      <p><input /></p>
      <p><button name="close" onClick={() => console.log('关闭')}>关闭</button></p>
    </div>
  );
};

const addClick = () => {
  console.log('额外事件');
};

const Single = function (props) {
  return (
    <div
      className="zent-col zent-col-offset-4 zent-col-4"
      style={{ textAlign: 'center', marginBottom: 10 }}
    >
      <Pop
        content={content()}
        trigger={props.trigger}
        position="bottom-center"
      >
        <button
          className="zent-btn zent-btn-default"
          onClick={addClick}
        >
          {props.trigger}
        </button>
      </Pop>
    </div>
  );
};

const Demo = function () {
  let arr = ['click', 'focus', 'hover'];

  return (
    <div className="row">
      {arr.map((item, index) => <Single key={index} trigger={item} />)}
    </div>
  );
};

export default Demo;
