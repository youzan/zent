import React from 'react';
import Pop from '../src/index.js';
import '../assets/index.scss';

/* 设置 header 属性可以给 pop 添加一个头部，header 可以是一个字符串，也可以是 react 元素 */
const content = function () {
  return (
    <div style={{ width: 160 }}>
      <p>我在测试</p>
      <p>我在测试</p>
    </div>
  );
};

const header = function () {
  return '我是一个title';
};

const Single = function (props) {
  return (
    <div
      className="zent-col zent-col-offset-6 zent-col-4"
      style={{ textAlign: 'center', marginBottom: 10 }}
    >
      <Pop
        content={content()}
        trigger="hover"
        position={props.position}
        header={props.header}
      >
        <button
          className="zent-btn zent-btn-default zent-btn-block"
        >
          {props.header ? '带头部' : 'Normal'}
        </button>
      </Pop>
    </div>
  );
};

const Demo = function () {
  return (
    <div>
      <div className="row">
        <Single position="top-center" />
        <Single header={header()} position="top-center" />
      </div>
      <div className="row">
        <Single position="right-center" />
        <Single header={header()} position="right-center" />
      </div>
      <div className="row">
        <Single position="bottom-center" />
        <Single header={header()} position="bottom-center" />
      </div>
      <div className="row">
        <Single position="left-center" />
        <Single header={header()} position="left-center" />
      </div>
    </div>
  );
};

export default Demo;
