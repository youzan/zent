import React from 'react';
import { mount } from 'enzyme';

import ContextComponent from '../examples/02-context';

describe('Portal', () => {
  it('should support context', () => {
    const wrapper = mount(<ContextComponent />);
    expect(document.body.querySelector('.context-portal .child')).toBeFalsy();

    wrapper.setState({
      visible: true
    });
    expect(document.body.querySelector('.context-portal .child').textContent).toBe('store: 0');
    wrapper.find('.btn-inc').simulate('click');
    // FIXME: context update not working in react < 15.2.1
    // Should be 'store: 1'
    expect(document.body.querySelector('.context-portal .child').textContent).toBe('store: 0');

    wrapper.unmount(wrapper);
    jest.runOnlyPendingTimers();
  });
});
