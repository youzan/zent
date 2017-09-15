import React from 'react';
import { mount } from 'enzyme';

import SingleSelect from './comp/single-select';

describe('SingleSelect', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SingleSelect />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('basic', () => {
    expect(wrapper.find('.zent-radio').length).toBe(3);
  });

  it('should check one when clicked', () => {
    wrapper
      .find('.zent-radio input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(
      wrapper
        .find('.zent-radio input')
        .at(0)
        .prop('checked')
    ).toBe(true);
    expect(
      wrapper
        .find('.zent-radio input')
        .at(1)
        .prop('checked')
    ).toBe(false);
    wrapper
      .find('.zent-radio input')
      .at(1)
      .simulate('change', { target: { checked: true } });
    expect(
      wrapper
        .find('.zent-radio input')
        .at(0)
        .prop('checked')
    ).toBe(false);
    expect(
      wrapper
        .find('.zent-radio input')
        .at(1)
        .prop('checked')
    ).toBe(true);
  });
});
