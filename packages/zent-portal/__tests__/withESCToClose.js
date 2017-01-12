import React from 'react';
import { mount } from 'enzyme';

import EscToClose from '../examples/03-esc-to-close';

describe('withESCToClose', () => {
  it('supports close with ESC key using `withESCToClose` HOC', () => {
    const wrapper = mount(<EscToClose />);

    expect(document.querySelector('.esc-close-portal')).toBeFalsy();
    wrapper.find('.btn-open').simulate('click');
    expect(document.querySelector('.esc-close-portal')).toBeTruthy();

    const escKeyUpEvent = new window.KeyboardEvent('keyup', {
      keyCode: 27
    });
    document.body.dispatchEvent(escKeyUpEvent);
    jest.runOnlyPendingTimers();
    expect(document.querySelector('.esc-close-portal')).toBeFalsy();

    wrapper.find('.btn-open').simulate('click');
    expect(document.querySelector('.esc-close-portal')).toBeTruthy();

    wrapper.unmount();
    jest.runOnlyPendingTimers();
    expect(document.querySelector('.esc-close-portal')).toBeFalsy();
  });
});
