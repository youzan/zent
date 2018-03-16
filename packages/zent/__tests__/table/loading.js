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
    expect(wrapper.find('.zent-page-loading').length).toBe(1);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.zent-page-loading').length).toBe(0);
  });

  it('table onChange', () => {
    wrapper.find('Table').prop('onChange')({ current: 1 });
  });

  it('table unmount', () => {
    wrapper.unmount();
    expect(wrapper.find('.zent-table-container').length).toBe(0);
  });
});
