import { Component } from 'react';
import { Simulate } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Dialog from '../../src/dialog';

Enzyme.configure({ adapter: new Adapter() });

describe('Dialog component', () => {
  let dialog;

  class DialogTest extends Component {
    state = {
      visible: false,
    };

    render() {
      return <Dialog {...this.props} visible={this.state.visible} />;
    }
  }

  const open = () => {
    dialog.setState({
      visible: true,
    });
  };

  const unmount = () => {
    dialog.unmount();
    jest.runAllTimers();
  };

  beforeEach(() => {
    function onClose() {
      dialog.setState({
        visible: false,
      });
    }

    dialog = mount(
      <DialogTest onClose={onClose} title="hello">
        <p>第一个dialog</p>
      </DialogTest>
    );
  });

  afterEach(unmount);

  it('should render a dialog in body when `visible` is true', () => {
    open();
    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(1);
    expect(document.querySelector('.zent-dialog-r-anchor').parentNode).toBe(
      document.body
    );
  });

  it('should unmount dialog when `visible` changes to false', () => {
    open();
    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(1);

    dialog.setState({
      visible: false,
    });

    jest.runAllTimers();
    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(0);
  });

  it('does not create dialog when mounting', () => {
    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(0);
  });

  it('can have no title', () => {
    dialog.setProps({
      title: undefined,
    });
    open();
    expect(document.querySelectorAll('.zent-dialog-r-header').length).toBe(0);
  });

  it('can have no close button', () => {
    dialog.setProps({
      closeBtn: false,
    });
    open();
    expect(document.querySelectorAll('.zent-dialog-r-close').length).toBe(0);
  });

  it('can have no mask', () => {
    dialog.setProps({
      mask: false,
    });
    open();
    expect(document.querySelectorAll('.zent-dialog-r-backdrop').length).toBe(0);
  });

  it('has mask', () => {
    open();
    expect(document.querySelectorAll('.zent-dialog-r-wrap').length).toBe(1);

    const mask = document.querySelector('.zent-dialog-r-wrap');
    Simulate.click(mask);
    jest.runAllTimers();
    expect(document.querySelectorAll('.zent-dialog-r-wrap').length).toBe(0);
  });

  it('should unmount when click on the close button', () => {
    open();
    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(1);

    Simulate.click(document.querySelector('.zent-dialog-r-close'));
    jest.runAllTimers();
    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(0);
  });

  it('should unmount when presses ESC key', () => {
    open();

    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(1);

    const escKeyUpEvent = new window.KeyboardEvent('keyup', {
      keyCode: 27,
    });
    document.body.dispatchEvent(escKeyUpEvent);

    jest.runAllTimers();
    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(0);
  });

  it('should still be open after reopen before close animation finish', () => {
    open();
    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(1);

    dialog.setState(
      {
        visible: false,
      },
      () => {
        dialog.setState({
          visible: true,
        });
      }
    );

    jest.runAllTimers();
    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(1);
  });

  it('should has transform origin', () => {
    const button = document.createElement('button');
    button.style.position = 'absolute';
    button.style.left = '100px';
    button.style.top = '100px';
    button.addEventListener('click', () => open());

    document.body.appendChild(button);
    button.click();

    jest.runAllTimers();

    dialog.setState(
      {
        visible: false,
      },
      () => {
        dialog.setState({
          visible: true,
        });
      }
    );

    jest.runAllTimers();

    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(1);
    expect(
      document.querySelector('.zent-dialog-r').style.transformOrigin
    ).toBeTruthy();
  });
});
