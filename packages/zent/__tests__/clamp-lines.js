import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ClampLines from 'clamp-lines';

Enzyme.configure({ adapter: new Adapter() });

describe('ClampLines', () => {
  const content =
    'Zent ( ˈzent ) 是有赞 PC 端 WebUI 规范的 React 实现，提供了一整套基础的 UI 组件以及一些常用的业务组件。目前我们有 50+ 组件，这些组件都已经在有赞的各类 PC 业务中使用，我们会在此基础上，持续开发一些新组件。我们的目标是让 React 项目开发更快、更简单。';
  it('basic', () => {
    const wrapper = mount(
      <ClampLines lines={2} popWidth={400} text={content} />
    );
    const props = wrapper.props();
    const instance = wrapper.find(ClampLines).instance();
    instance.maxHeight = 40;
    instance.lineHeight = 20;
    instance.element = {
      clientHeight: 20,
    };
    instance.innerElement = {
      textContent: '',
    };
    instance.clampLines();

    expect(props.prefix).toBe('zent');
    expect(wrapper.state().noClamp).toBe(true);
    expect(instance.innerElement.textContent).toBe(content);
  });
});
