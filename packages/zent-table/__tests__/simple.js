import React from 'react';
import { mount } from 'enzyme';
import Simple from '../examples/simple';

describe('Simple', () => {
  const wrapper = mount(<Simple />);

  it('table render', () => {
    expect(wrapper.find('.zent-table-container').length).toBe(1);
  });

  it('table thead render', () => {
    expect(wrapper.find('.zent-table-container thead').length).toBe(1);
    expect(wrapper.find('.zent-table-container thead th').length).toBe(4);
    expect(wrapper.find('.zent-table-container thead th').first().hasClass('cell')).toBeTruthy();
    expect(wrapper.find('.zent-table-container thead th').first().text()).toBe('商品');
    expect(wrapper.find('.zent-table-container thead th').last().text()).toBe('总销量');
  });

  it('table tbody render', () => {
    expect(wrapper.find('.zent-table-container tbody').length).toBe(1);
    expect(wrapper.find('.zent-table-container tbody tr').length).toBe(3);
    expect(wrapper.find('.zent-table-container tbody tr').first().find('td').length).toBe(4);
    expect(wrapper.find('.zent-table-container tbody tr td').first().text()).toBe('5024278');
    expect(wrapper.find('.zent-table-container tbody tr td').last().text()).toBe('0');
  });

  it('table unmount', () => {
    wrapper.unmount();
    expect(wrapper.find('.zent-table-container').length).toBe(0);
  });
});
