import React, { Component } from 'react';
import Table from 'table';

import TextComponent from './components/Text';
import datasets from './data/conf';

/*
loading
*/
const columns = [
  {
    title: '商品',
    width: 50,
    bodyRender: data => {
      return (
        <div>
          {data.item_id}
        </div>
      );
    }
  },
  {
    title: '访问量',
    name: 'bro_uvpv',
    width: 10,
    bodyRender: TextComponent
  },
  {
    title: '库存',
    name: 'stock_num',
    width: 20
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
    loading: true
  };

  // 用定时器模拟loading
  componentWillMount() {
    let self = this;
    setTimeout(() => {
      self.setState({
        loading: false
      });
    }, 3000);
  }

  onChange = conf => {
    this.setState(conf);
  };

  render() {
    return (
      <Table
        columns={columns}
        datasets={datasets}
        onChange={this.onChange}
        loading={this.state.loading}
        rowKey="item_id"
      />
    );
  }
}

export default Simple;
