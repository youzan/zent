import React from 'react';
import Breadcrumb from '../src/index.js';
import '../assets/index.scss';

/* 根据场景，可以直接调用Breadcrumb.Item 组件 */
const Simple = function () {
  return (
    <Breadcrumb className="zent-breadcrumb-nav">
      <Breadcrumb.Item name="首页" href="//www.youzan.com" />
      <Breadcrumb.Item name="应用中心" href="//www.youzan.com" className="zent-breadcrumb-nav-active" />
      <Breadcrumb.Item name="营销中心" href="//www.youzan.com" />
    </Breadcrumb>
  );
};

export default Simple;
