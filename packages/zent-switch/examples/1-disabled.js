import React from 'react';
import Switch from '../src';
import '../assets/index.scss';

/*

  Switch组件disabled属性（true or false）

*/

const Example = function () {
  return (
    <div>
      <div>
        <Switch checked disabled />
        <hr />
        <Switch checked={false} disabled />
      </div>
    </div>
  );
};

export default Example;
