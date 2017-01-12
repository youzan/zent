import React, { Component } from 'react';
import Tree from '../src/Index';
import '../assets/index.scss';

const treeData = [{
  id: '1',
  title: '杭州有赞',
  content: '移动零售服务商',
  parentId: '0'
}, {
  id: '2',
  title: '产品设计',
  parentId: '1'
}, {
  id: '3',
  title: '市场',
  parentId: '1'
}, {
  id: '4',
  title: '技术',
  parentId: '1'
}, {
  id: '5',
  title: '内部平台',
  parentId: '4'
}, {
  id: '6',
  title: '运维',
  parentId: '4'
}, {
  id: '7',
  title: '前端0',
  parentId: '4'
}, {
  id: '8',
  title: '前端1',
  parentId: '7'
}, {
  id: '9',
  title: '前端2',
  parentId: '7'
}, {
  id: '10',
  title: '前端3',
  parentId: '8'
}, {
  id: '11',
  title: '前端4',
  parentId: '10'
}, {
  id: '12',
  title: '前端1',
  parentId: '9000'
}, {
  id: '13',
  title: '前端2',
  parentId: '12'
}, {
  id: '14',
  title: '前端3',
  parentId: '12'
}, {
  id: '15',
  title: '前端4',
  parentId: '13'
}, {
  id: '17',
  title: '在于运动',
  parentId: '16'
}, {
  id: '16',
  title: '生命',
  parentId: '😄'
}];

export default class Example extends Component {
  render() {
    const isRoot = (node) => node.parentId === '9000' || node.parentId === '0' || node.parentId === '😄';
    return <Tree dataType="plain" data={treeData} isRoot={isRoot} />;
  }
}
