/* eslint-disable no-console */

import React from 'react';
import Table from '../src/index.js';

import '../assets/index.scss';
import '@youzan/zent-pagination/assets/index.scss';

import TextComponent from './components/Text';

import datasets from './data/conf';

/*
选中功能
*/
const columns = [{
  title: '商品',
  width: 50,
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: '访问量',
  name: 'bro_uvpv',
  width: 10,
  bodyRender: TextComponent
}, {
  title: '库存',
  name: 'stock_num',
  width: 20
}, {
  title: '总销量',
  name: 'sold_num',
  width: 20
}];

const Simple = React.createClass({
  getInitialState() {
    return {
      limit: 10,
      current: 0,
      total: 101,
      selectedRowKeys: [],
    };
  },

  onSelect(selectedRowKeys, selectedRows) {
    this.setState({
      selectedRowKeys
    });
    console.log(`你选中了：${selectedRowKeys}`);
    console.log(selectedRows);
  },

  getRowConf(rowData, index) {
    return {
      canSelect: index % 2 === 0
    };
  },

  render() {
    let self = this;

    return (
      <Table
        columns={columns}
        datasets={datasets}
        rowKey="item_id"
        getRowConf={this.getRowConf}
        selection={{
          selectedRowKeys: this.state.selectedRowKeys,
          onSelect(selectedRowkeys, selectedRows) {
            self.onSelect(selectedRowkeys, selectedRows);
          }
        }}
      />
    );
  }
});

export default Simple;
