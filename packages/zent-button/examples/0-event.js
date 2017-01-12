import React from 'react';
import Button from '../src';
import '../assets/index.scss';

/*

Button组件可以通过'onClick'直接绑定点击事件

*/

const handleClick = function () {
  alert('你点击了按钮'); // eslint-disable-line
};

const Example = function () {
  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        点击
      </Button>
    </div>
  );
};

export default Example;
