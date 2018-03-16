import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WindowEventHandler from 'utils/component/WindowEventHandler';

Enzyme.configure({ adapter: new Adapter() });

describe('WindowEventHandler', () => {
  it('should bind event handler to window', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <WindowEventHandler eventName="click" callback={onClick} useCapture />
    );

    const evt = new MouseEvent('click');
    window.dispatchEvent(evt);
    expect(onClick.mock.calls.length).toBe(1);
    wrapper.unmount();
  });
});
