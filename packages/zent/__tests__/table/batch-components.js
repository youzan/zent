import React from 'react';
import { mount } from 'enzyme';

import BatchComponents from './comp/batch-components';

describe('BatchComponents', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BatchComponents />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render three batch components', () => {
    expect(wrapper.find('.tfoot__batchcomponents .child-comps').length).toBe(3);
  });

  it('should render one checkbox', () => {
    expect(wrapper.find('.tfoot__batchcomponents .zent-checkbox').length).toBe(
      1
    );
  });

  it('should check all checkbox when checkall is checked', () => {
    wrapper
      .find('.tfoot__batchcomponents .zent-checkbox input')
      .simulate('change', { target: { checked: true } });
    wrapper.find('.tbody .tr [type="checkbox"]').forEach(node => {
      expect(node.prop('checked')).toBe(true);
    });

    wrapper
      .find('.tfoot__batchcomponents .zent-checkbox input')
      .simulate('change', { target: { checked: false } });
    wrapper.find('.tbody .tr [type="checkbox"]').forEach(node => {
      expect(node.prop('checked')).toBe(false);
    });
  });

  it('pure dom show be rendered', () => {
    expect(
      wrapper.find('.tfoot__batchcomponents .child-comps--pure').length
    ).toBe(1);
  });

  it('function should show how many checkbox be checked', () => {
    expect(
      wrapper
        .find('.tfoot__batchcomponents .child-comps--func')
        .text()
        .trim()
    ).toBe('这是一个函数，选中了0个元素');
    wrapper
      .find('.tfoot__batchcomponents .zent-checkbox input')
      .simulate('change', { target: { checked: true } });
    expect(
      wrapper
        .find('.tfoot__batchcomponents .child-comps--func')
        .text()
        .trim()
    ).toBe('这是一个函数，选中了3个元素');
  });

  it('customer component should rendered and can be clicked', () => {
    expect(
      wrapper
        .find('.tfoot__batchcomponents .child-comps--comp .label-container')
        .text()
        .trim()
    ).toBe('选中了0个元素');
    wrapper
      .find('.tfoot__batchcomponents .zent-checkbox input')
      .simulate('change', { target: { checked: true } });
    wrapper
      .find('.tfoot__batchcomponents .child-comps--comp .zent-btn')
      .simulate('click');
    expect(
      wrapper
        .find('.tfoot__batchcomponents .child-comps--comp .label-container')
        .text()
        .trim()
    ).toBe('选中了3个元素');
  });
});
