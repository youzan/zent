import React from 'react';
import { mount } from 'enzyme';

import Loading from '../src';

/* eslint-disable */
beforeAll(() => {
  try {
    HTMLElement.offsetLeft = 100;
    HTMLElement.offsetTop = 100;
    HTMLElement.offsetParent = null;
    HTMLElement.prototype.offsetLeft = 100;
    HTMLElement.prototype.offsetTop = 100;
    HTMLElement.prototype.offsetParent = null;
  } catch(e) {}
});
/* eslint-enable */

describe('Loading', () => {
  it('Hack of global model', () => {
    const wrapper = mount(<div>
      <button onClick={() => { Loading.on() }} />
      <button onClick={() => { Loading.off() }} />
    </div>);
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('button').at(1).simulate('click');
  });

  it('Loading has static model, support containerClass and prefix...props', () => {
    const wrapper = mount(<Loading show={false} containerClass="foo" />);
    expect(wrapper.prop('height')).toBe(160);
    expect(wrapper.prop('zIndex')).toBe(9998);
    expect(wrapper.find('Loading').find('div').length).toBe(1);
    expect(wrapper.find('Loading').find('div').hasClass('foo')).toBe(true);
    wrapper.setProps({ show: true });
    wrapper.unmount();
  });

  it('Loading has dynamic model(static = false).', () => {
    const wrapper = mount(<Loading show={false} static={false}>
      <span className="foo" />
    </Loading>);

    // NOTE: loading loaded at root tail of body, so it's hard to test.
    // BUG: LoadingInstance.js line 87 confusing nested if
    wrapper.setProps({ show: true });
    wrapper.setProps({ show: false });
    wrapper.setProps({ show: true });
    wrapper.unmount();
  });
});
