import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import WindowEventHandler from '../../src/utils/component/WindowEventHandler';

Enzyme.configure({ adapter: new Adapter() });

describe('WindowEventHandler', () => {
  it('should bind event handler to window', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <WindowEventHandler
        eventName="click"
        listener={onClick}
        options={{ capture: true }}
      />
    );

    const evt = new MouseEvent('click');
    window.dispatchEvent(evt);
    expect(onClick.mock.calls.length).toBe(1);
    wrapper.unmount();
  });
});
