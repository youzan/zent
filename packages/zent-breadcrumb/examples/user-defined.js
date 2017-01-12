import React from 'react';
import Breadcrumb from '../src/index.js';
import '../assets/index.scss';

/* 在更加自由的场景下，由用户自定义 Item 的内容，或者自定义面包屑的所有内容 */
const Simple = function () {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <a href="#google">首页</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span>应用中心</span>
      </Breadcrumb.Item>
      <span>营销中心</span>
    </Breadcrumb>
  );
};

export default Simple;
