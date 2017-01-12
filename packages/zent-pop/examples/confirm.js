/* eslint-disable no-console */

import React from 'react';
import Pop from '../src/index.js';
import '../assets/index.scss';

function confirm() {
  console.log('点击了确定');
}

function cancel() {
  console.log('点击了取消');
}

/* 可以通过设置onConfirm回掉触发表现为 confirm 形式的 pop , 通过confirmText以及cancelText可自定义按钮名 */

const Demo = function () {
  return (
    <div className="row">
      <div
        className="zent-col zent-col-offset-9 zent-col-6"
        style={{ textAlign: 'center', marginBottom: 10 }}
      >
        <Pop
          content="测试内容"
          position="bottom-center"
          onConfirm={confirm}
          onCancel={cancel}
          confirmText="OK"
          type="danger"
        >
          <button
            className="zent-btn zent-btn-default zent-btn-block"
          >
            Confirm
          </button>
        </Pop>
      </div>
    </div>
  );
};

export default Demo;
