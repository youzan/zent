import React from 'react';
import { shallow, mount } from 'enzyme';

import Portal from 'portal/Portal';

describe('Portal', () => {
  function createContainer(className = 'custom-container') {
    const container = document.createElement('div');
    container.className = className;
    document.body.appendChild(container);
    return container;
  }

  function removeContainer(container) {
    container.parentNode.removeChild(container);
  }

  function unmountPortal(wrapper) {
    wrapper.unmount();
    jest.runOnlyPendingTimers();
  }

  function mountPortal(container) {
    const selector = container || '.custom-container';

    if (!container) {
      container = createContainer('custom-container');
    }

    const wrapper = mount(
      <Portal selector={selector}>
        <div className="portal-child">child</div>
      </Portal>
    );
    return {
      wrapper,
      container
    };
  }

  it('should render null no matter what is passed as child', () => {
    expect(
      shallow(
        <Portal>
          <div>will not render</div>
        </Portal>
      ).contains(<div>will not render</div>)
    ).toBe(false);
  });

  it('should render children to `selector` prop', () => {
    const { container, wrapper } = mountPortal();
    expect(container.querySelector('.portal-child').textContent).toBe('child');
    unmountPortal(wrapper);
    removeContainer(container);
  });

  it('should support DOM Element as `selector`', () => {
    const container = createContainer();
    const { wrapper } = mountPortal(container);
    expect(container.querySelector('.portal-child').textContent).toBe('child');
    unmountPortal(wrapper);
    removeContainer(container);
  });

  it('should support custom className', () => {
    const wrapper = mount(
      <Portal className="custom-className">
        <div className="portal-child" />
      </Portal>
    );
    const container = document.body.querySelector(
      '.custom-className.zent-portal'
    );
    expect(container).toBeTruthy();
    expect(container.querySelector('.portal-child')).toBeTruthy();
    unmountPortal(wrapper);
  });

  it('should support custom css style', () => {
    const wrapper = mount(
      <Portal css={{ top: '100px', position: 'absolute' }}>
        <div className="portal-child" />
      </Portal>
    );
    const container = document.body.querySelector('.zent-portal');
    expect(container).toBeTruthy();
    expect(container.style.position).toBe('absolute');
    expect(container.style.top).toBe('100px');
    expect(container.querySelector('.portal-child')).toBeTruthy();
    unmountPortal(wrapper);
  });

  it('should support custom prefix', () => {
    const wrapper = mount(
      <Portal prefix="custom-prefix">
        <div className="portal-child" />
      </Portal>
    );
    const container = document.body.querySelector('.custom-prefix-portal');
    expect(container).toBeTruthy();
    expect(container.querySelector('.portal-child')).toBeTruthy();
    unmountPortal(wrapper);
  });

  it('should re-mount when `selector` changes', () => {
    const { wrapper, container } = mountPortal();

    const anotherContainer = createContainer('another-container');
    wrapper.setProps({
      selector: '.another-container'
    });

    expect(anotherContainer.querySelector('.portal-child')).toBeFalsy();
    jest.runOnlyPendingTimers();
    expect(anotherContainer.querySelector('.portal-child').textContent).toBe(
      'child'
    );
    expect(container.querySelector('.portal-child')).toBeFalsy();

    removeContainer(container);
    unmountPortal(wrapper);
    removeContainer(anotherContainer);
  });

  it('should only update container attributes when `className` changes', () => {
    const { wrapper, container } = mountPortal();
    wrapper.setProps({
      className: 'new-className'
    });

    jest.runOnlyPendingTimers();
    expect(container.querySelector('.zent-portal.new-className')).toBeTruthy();
    unmountPortal(wrapper);
    removeContainer(container);
  });

  it('should only update container attributes when `prefix` changes', () => {
    const { wrapper, container } = mountPortal();
    wrapper.setProps({
      prefix: 'new-prefix'
    });

    jest.runOnlyPendingTimers();
    expect(container.querySelector('.new-prefix-portal')).toBeTruthy();
    unmountPortal(wrapper);
    removeContainer(container);
  });
});
