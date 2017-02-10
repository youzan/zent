import React from 'react';
import Table from '../src/index.js';
import assign from 'lodash/assign';

import '../assets/index.scss';
import 'zent-pagination/assets/index.scss';

import datasets from './data/wym'; // 一个mock的数据

/*
选中功能
*/
const columns = [{
  title: '标题',
  width: 15,
  bodyRender(data) {
    return (<a>{data.title}</a>);
  }
}, {
  title: '创建时间',
  name: 'created_time',
  width: 15,
}, {
  title: '商品数',
  name: 'goods_num',
  width: 10
}, {
  title: '浏览UV/PV',
  width: 12,
  name: 'bro_uvpv',
  needSort: true
}, {
  title: '到店UV/PV',
  width: 13,
  name: 'shop_uvpv',
  needSort: true
}, {
  title: '序号',
  width: 10,
  name: 'order_state',
  needSort: true
}, {
  title: '操作',
  width: 25,
  bodyRender() {
    let styleObj = {
      display: 'inline-block',
      margin: '0 5px',
      color: '#cacaca',
    };

    function onClick(e) {
      console.log(e.target.text); // eslint-disable-line
    }

    return (
      <div className="opts">
        <a onClick={onClick}>编辑</a>
        <span style={styleObj}>|</span>
        <a onClick={onClick}>删除</a>
        <span style={styleObj}>|</span>
        <a onClick={onClick}>链接</a>
        <span style={styleObj}>|</span>
        <a onClick={onClick}>设为主页</a>
      </div>
    );
  }
}];

const Simple = React.createClass({
  getInitialState() {
    return {
      limit: 10,
      current: 0,
      total: 101,
      sortBy: 'shop_uvpv',
      sortType: 'desc'
    };
  },

  onChange(conf) {
    this.setState(assign({}, this.state, conf));
  },

  render() {
    return (
      <Table
        columns={columns}
        datasets={datasets}
        rowKey="item_id"
        onChange={this.onChange}
        sortBy={this.state.sortBy}
        sortType={this.state.sortType}
        autoStick
        autoScroll
        pageInfo={{
          limit: this.state.limit,
          current: this.state.current,
          total: this.state.total
        }}
      />
    );
  }
});

export default Simple;
