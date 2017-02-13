import React from 'react';
import Table from '../src/index.js';

import '../assets/index.scss';

import TextComponent from './components/Text';

import datasets from './data/conf';

/*
基础使用，使用函数，建议es6项目中用箭头函数
*/
const columns = [{
  title: '商品',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: '访问量',
  name: 'bro_uvpv',
  width: '400px',
  bodyRender: TextComponent
}, {
  title: '库存',
  name: 'stock_num',
  width: '300px',
  isMoney: true
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

  onChange(conf) {
    this.setState(conf);
  },

  render() {
    return (
      <Table
        columns={columns}
        datasets={datasets}
        onChange={this.onChange}
        rowKey="item_id"
      />
    );
  }
});

export default Simple;
