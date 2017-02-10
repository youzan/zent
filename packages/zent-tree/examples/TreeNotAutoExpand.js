import React, { Component } from 'react';
import Tree from '../src/index';
import '../assets/index.scss';

/*
onSelect选中节点的回调函数，autoExpandOnSelect选中节点是否自动展开
*/

const treeData = [{
  id: 1,
  title: '杭州有赞',
  children: [{
    id: 2,
    title: 'XXXXXX',
    expand: false,
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
  constructor() {
    super();

    this.onExpand = this.onExpand.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onExpand(data, config) {
    console.log('onExpand', data, config); // eslint-disable-line
  }

  onSelect(data, target) {
    console.log('onSelect', data, target); // eslint-disable-line
  }

  render() {
    return (
      <div>
        <Tree data={treeData} onExpand={this.onExpand} autoExpandOnSelect={false} onSelect={this.onSelect} />
      </div>
    );
  }
}
