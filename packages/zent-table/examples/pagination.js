import React from 'react';
import Table from '../src/index.js';

import '../assets/index.scss';
import 'zent-pagination/assets/index.scss';

import TextComponent from './components/Text';
import CardComponent from './components/Card';

import datasets from './data/conf';

/*
分页
*/
const columns = [{
  title: '商品',
  width: 50,
  bodyRender: CardComponent
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
      maxPageToShow: 8,
      sortBy: 'bro_uvpv',
      sortType: 'desc'
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
        sortBy={this.state.sortBy}
        sortType={this.state.sortTyp}
        rowKey="item_id"
        pageInfo={{
          limit: this.state.limit,
          current: this.state.current,
          maxPageToShow: this.state.maxPageToShow,
          total: this.state.total
        }}
      />
    );
  }
});

export default Simple;
