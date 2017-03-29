import React from 'react';
import { mount } from 'enzyme';
import Expand from '../examples/expand';

describe('Expand', () => {
  const wrapper = mount(<Expand />);

  it('table expand two row', () => {
    expect(wrapper.find('.collapse-btn').length).toBe(2);
    expect(wrapper.find('.tr--expanded').length).toBe(3);
  });

  it('table expand three row when click expand btn', () => {
    expect(wrapper.find('.collapse-btn').length).toBe(3);
    expect(wrapper.find('.tr--expanded').length).toBe(3);
  });
});

