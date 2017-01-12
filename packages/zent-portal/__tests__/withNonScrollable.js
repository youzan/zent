import React from 'react';
import { mount } from 'enzyme';

import NonScrollable from '../examples/04-non-scrollable';

describe('withNonScrollable', () => {
  it('should prevent container from scrolling using `withNonScrollable`', () => {
    const wrapper = mount(<NonScrollable />);
    expect(document.querySelector('.non-scrollable-body-portal')).toBeFalsy();
    expect(document.body.style.overflow).not.toBe('hidden');

    wrapper.find('.btn-open').simulate('click');
    expect(document.querySelector('.non-scrollable-body-portal')).toBeTruthy();
    expect(document.body.style.overflow).toBe('hidden');

    wrapper.find('.btn-close').simulate('click');
    jest.runOnlyPendingTimers();
    expect(document.querySelector('.non-scrollable-body-portal')).toBeFalsy();
    expect(document.body.style.overflow).not.toBe('hidden');

    wrapper.find('.btn-open').simulate('click');
    expect(document.body.style.overflow).toBe('hidden');

    wrapper.unmount();
    jest.runOnlyPendingTimers();
    expect(document.body.style.overflow).not.toBe('hidden');
  });
});
