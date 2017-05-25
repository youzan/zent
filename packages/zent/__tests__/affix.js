import Affix from 'affix';
import React from 'react';
import { mount } from 'enzyme';

describe('Affix component', () => {
  it('Affix has props', () => {
    const wrapper = mount(<Affix />);
    expect(wrapper.find('.zent-affix').length).toBe(1);
    const props = wrapper.find('Affix').props();
    expect(props.offsetTop).toBe(0);
    expect(props.prefix).toBe('zent');
    expect(props.zIndex).toBe(10);
  });

  it('Affix set props', () => {
    const wrapper = mount(
      <Affix prefix="wulv" className="affix" zIndex={100} offsetTop={50} />
    );
    const props = wrapper.props();
    const state = wrapper.state();
    expect(props.offsetTop).toBe(50);
    expect(props.prefix).toBe('wulv');
    expect(props.zIndex).toBe(100);
    expect(props.className).toBe('affix');
    expect(state.affix).toBe(false);
    expect(state.affixStyle.zIndex).toBe(100);
    expect(state.placeHoldStyle).toBe(null);
  });

  it('Affix scroll events', () => {
    const wrapper = mount(<Affix offsetTop={50} />);
    wrapper.node.handleScroll();
    const state = wrapper.state();

    expect(state.affix).toBe(true);
    expect(state.affixStyle.zIndex).toBe(10);
    expect(state.affixStyle.top).toBe(50);
    expect(state.affixStyle.width).toBe(0);
    expect(state.affixStyle.position).toBe('fixed');
    expect(state.placeHoldStyle.width).toBe(0);
    expect(state.placeHoldStyle.height).toBe(0);

    const wrapper1 = mount(<Affix offsetBottom={50} />);
    wrapper1.node.handleScroll();
    const state1 = wrapper1.state();
    expect(state1.affixStyle.bottom).toBe(50);
  });
});
