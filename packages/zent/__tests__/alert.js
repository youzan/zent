import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { Alert, ScrollAlert, AlertItem } from 'alert';
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
      wrapper.containsMatchingElement(
        <div className="alert-item-content">
          <span>foobar</span>
        </div>
      )
    ).toBe(true);
  });

  it('render title and description into content', () => {
    const wrapper = mount(<Alert title="title" description="description" />);
    expect(
      wrapper.containsMatchingElement(
        <div className="alert-item-content">
          <>
            <h3 className="alert-item-content__title">title</h3>
            <p className="alert-item-content__description">description</p>
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

  it('has five different style type', () => {
    const infoWrapper = mount(<Alert type="info" />);
    expect(infoWrapper.find('.zent-alert-style-info').length).toBe(1);

    const successWrapper = mount(<Alert type="success" />);
    expect(successWrapper.find('.zent-alert-style-success').length).toBe(1);

    const warningWrapper = mount(<Alert type="warning" />);
    expect(warningWrapper.find('.zent-alert-style-warning').length).toBe(1);

    const errorWrapper = mount(<Alert type="error" />);
    expect(errorWrapper.find('.zent-alert-style-error').length).toBe(1);

    const hintWrapper = mount(<Alert type="hint" />);
    expect(hintWrapper.find('.zent-alert-style-hint').length).toBe(1);
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
      wrapper.containsMatchingElement(
        <div className="alert-item-extra-content">
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
    expect(wrapper.find('.alert-item-close-wrapper').find(Icon).length).toBe(1);
  });

  it('can have custom close trigger content', () => {
    const wrapper = mount(
      <Alert closable closeContent={<a>close</a>}>
        <span>foobar</span>
      </Alert>
    );
    expect(
      wrapper
        .find('.alert-item-close-wrapper')
        .containsMatchingElement(<a>close</a>)
    ).toBe(true);
  });

  it('have onClose callback', () => {
    const onClose = jest.fn();
    let wrapper = mount(<Alert closable onClose={onClose} />);
    wrapper.find('.alert-item-close-wrapper').simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('can controlled by closed prop', () => {
    let wrapper = mount(<Alert closable closed />);
    expect(wrapper.getDOMNode()).toBe(null);
  });
});

describe('ScrollAlert', () => {
  it('scroll alert render children', () => {
    const wrapper = mount(
      <ScrollAlert>
        <AlertItem>
          <span>foobar</span>
        </AlertItem>
      </ScrollAlert>
    );
    expect(
      wrapper.containsMatchingElement(
        <div className="alert-item-content">
          <span>foobar</span>
        </div>
      )
    ).toBe(true);

    wrapper.unmount();
  });

  it('scroll alert container', () => {
    const wrapper = mount(
      <ScrollAlert>
        <AlertItem>
          <span>foobar</span>
        </AlertItem>
      </ScrollAlert>
    );
    expect(wrapper.find('.scroll-container').length).toBe(1);
  });

  it('scroll alert scroll items', () => {
    const wrapper = mount(
      <ScrollAlert>
        <AlertItem>
          <span>foobar1</span>
        </AlertItem>
        <AlertItem>
          <span>foobar2</span>
        </AlertItem>
      </ScrollAlert>
    );
    expect(wrapper.find('.alert-item').length).toBe(3);
  });

  it('scroll alert has not children', () => {
    const wrapper = mount(<ScrollAlert />);
    expect(wrapper.getDOMNode()).toBe(null);
  });

  it('scroll alert loading property', () => {
    const wrapper = mount(
      <ScrollAlert loading>
        <AlertItem>foobar</AlertItem>
      </ScrollAlert>
    );
    expect(wrapper.find(InlineLoading).length).toBe(1);
  });

  it('default type is info', () => {
    const wrapper = mount(
      <ScrollAlert>
        <AlertItem>foobar</AlertItem>
      </ScrollAlert>
    );
    expect(wrapper.find('.zent-alert-style-info').length).toBe(1);
  });

  it('different style type', () => {
    const infoWrapper = mount(
      <ScrollAlert type="info">
        <AlertItem>foobar</AlertItem>
      </ScrollAlert>
    );
    expect(infoWrapper.find('.zent-alert-style-info').length).toBe(1);

    const successWrapper = mount(
      <ScrollAlert type="success">
        <AlertItem>foobar</AlertItem>
      </ScrollAlert>
    );
    expect(successWrapper.find('.zent-alert-style-success').length).toBe(1);

    const warningWrapper = mount(
      <ScrollAlert type="warning">
        <AlertItem>foobar</AlertItem>
      </ScrollAlert>
    );
    expect(warningWrapper.find('.zent-alert-style-warning').length).toBe(1);

    const errorWrapper = mount(
      <ScrollAlert type="error">
        <AlertItem>foobar</AlertItem>
      </ScrollAlert>
    );
    expect(errorWrapper.find('.zent-alert-style-error').length).toBe(1);

    const hintWrapper = mount(
      <ScrollAlert type="hint">
        <AlertItem>foobar</AlertItem>
      </ScrollAlert>
    );
    expect(hintWrapper.find('.zent-alert-style-hint').length).toBe(1);
  });

  it('scroll alert have onClose callback', () => {
    const onClose = jest.fn();
    let wrapper = mount(
      <ScrollAlert onClose={onClose}>
        <AlertItem closable />
      </ScrollAlert>
    );
    wrapper
      .find('.alert-item-close-wrapper')
      .at(0)
      .simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('scroll alert interval property', () => {
    const wrapper = mount(
      <ScrollAlert scrollInterval={3}>
        <AlertItem>foobar1</AlertItem>
        <AlertItem>foobar2</AlertItem>
      </ScrollAlert>
    );

    expect(
      wrapper
        .find('.alert-item')
        .at(0)
        .hasClass('active-item')
    ).toBe(true);

    setTimeout(function() {
      expect(
        wrapper
          .find('.alert-item')
          .at(1)
          .hasClass('active-item')
      ).toBe(true);
    }, 3000);

    jest.clearAllTimers();
  });

  it('scroll alert mouse events', () => {
    const wrapper = mount(
      <ScrollAlert>
        <AlertItem>foobar1</AlertItem>
        <AlertItem>foobar2</AlertItem>
      </ScrollAlert>
    );

    expect(
      wrapper
        .find('.alert-item')
        .at(0)
        .hasClass('active-item')
    ).toBe(true);

    wrapper.update();

    wrapper.find('.scroll-container').simulate('mouseEnter');
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    expect(
      wrapper
        .find('.alert-item')
        .at(0)
        .hasClass('active-item')
    ).toBe(true);

    wrapper.find('.scroll-container').simulate('mouseLeave');
    setTimeout(function() {
      expect(
        wrapper
          .find('.alert-item')
          .at(1)
          .hasClass('active-item')
      ).toBe(true);
    }, 5000);

    jest.clearAllTimers();
  });

  it('scroll alert item close function', () => {
    const wrapper = mount(
      <ScrollAlert>
        <AlertItem closable>foobar1</AlertItem>
        <AlertItem closable>foobar2</AlertItem>
        <AlertItem closable>foobar3</AlertItem>
      </ScrollAlert>
    );
    expect(wrapper.find('.alert-item').length).toBe(4);

    // 最后一个虚拟节点
    wrapper
      .find('.alert-item-close-wrapper')
      .at(3)
      .simulate('click');

    expect(wrapper.find('.alert-item').length).toBe(3);

    wrapper
      .find('.alert-item-close-wrapper')
      .at(1)
      .simulate('click');
    expect(wrapper.find('.alert-item').length).toBe(1);

    wrapper
      .find('.alert-item-close-wrapper')
      .at(0)
      .simulate('click');
    expect(wrapper.find('.alert-item').length).toBe(0);
  });

  it('scroll alert scroll to last-child, reset items', () => {
    jest.useFakeTimers();

    const wrapper = mount(
      <ScrollAlert>
        <AlertItem closable>foobar1</AlertItem>
        <AlertItem closable>foobar2</AlertItem>
      </ScrollAlert>
    );

    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();

    expect(
      wrapper.find('.active-item').containsMatchingElement(<div>foobar1</div>)
    ).toBe(true);
  });
});
