import { Component } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Portal from '../../src/portal';

Enzyme.configure({ adapter: new Adapter() });

export default class NonScrollable extends Component {
  state = {
    visible: false,
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onOpen = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div className="non-scrollable-example">
        {visible ? (
          <button onClick={this.onClose} className="btn-close">
            close
          </button>
        ) : (
          <button onClick={this.onOpen} className="btn-open">
            open
          </button>
        )}
        <Portal
          className="non-scrollable-body-portal"
          visible={this.state.visible}
          onClose={this.onClose}
          blockPageScroll
        >
          <div className="inspect-hint">
            Toggle the portal and inspect body.style.overflow in devtool
          </div>
        </Portal>
      </div>
    );
  }
}

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
