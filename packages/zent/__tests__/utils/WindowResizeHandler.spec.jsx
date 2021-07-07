import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { WindowResizeHandler } from '../../src/utils/component/WindowResizeHandler';

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  jest
    .spyOn(window, 'requestAnimationFrame')
    .mockImplementation(cb => setTimeout(cb, 0));
});

afterEach(() => {
  window.requestAnimationFrame.mockRestore();
});

describe('WindowResizeHandler', () => {
  it('handles window resize event', () => {
    const onResize = jest.fn();
    const wrapper = mount(<WindowResizeHandler onResize={onResize} />);
    expect(onResize.mock.calls.length).toBe(0);

    const resizeEvent = document.createEvent('HTMLEvents');
    resizeEvent.initEvent('resize', true, true);
    window.dispatchEvent(resizeEvent);
    jest.runAllTimers();
    expect(onResize.mock.calls.length).toBe(0);

    window.innerHeight = 10000;
    window.innerWidth = 10000;
    window.dispatchEvent(resizeEvent);
    jest.runAllTimers();
    expect(onResize.mock.calls.length).toBe(1);

    wrapper.unmount();
  });
});
