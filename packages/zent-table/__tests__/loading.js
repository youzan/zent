import React from 'react';
import { mount } from 'enzyme';
import Loading from '../examples/loading';

describe('Loading', () => {
  const wrapper = mount(<Loading />);

  it('table render', () => {
    expect(wrapper.find('.zent-table-container').length).toBe(1);
  });

  it('table loading', () => {
    expect(wrapper.find('.zent-page-loading').length).toBe(1);
    wrapper.setState({
      loading: false
    });
    expect(wrapper.find('.zent-page-loading').length).toBe(0);
  });

  it('table unmount', () => {
    wrapper.unmount();
    expect(wrapper.find('.zent-table-container').length).toBe(0);
  });
});
