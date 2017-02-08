import React from 'react';

import Button from '@youzan/zent-button';

import Pop from '../src/index.js';

import '@youzan/zent-popover/assets/index.scss';
import '@youzan/zent-button/assets/index.scss';
import '@youzan/zent-layout/assets/index.scss';
import '../assets/index.scss';
import '../assets/example.scss';

/* 设置 header 属性可以给 pop 添加一个头部，header 可以是一个字符串，也可以是 react 元素 */
const content = function () {
  return (
    <div style={{ width: 160 }}>
      <div>Pop内容</div>
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
        trigger="click"
        position={props.position}
        header={props.header}
      >
        <Button block>
          {props.header ? '带头部' : 'Normal'}
        </Button>
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
    </div>
  );
};

export default Demo;
