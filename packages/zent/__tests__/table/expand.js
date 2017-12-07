import React from 'react';
import { mount } from 'enzyme';

import Expand from './comp/expand';

describe('Expand', () => {
  it('table expand two row', () => {
    const wrapper = mount(<Expand />);

    expect(wrapper.find('.collapse-btn').length).toBe(2);
    expect(wrapper.find('.tr--expanded').length).toBe(3);
  });

  it('table expand three row when click expand btn', () => {
    const wrapper = mount(<Expand />);
    wrapper.find('.expand-btn').simulate('click');
    expect(wrapper.state('selectedRowKeys').length).toBe(1);

    expect(wrapper.find('.collapse-btn').length).toBe(3);
    expect(wrapper.find('.tr--expanded').length).toBe(3);
    wrapper
      .find('.tr--expanded')
      .last()
      .simulate('click');
    expect(wrapper.state('selectedRowKeys').length).toBe(2);
  });
});
