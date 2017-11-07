import React from 'react';
import { mount } from 'enzyme';
import Loading from 'loading';
import { getElementLeft, getElementTop } from 'loading/getPosition';

/* eslint-disable */
beforeAll(() => {
  try {
    HTMLElement.offsetLeft = 100;
    HTMLElement.offsetTop = 100;
    HTMLElement.offsetParent = null;
    HTMLElement.prototype.offsetLeft = 100;
    HTMLElement.prototype.offsetTop = 100;
    HTMLElement.prototype.offsetParent = null;
  } catch (e) {}
});
/* eslint-enable */

describe('Loading', () => {
  it('Hack of global model', () => {
    const wrapper = mount(
      <div>
        <button
          onClick={() => {
            Loading.on();
          }}
        />
        <button
          onClick={() => {
            Loading.off();
          }}
        />
      </div>
    );
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    jest.runOnlyPendingTimers();

    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    jest.runOnlyPendingTimers();

    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    jest.runOnlyPendingTimers();

    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    jest.runOnlyPendingTimers();
  });

  it('Loading has static model, support containerClass and prefix...props', () => {
    const wrapper = mount(<Loading show={false} containerClass="foo" />);
    expect(wrapper.prop('height')).toBe(160);
    expect(wrapper.prop('zIndex')).toBe(9998);
    expect(wrapper.find('Loading').find('div').length).toBe(1);
    expect(
      wrapper
        .find('Loading')
        .find('div')
        .hasClass('foo')
    ).toBe(true);
    wrapper.setProps({ show: true });
    wrapper.unmount();
  });

  it('Loading has floating model.', () => {
    let wrapper = mount(
      <Loading show={false} float>
        <span className="foo" />
      </Loading>
    );

    // NOTE: loading loaded at root tail of body, so it's hard to test.
    // BUG: LoadingInstance.js line 87 confusing nested if
    wrapper.setProps({ show: true });
    wrapper.setProps({ show: false });
    wrapper.setProps({ show: true });
    wrapper.unmount();

    // Can be used without children
    wrapper = mount(
      <Loading show float className="loading-test-no-children" />
    );
    expect(document.querySelectorAll('.loading-test-no-children').length).toBe(
      1
    );
    wrapper.unmount();
  });

  it('find element offset', () => {
    const tree = {
      offsetLeft: 1,
      offsetTop: 10,
      offsetParent: {
        offsetLeft: 2,
        offsetTop: 20,
        offsetParent: {
          offsetLeft: 3,
          offsetTop: 30,
          offsetParent: null
        }
      }
    };
    expect(getElementLeft(tree)).toBe(6);
    expect(getElementTop(tree)).toBe(60);
  });
});
