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
    expect(wrapper.node.affix).toBe(true);
    expect(state.position).toBe('fixed');
    expect(state.width).toBe(0);
  });

  it('Affix scroll events', () => {
    const wrapper = mount(<Affix offsetTop={50} />);
    const state = wrapper.state();

    expect(wrapper.node.affix).toBe(true);
    expect(state.width).toBe(0);
    expect(state.position).toBe('fixed');
    expect(state.placeHoldStyle.width).toBe('100%');
    expect(state.placeHoldStyle.height).toBe(0);
    expect(wrapper.node.affix).toBe(true);
    wrapper.setProps({ offsetTop: -100 });
    wrapper.node.updatePin();
    class Test extends React.Component {
      state = {
        value: 0
      };
      onUnpin = () => {
        this.setState({ value: 10 });
      };

      onPin = () => {
        this.setState({ value: 20 });
      };

      render() {
        const { value } = this.state;
        return (
          <Affix onUnpin={this.onUnpin} onPin={this.onPin} offsetBottom={50}>
            <p id="value">{value}</p>
          </Affix>
        );
      }
    }
    const wrapper1 = mount(<Test />);
    const affix = wrapper1.find('Affix');
    const state1 = affix.node.state;
    expect(state1.width).toBe(0);
    affix.node.handleScroll();

    affix.node.pin();
    affix.node.unpin();
    wrapper1.unmount();
  });

  it('unpin if offset is not reached', () => {
    const wrapper = mount(
      <Affix prefix="wulv" className="affix" zIndex={100} offsetTop={50} />
    );
    const { node } = wrapper;
    expect(node.affix).toBe(true);
    wrapper.setProps({ offsetTop: -100 });
    expect(node.affix).toBe(true);
  });
});
