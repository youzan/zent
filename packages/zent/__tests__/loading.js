import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Loading from 'loading';

Enzyme.configure({ adapter: new Adapter() });

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
  xit('Loading has static model, support containerClass and prefix...props', () => {
    const wrapper = mount(<Loading show={false} containerClass="foo" />);
    expect(wrapper.prop('height')).toBeUndefined();
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

  xit('Loading has floating model.', () => {
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

  xit('can have children', () => {
    let wrapper = mount(
      <Loading show={false}>
        <span>foobar</span>
      </Loading>
    );
    expect(wrapper.find('.zent-page-loading').length).toBe(0);
    wrapper.setProps({
      show: true,
    });
    expect(wrapper.find('.zent-page-loading').length).toBe(1);
    wrapper.setProps({
      show: true,
    });
    expect(wrapper.find('.zent-page-loading').length).toBe(1);
  });

  xit('show delay', () => {
    let wrapper = mount(
      <Loading show showDelay={1}>
        <span>foobar</span>
      </Loading>
    );
    jest.runOnlyPendingTimers();
    wrapper.update();
    expect(wrapper.find('.zent-page-loading').length).toBe(1);
  });
});
