import { Component } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Portal from '../../src/portal';

Enzyme.configure({ adapter: new Adapter() });

class EscToClose extends Component {
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
      <div className="esc-close-example">
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
          className="esc-close-portal"
          visible={this.state.visible}
          onClose={this.onClose}
          closeOnESC
        >
          <div className="close-hint">Press ESC to close portal</div>
        </Portal>
      </div>
    );
  }
}

describe('withESCToClose', () => {
  it('supports close with ESC key using `withESCToClose` HOC', () => {
    const wrapper = mount(<EscToClose />);

    expect(document.querySelector('.esc-close-portal')).toBeFalsy();
    wrapper.find('.btn-open').simulate('click');
    wrapper.update();
    expect(document.querySelector('.esc-close-portal')).toBeTruthy();

    const escKeyUpEvent = new window.KeyboardEvent('keyup', {
      keyCode: 27,
    });
    document.body.dispatchEvent(escKeyUpEvent);
    jest.runOnlyPendingTimers();
    wrapper.update();
    expect(document.querySelector('.esc-close-portal')).toBeFalsy();

    wrapper.find('.btn-open').simulate('click');
    wrapper.update();
    expect(document.querySelector('.esc-close-portal')).toBeTruthy();

    wrapper.unmount();
    jest.runOnlyPendingTimers();
    wrapper.update();
    expect(document.querySelector('.esc-close-portal')).toBeFalsy();
  });
});
