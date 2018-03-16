import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WindowResizeHandler from 'utils/component/WindowResizeHandler';

Enzyme.configure({ adapter: new Adapter() });

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
