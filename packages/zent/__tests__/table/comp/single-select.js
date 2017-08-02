import React, { Component } from 'react';
import Table from 'table';

import TextComponent from './components/Text';
import CardComponent from './components/Card';

import datasets from './data/conf';

/*
所有功能集合在一起使用
*/
const columns = [
  {
    title: '商品',
    width: 50,
    bodyRender: CardComponent
  },
  {
    title: '访问量',
    name: 'bro_uvpv',
    width: 10,
    needSort: true,
    bodyRender: TextComponent
  },
  {
    title: '库存',
    needSort: true,
    name: 'stock_num',
    width: 20,
    bodyRender: (data, pos) => {
      return (
        <p>
          {data.stock_num}
          {pos.row}
        </p>
      );
    }
  },
  {
    title: '总销量',
    name: 'sold_num',
    width: 20
  }
];

class Simple extends Component {
  state = {
    limit: 10,
    current: 0,
    total: 101,
    sortBy: 'bro_uvpv',
    sortType: 'desc',
    rowKey: 'item_id',
    selectedRowKeys: []
  };

  onChange = conf => {
    this.setState(conf);
    // console.log(conf); // eslint-disable-line
  };

  onSelect = selectedRowKeys => {
    this.setState({
      selectedRowKeys
    });
    // console.log(`你选中了：${selectedRowKeys}`); // eslint-disable-line
  };

  render() {
    let self = this;

    return (
      <Table
        columns={columns}
        datasets={datasets}
        onChange={this.onChange}
        sortBy={this.state.sortBy}
        sortType={this.state.sortType}
        rowKey={this.state.rowKey}
        selection={{
          isSingleSelection: true,
          selectedRowKeys: this.state.selectedRowKeys,
          onSelect(selectedRowkeys) {
            self.onSelect(selectedRowkeys);
          }
        }}
        pageInfo={{
          limit: this.state.limit,
          current: this.state.current,
          total: this.state.total
        }}
      />
    );
  }
}

export default Simple;
