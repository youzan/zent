import React, { Component } from 'react';
import Tree from '../src/index';
import '../assets/index.scss';

/*
加载plain格式数据
*/

const treeData = [{
  id: 2,
  title: '产品设计',
  parentId: 1
}, {
  id: 3,
  title: '市场',
  parentId: 1
}, {
  id: 4,
  title: '技术',
  parentId: 1
}, {
  id: 5,
  title: '内部平台',
  parentId: 4
}, {
  id: 6,
  title: '运维',
  parentId: 4
}, {
  id: 7,
  title: '前端',
  parentId: 4
}, {
  id: 1,
  title: '杭州有赞',
  content: '移动零售服务商',
  parentId: 0
}];

export default class Example extends Component {
  render() {
    return <Tree dataType="plain" data={treeData} />;
  }
}
