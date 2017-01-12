import React from 'react';
import { mount } from 'enzyme';

import Combine from '../examples/combine';


describe('Combine', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Combine />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('pagination render', () => {
    expect(wrapper.find('.zent-pagination').length).toBe(1);
    expect(wrapper.find('.zent-pagination .pagination-list').length).toBe(1);
    expect(wrapper.find('.zent-pagination .pagination-list li').first().hasClass('pager--disabled')).toBeTruthy();
    expect(wrapper.find('.zent-pagination .pagination-list li').at(1).hasClass('pager--current')).toBeTruthy();
  });

  it('header sort change', () => {
    expect(wrapper.find('.table__head a .desc').length).toBe(1);

    wrapper.find('.table__head .desc').simulate('click');

    expect(wrapper.find('.table__head a .desc').length).toBe(0);
    expect(wrapper.find('.table__head a .asc').length).toBe(1);
  });

  it('pagination click change', () => {
    expect(wrapper.find('.pager__input').prop('value')).toBe('1');

    wrapper.find('.zent-pagination .pagination-list li').at(2).simulate('click');

    expect(wrapper.find('.zent-pagination .pagination-list li').at(2).hasClass('pager--current')).toBeTruthy();
    expect(wrapper.find('.pager__input').prop('value')).toBe('2');
  });

  it('pagination current change', () => {
    expect(wrapper.find('.pager__input').prop('value')).toBe('1');

    wrapper.setState({ current: 3 });

    expect(wrapper.find('.pager__input').prop('value')).toBe('3');
    expect(wrapper.find('.zent-pagination .pagination-list li').at(3).hasClass('pager--current')).toBeTruthy();
  });

  it('pagination total info', () => {
    wrapper.setState({ total: 1000 });
    expect(wrapper.find('.total').text()).toBe('共1000条');
  });
});
