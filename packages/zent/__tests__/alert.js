import React from 'react';
import { mount } from 'enzyme';
import Alert from 'alert';

describe('Alert', () => {
  it('style defaults to info', () => {
    const wrapper = mount(
      <Alert>
        <span>foobar</span>
      </Alert>
    );
    expect(
      wrapper.contains(
        <div className="zent-alert-content-wrapper">
          <div className="zent-alert-content">
            <span>foobar</span>
          </div>
        </div>
      )
    ).toBe(true);
    expect(
      wrapper.contains(<span className="zent-alert-close-btn">×</span>)
    ).toBe(false);
    expect(
      wrapper.find('.zent-alert-style-info.zent-alert-size-normal').length
    ).toBe(1);
  });

  it('can have custom className', () => {
    const wrapper = mount(<Alert className="foobar" />);
    expect(wrapper.find('.zent-alert.foobar').length).toBe(1);
  });

  it('can have custom prefix', () => {
    const wrapper = mount(<Alert prefix="foobar" />);
    expect(wrapper.find('.foobar-alert').length).toBe(1);
  });

  it('can have close button', () => {
    const wrapper = mount(
      <Alert closable>
        <span>foobar</span>
      </Alert>
    );
    expect(wrapper.find('.zent-alert-close-btn').length).toBe(1);
  });

  it('can have a onClose callback', () => {
    const onClose = jest.fn();
    let wrapper = mount(<Alert closable onClose={onClose} />);
    wrapper.find('.zent-alert-close-btn').simulate('click');
    expect(onClose.mock.calls.length).toBe(1);

    wrapper = mount(<Alert closable onClose={null} />);
    expect(() =>
      wrapper.find('.zent-alert-close-btn').simulate('click')
    ).not.toThrow();
  });

  it('has warning style', () => {
    const wrapper = mount(<Alert type="warning" />);
    expect(wrapper.find('.zent-alert-style-warning').length).toBe(1);
  });

  it('has danger style', () => {
    const wrapper = mount(<Alert type="danger" />);
    expect(wrapper.find('.zent-alert-style-danger').length).toBe(1);
  });

  it('error is an alias to danger', () => {
    const wrapper = mount(<Alert type="error" />);
    expect(wrapper.find('.zent-alert-style-danger').length).toBe(1);
  });

  it('can have rounded border', () => {
    const wrapper = mount(<Alert rounded />);
    expect(wrapper.find('.zent-alert-border-rounded').length).toBe(1);
  });

  it('have a large style', () => {
    const wrapper = mount(<Alert size="large" />);
    expect(wrapper.find('.zent-alert-size-large').length).toBe(1);
  });
});
