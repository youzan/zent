import React, { Component } from 'react';
import Tree from '../src/index';
import '../assets/index.scss';

/*
自定义节点展示方式，配置render属性。为了显示的正确性，请返回行级元素。
*/

const treeData = [{
  id: 1,
  title: '杭州有赞',
  content: '移动零售服务商',
  children: [{
    id: 2,
    title: 'XXXXXX',
    content: 'We are dogs, We are dogs, We are dogs, We are dogs, We are dogs',
    children: [{
      id: 5,
      title: '内部平台'
    }, {
      id: 6,
      title: '运维'
    }, {
      id: 7,
      title: '前端'
    }]
  }, {
    id: 3,
    title: '市场'
  }, {
    id: 4,
    title: '技术',
    children: [{
      id: 8,
      title: '内部平台'
    }, {
      id: 9,
      title: '运维'
    }, {
      id: 10,
      title: '前端'
    }]
  }]
}];

export default class Example extends Component {
  customRender(data) {
    return (
      <span style={{ fontSize: 16, margin: 0, lineHeight: 1 }}>
        {data.title}
        {
          data.content ?
            <small style={{ display: 'block', fontSize: 10 }}>{data.content}</small> : ''
        }
      </span>
    );
  }

  render() {
    return <Tree data={treeData} render={this.customRender} expandAll />;
  }
}
