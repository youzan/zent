import React from 'react';
import { mount } from 'enzyme';

import State from '../examples/05-state';

describe('Portal', () => {
  it('should not unmount when `children` changes', () => {
    const wrapper = mount(<State />);
    wrapper.find('.btn-open').simulate('click');
    expect(document.querySelector('.state-body-portal .state-count').textContent).toBe('0');

    const stateContainer = wrapper.wrap(wrapper.instance().stateContainer);

    stateContainer.find('.btn-inc').simulate('click');
    expect(document.querySelector('.state-body-portal .state-count').textContent).toBe('1');

    stateContainer.find('.btn-close').simulate('click');
    jest.runOnlyPendingTimers();
    expect(document.querySelector('.state-body-portal')).toBeFalsy();

    wrapper.unmount();
    jest.runOnlyPendingTimers();
  });
});
