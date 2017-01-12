import React from 'react';
import Button from '../src';
import '../assets/index.scss';

/*
*  通过size属性来控制按钮的大小
*/

const Example = function () {
  return (
    <div>
      <Button type="primary" size="large">大号按钮</Button>
      <Button type="primary">正常按钮</Button>
      <Button type="primary" size="small">小号按钮</Button>
    </div>
  );
};

export default Example;
