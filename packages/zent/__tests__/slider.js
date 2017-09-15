import React from 'react';
import { shallow, mount } from 'enzyme';
import Slider from 'slider';

describe('Slider', () => {
  it('will render div wrapper contains an Slider without any props', () => {
    class Test extends React.Component {
      state = {
        value: 0
      };
      onChange = value => {
        this.setState({ value });
      };

      render() {
        const { value } = this.state;
        return <Slider value={value} onChange={this.onChange} />;
      }
    }
    const wrapper = mount(<Test />);
    expect(
      wrapper
        .find('Slider')
        .at(0)
        .hasClass('zent-slider')
    ).toBe(true);
    expect(wrapper.find('.zent-slider-main').length).toBe(1);
    expect(wrapper.find('.zent-slider-input').length).toBe(1);
    wrapper.setProps({ value: 10 });
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').at(0).node.value).toBe('0');
    expect(
      wrapper
        .find('.zent-slider-toolTips')
        .at(0)
        .props().style.left
    ).toBe('0%');
  });

  it('can have custom wrapper classNames and prefix', () => {
    const wrapper = shallow(
      <Slider className="test-slider-wrapper" prefix="wulv" />
    );
    expect(wrapper.hasClass('test-slider-wrapper')).toBe(true);
    expect(wrapper.hasClass('wulv-slider')).toBe(true);
  });

  it('can range props', () => {
    const wrapper = mount(<Slider range value={[20, 30]} />);
    expect(wrapper.find('ToolTips').length).toBe(2);
    expect(wrapper.find('NumberInput').length).toBe(2);
    expect(
      wrapper
        .find('.zent-slider-toolTips')
        .at(0)
        .props().style.left
    ).toBe('20%');
    expect(
      wrapper
        .find('.zent-slider-toolTips')
        .at(1)
        .props().style.left
    ).toBe('30%');
    expect(wrapper.find('input').at(0).node.value).toBe('20');
    expect(wrapper.find('input').at(1).node.value).toBe('30');
    const style = wrapper
      .find('.zent-slider-track')
      .at(0)
      .props().style;
    expect(style.width).toBe('10%');
    expect(style.left).toBe('20%');
  });

  it('test invalid props', () => {
    expect(() =>
      mount(<Slider max={2} min={1} step={0.1} value={5} />)
    ).toThrow();
    expect(() => mount(<Slider range value={9} />)).toThrow();
    expect(() => mount(<Slider value={[1, 3]} />)).toThrow();
    expect(() => mount(<Slider range value={[3, 1]} />)).toThrow();
    expect(() => mount(<Slider range value={1000} />)).toThrow();
    expect(() => mount(<Slider range value={[10, 20, 30]} />)).toThrow();
    expect(() => mount(<Slider range value={[500, 600]} />)).toThrow();
    expect(() => mount(<Slider range dots value={[50, 60]} />)).toThrow();
  });

  it('can marks, dots props', () => {
    const marks = {
      0: '0%',
      20: '20%',
      50: '50%',
      100: '100%'
    };
    class EventTest extends React.Component {
      state = {
        value: [0, 20]
      };
      onChange = value => {
        this.setState({ value });
      };

      render() {
        const { value } = this.state;
        return (
          <Slider
            range
            value={value}
            onChange={this.onChange}
            marks={marks}
            dots
          />
        );
      }
    }

    const wrapper = mount(<EventTest />);

    expect(wrapper.find('.zent-slider-mark').length).toBe(4);
    expect(wrapper.find('.zent-slider-dot').length).toBe(4);
    expect(wrapper.find('.zent-slider-dot-active').length).toBe(2);
    expect(
      wrapper
        .find('.zent-slider-dot')
        .at(2)
        .simulate('click')
    );
    expect(wrapper.find('.zent-slider-dot-active').length).toBe(3);
    expect(
      wrapper
        .find('.zent-slider-dot')
        .at(2)
        .hasClass('zent-slider-dot-active')
    ).toBe(true);
    expect(
      wrapper
        .find('.zent-slider-toolTips')
        .at(0)
        .props().style.left
    ).toBe('0%');
    expect(wrapper.find('Range').node.getClientWidth()).toBe(0);

    const disabledWrapper = mount(
      <Slider range value={[0, 20]} marks={marks} dots disabled />
    );
    expect(disabledWrapper.find('.zent-slider-dot-active').length).toBe(0);
  });

  it('can range props', () => {
    const wrapper = mount(<Slider range value={[20, 30]} />);
    expect(wrapper.find('ToolTips').length).toBe(2);
    expect(wrapper.find('NumberInput').length).toBe(2);
    expect(
      wrapper
        .find('.zent-slider-toolTips')
        .at(0)
        .props().style.left
    ).toBe('20%');
    expect(
      wrapper
        .find('.zent-slider-toolTips')
        .at(1)
        .props().style.left
    ).toBe('30%');
    expect(wrapper.find('input').at(0).node.value).toBe('20');
    expect(wrapper.find('input').at(1).node.value).toBe('30');
    const style = wrapper
      .find('.zent-slider-track')
      .at(0)
      .props().style;
    expect(style.width).toBe('10%');
    expect(style.left).toBe('20%');
  });

  it('can input onchange props', () => {
    const wrapper = mount(<Slider range value={[20, 30]} />);
    wrapper
      .find('InputField')
      .at(0)
      .node.onChange('start', { target: { value: 25 } });
    wrapper
      .find('InputField')
      .at(0)
      .node.onChange('end', { target: { value: 50 } });
  });
});
