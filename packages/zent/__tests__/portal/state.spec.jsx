import { Component } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Portal from '../../src/portal';

Enzyme.configure({ adapter: new Adapter() });

class SimpleState extends Component {
  render() {
    const { inc, close, count } = this.props;
    return (
      <div>
        <span className="state-count">{count}</span>
        <button onClick={inc} className="btn-inc">
          +
        </button>
        <button onClick={close} className="btn-close">
          close
        </button>
      </div>
    );
  }
}

/*
  如果Portal的children变了，这个portal不会先unmount再mount，而是直接更新root component
*/
class State extends Component {
  state = {
    visible: false,
    count: 0,
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

  inc = () => {
    const { count } = this.state;
    this.setState({
      count: count + 1,
    });
  };

  saveRef = inst => {
    this.stateContainer = inst;
  };

  render() {
    const { visible } = this.state;
    return (
      <div className="state-example">
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
          className="state-body-portal"
          visible={this.state.visible}
          onClose={this.onClose}
        >
          {/* ref在测试代码里用了，不要删掉 */}
          <SimpleState
            inc={this.inc}
            count={this.state.count}
            close={this.onClose}
            ref={this.saveRef}
          />
        </Portal>
      </div>
    );
  }
}

describe('Portal', () => {
  it('should not unmount when `children` changes', () => {
    const wrapper = mount(<State />);
    wrapper.find('.btn-open').simulate('click');
    expect(
      document.querySelector('.state-body-portal .state-count').textContent
    ).toBe('0');

    wrapper.instance().inc();
    wrapper.update();

    expect(
      document.querySelector('.state-body-portal .state-count').textContent
    ).toBe('1');

    wrapper.instance().onClose();
    jest.runOnlyPendingTimers();
    wrapper.update();
    expect(document.querySelector('.state-body-portal')).toBeFalsy();

    wrapper.unmount();
    jest.runOnlyPendingTimers();
  });
});
