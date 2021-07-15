import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import ClampLines from '../src/clamp-lines';

Enzyme.configure({ adapter: new Adapter() });

describe('ClampLines', () => {
  const content =
    'Zent ( ˈzent ) 是有赞 PC 端 WebUI 规范的 React 实现，提供了一整套基础的 UI 组件以及一些常用的业务组件。目前我们有 50+ 组件，这些组件都已经在有赞的各类 PC 业务中使用，我们会在此基础上，持续开发一些新组件。我们的目标是让 React 项目开发更快、更简单。';

  it('basic', () => {
    const wrapper = mount(
      <ClampLines lines={2} popWidth={400} text={content} />
    );
    const instance = wrapper.find(ClampLines).instance();
    instance.element = document.createElement('div');
    instance.element.style.height = '20px';
    instance.innerElement.current = document.createElement('div');
    instance.clampLines();
    wrapper.setState({ holdsFullText: false });
    wrapper.render();
    expect(wrapper.state().holdsFullText).toBe(false);
    const text = instance.innerElement.current.textContent;
    expect(text).not.toBe(content);
    expect(text.endsWith('...')).toBe(true);
  });

  it('mode = correctness', () => {
    const wrapper = mount(
      <ClampLines lines={1} text={content} mode="correctness" />
    );
    const instance = wrapper.find(ClampLines).instance();
    instance.element = document.createElement('div');
    instance.element.style.height = '20px';
    instance.innerElement.current = document.createElement('div');
    wrapper.setState({ holdsFullText: false });
    instance.clampLines();
    wrapper.render();
    expect(wrapper.state().holdsFullText).toBe(true);
  });

  it('do not show pop', () => {
    const wrapper = mount(
      <ClampLines lines={2} popWidth={400} text={content} showPop={false} />
    );
    const instance = wrapper.find(ClampLines).instance();
    instance.innerElement.current = document.createElement('div');
    instance.state.holdsFullText = false;
    const spy = jest.spyOn(instance, 'renderClampedText');
    instance.render();
    expect(spy).toBeCalled();
  });

  it('empty text', () => {
    const wrapper = mount(<ClampLines lines={2} popWidth={400} text="" />);
    const instance = wrapper.find(ClampLines).instance();
    expect(instance.innerElement.current).toBe(null);
  });

  it('resizable', () => {
    const wrapper = mount(
      <ClampLines delay={0} lines={2} popWidth={400} resizable text="" />
    );
    const instance = wrapper.find(ClampLines).instance();
    const element = document.createElement('div');
    element.style.height = '20px';
    instance.element = element;
    const innerElement = document.createElement('div');
    innerElement.textContent = '';
    instance.innerElement.current = innerElement;

    const spy = jest.spyOn(instance, 'clampLines');
    instance.handleWindowResize();
    jest.runOnlyPendingTimers();
    expect(spy).toBeCalled();

    instance.containerWidth = 200;
    instance.handleContainerResize([{ contentBoxSize: [{ inlineSize: 400 }] }]);
    jest.runOnlyPendingTimers();
    expect(spy.mock.calls.length).toBe(2);
  });
});
