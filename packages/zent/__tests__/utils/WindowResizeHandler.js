import React from 'react';
import { mount } from 'enzyme';
import WindowResizeHandler from 'utils/component/WindowResizeHandler';

describe('WindowResizeHandler', () => {
  it('handles window resize event', () => {
    const onResize = jest.fn();
    const wrapper = mount(<WindowResizeHandler onResize={onResize} />);
    expect(onResize.mock.calls.length).toBe(0);

    const resizeEvent = document.createEvent('HTMLEvents');
    resizeEvent.initEvent('resize', true, true);
    window.dispatchEvent(resizeEvent);
    expect(onResize.mock.calls.length).toBe(0);

    window.innerHeight = 10000;
    window.innerWidth = 10000;
    window.dispatchEvent(resizeEvent);
    expect(onResize.mock.calls.length).toBe(1);

    wrapper.unmount();
  });
});
