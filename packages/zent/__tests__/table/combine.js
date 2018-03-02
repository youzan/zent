import React from 'react';
import { mount } from 'enzyme';

import Combine from './comp/combine';

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
    expect(
      wrapper
        .find('.zent-pagination .pagination-list .pager')
        .first()
        .hasClass('pager--disabled')
    ).toBeTruthy();
    expect(
      wrapper
        .find('.zent-pagination .pagination-list .pager')
        .at(1)
        .hasClass('pager--current')
    ).toBeTruthy();
  });

  it('header sort change', () => {
    expect(wrapper.find('Head a .desc').length).toBe(1);

    wrapper.find('Head .desc').simulate('click');

    expect(wrapper.find('Head a .desc').length).toBe(0);
    expect(wrapper.find('Head a .asc').length).toBe(1);
    wrapper.find('Head a .asc').simulate('click');
    expect(wrapper.find('Head a .desc').length).toBe(1);
    expect(wrapper.find('Head a .asc').length).toBe(0);
  });

  it('pagination click change', () => {
    expect(wrapper.find('.pager__input').prop('value')).toBe('1');

    wrapper
      .find('.zent-pagination .pagination-list .pager')
      .at(2)
      .simulate('click');

    expect(
      wrapper
        .find('.zent-pagination .pagination-list .pager')
        .at(2)
        .hasClass('pager--current')
    ).toBeTruthy();
    expect(wrapper.find('.pager__input').prop('value')).toBe('2');
  });

  it('pagination current change', () => {
    expect(wrapper.find('.pager__input').prop('value')).toBe('1');

    wrapper.setState({ current: 3 });

    expect(wrapper.find('.pager__input').prop('value')).toBe('3');
    expect(
      wrapper
        .find('.zent-pagination .pagination-list .pager')
        .at(3)
        .hasClass('pager--current')
    ).toBeTruthy();
  });

  it('pagination total info', () => {
    wrapper.setState({ total: 1000 });
    expect(wrapper.find('.total').text()).toContain('1000');
  });

  it('selectRows', () => {
    expect(wrapper.find('Checkbox').length).toBe(4);
    wrapper
      .find('Head Checkbox input')
      .simulate('change', { target: { checked: true } });
    wrapper.find('Checkbox').forEach(node => {
      expect(node.prop('checked')).toBe(true);
    });
    wrapper
      .find('Head Checkbox input')
      .simulate('change', { target: { checked: false } });
    wrapper.find('Checkbox').forEach(node => {
      expect(node.prop('checked')).toBe(false);
    });
    wrapper
      .find('Body Checkbox input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(
      wrapper
        .find('Body Checkbox')
        .at(0)
        .prop('checked')
    ).toBe(true);

    // HACK: branch Table.js onSelectOneRow
    wrapper
      .find('Body Checkbox input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(
      wrapper
        .find('Body Checkbox input')
        .at(0)
        .prop('checked')
    ).toBe(false);
    wrapper
      .find('Body Checkbox input')
      .at(0)
      .simulate('change', { target: { checked: false } });
    expect(
      wrapper
        .find('Body Checkbox')
        .at(0)
        .prop('checked')
    ).toBe(false);
    wrapper
      .find('Body Checkbox input')
      .at(0)
      .simulate('change', { target: { checked: false } });
    expect(
      wrapper
        .find('Body Checkbox')
        .at(0)
        .prop('checked')
    ).toBe(false);
  });
});
