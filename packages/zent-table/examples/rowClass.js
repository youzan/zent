import React from 'react';
import Table from '../src/index.js';

import '../assets/index.scss';
import './style/example.scss';

import TextComponent from './components/Text';

import datasets from './data/conf';

/*
 * 设置每行的样式
 */
const columns = [{
  title: '商品',
  width: '50px',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: '访问量',
  name: 'bro_uvpv',
  width: '100px',
  bodyRender: TextComponent
}, {
  title: '库存',
  name: 'stock_num',
  width: '100px'
}, {
  title: '总销量',
  name: 'sold_num'
}];

const Simple = React.createClass({
  getInitialState() {
    return {
      limit: 10,
      current: 0,
      total: 101
    };
  },

  getRowConf(data, index) {
    return {
      canSelect: true,
      rowClass: `row-${index}`
    };
  },

  onChange(conf) {
    this.setState(conf);
  },

  render() {
    return (
      <Table
        columns={columns}
        datasets={datasets}
        onChange={this.onChange}
        getRowConf={this.getRowConf}
        rowKey="item_id"
      />
    );
  }
});

export default Simple;
