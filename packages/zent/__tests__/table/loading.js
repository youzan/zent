import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Loading from './comp/loading';

Enzyme.configure({ adapter: new Adapter() });

describe('Loading', () => {
  jest.useFakeTimers();
  const wrapper = mount(<Loading />);

  it('table render', () => {
    expect(wrapper.find('.zent-table-container').length).toBe(1);
  });

  it('table loading', () => {
    expect(wrapper.find('BlockLoading').length).toBe(1);
    expect(wrapper.find('BlockLoading').prop('loading')).toBe(true);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('BlockLoading').prop('loading')).toBe(false);
  });

  it('table onChange', () => {
    wrapper.find('Table').prop('onChange')({ current: 1 });
  });

  it('table unmount', () => {
    wrapper.unmount();
    expect(wrapper.find('.zent-table-container').length).toBe(0);
  });
});
