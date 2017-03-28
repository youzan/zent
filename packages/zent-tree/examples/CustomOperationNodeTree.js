import React, { Component } from 'react';
import Radio from 'zent-radio';
import Icon from 'zent-icon';
import Tree from '../src/index';

import 'zent-radio/assets/index.scss';
import 'zent-icon/lib/index.css';
import '../assets/index.scss';

const RadioGroup = Radio.Group;

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

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData,
      copyType: 'shallow'
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClone = this.handleClone.bind(this);
    this.handleCopyTypeChange = this.handleCopyTypeChange.bind(this);
  }

  deepClone(node, parentId = 0, nodeArray = []) {
    const copyNode = {
      id: String(Math.random()).replace('0.', ''),
      parentId,
      title: node.title
    };
    nodeArray.push(copyNode);

    for (let i = 0, l = node.children && node.children.length || 0; i < l; i++) {
      this.deepClone(node.children[i], copyNode.id, nodeArray);
    }
    return nodeArray;
  }

  handleDelete(data) {
    this.setState({
      treeData: this.state.treeData.filter(item => item.id !== data.id)
    });
  }

  handleClone(data) {
    const { copyType } = this.state;

    if (copyType === 'shallow') {
      const node = Object.assign({}, data, { id: Date.now() });
      this.setState({
        treeData: [...this.state.treeData, node]
      });
    } else if (copyType === 'deep') {
      const nodeArray = this.deepClone(data, data.parentId);
      this.setState({
        treeData: [...this.state.treeData, ...nodeArray]
      });
    }
  }

  handleCopyTypeChange(e) {
    this.setState({ copyType: e.target.value });
  }

  shouldRenderDeleteIcon(data) {
    return data.id % 2 === 0;
  }

  render() {
    const { copyType } = this.state;
    const operations = [{
      name: 'Delete',
      icon: <Icon type="close" />,
      action: this.handleDelete,
      shouldRender: this.shouldRenderDeleteIcon
    }, {
      name: 'Clone',
      icon: <Icon type="plus" />,
      action: this.handleClone
    }];

    return (
      <div>
        <RadioGroup onChange={this.handleCopyTypeChange} value={copyType}>
          <Radio value="shallow">浅拷贝</Radio>
          <Radio value="deep">深拷贝</Radio>
        </RadioGroup>
        <Tree data={this.state.treeData} dataType="plain" render={this.customRender} operations={operations} checkable />
      </div>
    );
  }
}
