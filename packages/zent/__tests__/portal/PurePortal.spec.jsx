import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import PurePortal from '../../src/portal/PurePortal';

Enzyme.configure({ adapter: new Adapter() });

describe('PurePortal', () => {
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
      <PurePortal selector={selector}>
        <div className="PurePortal-child">child</div>
      </PurePortal>
    );
    return {
      wrapper,
      container,
    };
  }

  it('should render null no matter what is passed as child', () => {
    expect(
      mount(
        <PurePortal>
          <div>will not render</div>
        </PurePortal>
      ).contains(<div>will not render</div>)
    ).toBe(false);
  });

  it('should render children to `selector` prop', () => {
    const { container, wrapper } = mountPortal();
    expect(container.querySelector('.PurePortal-child').textContent).toBe(
      'child'
    );
    unmountPortal(wrapper);
    removeContainer(container);
  });

  it('should support DOM Element as `selector`', () => {
    const container = createContainer();
    const { wrapper } = mountPortal(container);
    expect(container.querySelector('.PurePortal-child').textContent).toBe(
      'child'
    );
    unmountPortal(wrapper);
    removeContainer(container);
  });

  it('should re-mount when `selector` changes', () => {
    const { wrapper, container } = mountPortal();

    const anotherContainer = createContainer('another-container');
    wrapper.setProps({
      selector: '.another-container',
    });

    expect(anotherContainer.querySelector('.PurePortal-child')).toBeFalsy();
    jest.runOnlyPendingTimers();
    expect(
      anotherContainer.querySelector('.PurePortal-child').textContent
    ).toBe('child');
    expect(container.querySelector('.PurePortal-child')).toBeFalsy();

    removeContainer(container);
    unmountPortal(wrapper);
    removeContainer(anotherContainer);
  });
});
