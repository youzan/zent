import React from 'react';
import { mount } from 'enzyme';
import Table from 'table';

import datasets from './comp/data/conf';
import TextComponent from './comp/components/Text';

const columns = [
  {
    title: '商品',
    width: '50px',
    bodyRender: data => {
      return <div>{data.item_id}</div>;
    },
    needSort: true
  },
  {
    title: '访问量',
    name: 'bro_uvpv',
    width: '100px',
    bodyRender: TextComponent
  },
  {
    title: '库存',
    name: 'stock_num',
    width: '100px',
    isMoney: true,
    needSort: true
  },
  {
    title: '总销量',
    name: 'sold_num'
  }
];

describe('Table', () => {
  it('Table toggle sort direction will trigger onChange and it have type check', () => {
    const wrapper = mount(
      <Table columns={columns} datasets={datasets} rowKey="item_id" />
    );
    expect(() => {
      wrapper.find('Head a .desc').simulate('click');
    }).toThrow();
  });

  it('Table have autoScroll switch and control pagination through pageInfo prop', () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <Table
        columns={columns}
        datasets={datasets}
        rowKey="item_id"
        autoScroll
        pageInfo={{ current: 1, total: 20, limit: 10 }}
        onChange={onChangeMock}
      />
    );

    // NOTE: scroll method have an setInterval function
    wrapper
      .find('.zent-pagination .pagination-list .pager')
      .at(2)
      .simulate('click');
    jest.runAllTimers();
    // HACK: the line inside setInterval could not reach for anynumber > NaN return false
  });
});
