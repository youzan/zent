import React from 'react';
import Breadcrumb from '../src/index.js';
import '../assets/index.scss';

/* 根据场景，可以传递复合规范的数据解构 */
let dataList = [
  { name: '首页', href: '//www.youzan.com' },
  { name: '应用中心', href: '//www.youzan.com' },
  { name: '营销中心' }
];

const Simple = function () {
  return <Breadcrumb breads={dataList} />;
};

export default Simple;
