import React from 'react';
import { mount } from 'enzyme';
import WindowEventHandler from 'utils/component/WindowEventHandler';

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
