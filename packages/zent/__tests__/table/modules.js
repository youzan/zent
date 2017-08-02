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
      return (
        <div>
          {data.item_id}
        </div>
      );
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
  },
  {
    title: 'test',
    bodyRender: () => {
      return undefined;
    }
  },
  {
    title: 'render jsx',
    bodyRender: <div className="render-test" />
  }
];

describe('Head in Table', () => {
  it('Head has autoStick switch', () => {
    const sortMock = jest.fn();
    const changeMock = jest.fn();
    let wrapper = mount(
      <Table columns={columns} datasets={datasets} rowKey="item_id" autoStick />
    );
    expect(wrapper.find('Head').getNode().state.fixStyle).toBeUndefined();
    wrapper.unmount();

    wrapper = mount(
      <Table
        columns={columns}
        datasets={datasets}
        rowKey="item_id"
        autoStick
        onSort={sortMock}
        onChange={changeMock}
        sortBy="stock_num"
      />
    );
    window.scrollY = 100;
    wrapper.find('Head').getNode().setHeadStyle();
    expect(wrapper.find('Head').getNode().state.fixStyle.position).toEqual(
      'fixed'
    );
    wrapper = mount(
      <Table
        columns={columns}
        datasets={datasets}
        rowKey="item_id"
        onSort={sortMock}
        onChange={changeMock}
        sortBy="stock_num"
      />
    );

    // BUG: unused branch Head.js line 82
    expect(wrapper.find('Head a .desc').length).toBe(1);
    wrapper.setProps({ sortBy: 'foo' });
    expect(wrapper.find('Head a .desc').length).toBe(0);
    // wrapper.find('Head a .desc').simulate('click');
  });
});

describe('Body in Table', () => {
  it('Body will render empty body when dataset is empty', () => {
    const wrapper = mount(
      <Table columns={columns} datasets={[]} rowKey="item_id" autoStick />
    );
    expect(wrapper.find('.empty-data').length).toBe(1);
    expect(wrapper.find('.empty-data').text()).toBe('没有更多数据了');
  });

  it('Table can have custom getRowConf prop, and will change acting of Body', () => {
    // HACK: branch
    const getRowConfMock = jest.fn().mockImplementation(() => {
      return {};
    });
    let wrapper = mount(
      <Table
        columns={columns}
        datasets={datasets}
        rowKey="foo_id"
        getRowConf={getRowConfMock}
        selection={{ selectedRowKeys: [] }}
      />
    );
    const rowConfMock = jest.fn().mockImplementation(() => {
      return { rowClass: 'prefix', canSelect: false };
    });
    const onSelectMock = jest.fn();
    wrapper = mount(
      <Table
        columns={columns}
        datasets={datasets}
        rowKey="foo_id"
        getRowConf={rowConfMock}
        selection={{ selectedRowKeys: [], onSelect: onSelectMock }}
      />
    );
    expect(wrapper.find('.tr').at(1).hasClass('prefix')).toBe(true);
    expect(wrapper.find('.tr').at(2).hasClass('prefix')).toBe(true);
    expect(wrapper.find('.tr').at(3).hasClass('prefix')).toBe(true);
    wrapper.find('Head Checkbox input').simulate('change', {
      target: {
        checked: true
      }
    });
    wrapper.find('Checkbox').forEach(node => {
      expect(node.prop('checked')).toBe(false);
    });
    wrapper = mount(
      <Table
        columns={columns}
        datasets={datasets}
        rowKey="item_id"
        getRowConf={getRowConfMock}
        selection={{ selectedRowKeys: [], onSelect: onSelectMock }}
      />
    );

    wrapper.find('Head Checkbox input').simulate('change', {
      target: {
        checked: true
      }
    });
    wrapper.find('Checkbox').forEach(node => {
      expect(node.prop('checked')).toBe(false);
    });
    expect(onSelectMock.mock.calls.length).toBe(2);
    wrapper.find('Body Checkbox input').at(0).simulate('change', {
      target: {
        checked: false
      }
    });
    expect(onSelectMock.mock.calls.length).toBe(3);
  });

  describe('Td in Table', () => {
    let wrapper = mount(
      <Table columns={columns} datasets={datasets} rowKey="item_id" />
    );
    expect(wrapper.find('Td').at(4).find('.cell').text()).toBe('');
    expect(wrapper.find('Td').at(5).find('.render-test').length).toBe(1);
  });
});
