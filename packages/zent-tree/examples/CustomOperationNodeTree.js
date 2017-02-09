import React, { Component } from 'react';
import Tree from '../src/index';
import '../assets/index.scss';
import '../assets/example.scss';

/*
自定义操作operations属性, 结合选择框
*/

let treeData = [{
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
  parentId: '0'
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
}];

const deepClone = arr => {
  let i;
  let copy;

  if (Array.isArray(arr)) {
    copy = arr.slice(0);
    for (i = 0; i < copy.length; i++) {
      copy[i] = deepClone(copy[i]);
    }
    return copy;
  } else if (typeof arr === 'object') {
    return Object.assign({}, arr);
  }
  return arr;
};

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.state = { treeData };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClone = this.handleClone.bind(this);
  }

  handleDelete(data) {
    const i = treeData.findIndex(item => item.id === data.id);
    treeData.splice(i, 1);
    const newTreeData = deepClone(treeData);
    this.setState({
      treeData: newTreeData
    });
  }

  handleClone(data) {
    const node = Object.assign({}, data);
    node.id = new Date().valueOf();
    // here should user immutablejs
    treeData.push(node);
    const newTreeData = deepClone(treeData);
    this.setState({
      treeData: newTreeData
    });
  }

  shouldRenderDeleteIcon(data) {
    return data.id % 2 === 0;
  }

  render() {
    const operations = [{
      name: 'Delete',
      icon: 'icon-font icon-font-heartbreak',
      action: this.handleDelete,
      shouldRender: this.shouldRenderDeleteIcon
    }, {
      name: 'Clone',
      icon: 'icon-font icon-font-heart',
      action: this.handleClone
    }];

    return <Tree data={this.state.treeData} dataType="plain" render={this.customRender} operations={operations} checkable />;
  }
}
