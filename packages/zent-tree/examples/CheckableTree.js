import React, { Component } from 'react';
import Tree from '../src/index';
import '../assets/index.scss';

/*
带checkbox的树
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
  onCheck(data) {
    console.log(data); // eslint-disable-line
  }

  render() {
    const size = 'large';
    const defaultCheckedKeys = [2, 3];
    const disabledCheckedKeys = [4, 5];

    return (
      <div>
        <Tree
          data={treeData}
          size={size}
          onCheck={this.onCheck}
          checkable
          defaultCheckedKeys={defaultCheckedKeys}
          disabledCheckedKeys={disabledCheckedKeys}
        />
      </div>
    );
  }
}
