import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Alert from 'alert';
import Icon from 'icon';
import Adapter from 'enzyme-adapter-react-16';
import InlineLoading from 'loading/InlineLoading';

Enzyme.configure({ adapter: new Adapter() });

describe('Alert', () => {
  it('render children into content', () => {
    const wrapper = mount(
      <Alert>
        <span>foobar</span>
      </Alert>
    );
    expect(
      wrapper.find('.zent-alert-content').equals(
        <div className="zent-alert-content">
          <span>foobar</span>
        </div>
      )
    ).toBe(true);
  });

  it('render title and description into content', () => {
    const wrapper = mount(<Alert title="title" description="description" />);
    expect(
      wrapper.find('.zent-alert-content').equals(
        <div className="zent-alert-content">
          <>
            <h3 className="zent-alert-content__title">title</h3>
            <p className="zent-alert-content__description">description</p>
          </>
        </div>
      )
    ).toBe(true);
  });

  it('can have custom className', () => {
    const wrapper = mount(<Alert className="foobar" />);
    expect(wrapper.find('.zent-alert.foobar').length).toBe(1);
  });

  it('default type is info', () => {
    const wrapper = mount(
      <Alert>
        <span>foobar</span>
      </Alert>
    );
    expect(wrapper.find('.zent-alert-style-info').length).toBe(1);
  });

  it('has four different style type', () => {
    const infoWrapper = mount(<Alert type="info" />);
    expect(infoWrapper.find('.zent-alert-style-info').length).toBe(1);

    const successWrapper = mount(<Alert type="success" />);
    expect(successWrapper.find('.zent-alert-style-success').length).toBe(1);

    const warningWrapper = mount(<Alert type="warning" />);
    expect(warningWrapper.find('.zent-alert-style-warning').length).toBe(1);

    const errorWrapper = mount(<Alert type="error" />);
    expect(errorWrapper.find('.zent-alert-style-error').length).toBe(1);
  });

  it('loading mode use inline loading component as style icon', () => {
    const wrapper = mount(<Alert loading />);
    expect(wrapper.find(InlineLoading).length).toBe(1);
  });

  it('can has outline mode', () => {
    const wrapper = mount(<Alert outline />);
    expect(wrapper.find('.zent-alert.zent-alert-outline').length).toBe(1);
  });

  it('can has extraContent', () => {
    const wrapper = mount(<Alert extraContent={<div>extra-content</div>} />);
    expect(
      wrapper.find('.zent-alert-extra-content').equals(
        <div className="zent-alert-extra-content">
          <div>extra-content</div>
        </div>
      )
    ).toBe(true);
  });

  it('have default close icon', () => {
    const wrapper = mount(
      <Alert closable>
        <span>foobar</span>
      </Alert>
    );
    expect(wrapper.find('.zent-alert-close-wrapper').find(Icon).length).toBe(1);
  });

  it('can have custom close trigger content', () => {
    const wrapper = mount(
      <Alert closable closeContent={<a>close</a>}>
        <span>foobar</span>
      </Alert>
    );
    expect(
      wrapper.find('.zent-alert-close-wrapper').contains(<a>close</a>)
    ).toBe(true);
  });

  it('have onClose callback', () => {
    const onClose = jest.fn();
    let wrapper = mount(<Alert closable onClose={onClose} />);
    wrapper.find('.zent-alert-close-wrapper').simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('can controlled by closed prop', () => {
    let wrapper = mount(<Alert closable closed />);
    expect(wrapper.getDOMNode()).toBe(null);
  });
});
