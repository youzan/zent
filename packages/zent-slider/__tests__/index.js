import React from 'react';
import { shallow, mount } from 'enzyme';
import Slider from '../src';

describe('Slider', () => {
  it('will render div wrapper contains an Slider without any props', () => {
    const wrapper = shallow(<Slider />);
    expect(wrapper.hasClass('zent-slider')).toBe(true);
    expect(wrapper.type()).toBe('div');
    const mountWrapper = mount(<Slider />);
    expect(mountWrapper.find('.zent-slider-main').length).toBe(1);
    expect(mountWrapper.find('.zent-slider-input').length).toBe(1);
    expect(mountWrapper.find('input').length).toBe(1);
    expect(mountWrapper.find('input').at(0).node.value).toBe('0');
    expect(mountWrapper.find('.zent-slider-toolTips').at(0).props().style.left).toBe('0%');
  });

  it('can have custom wrapper classNames and prefix', () => {
    const wrapper = shallow(<Slider className="test-slider-wrapper" prefix="wulv" />);
    expect(wrapper.hasClass('test-slider-wrapper')).toBe(true);
    expect(wrapper.hasClass('wulv-slider')).toBe(true);
  });

  it('can max,min,step,value，disabled props', () => {
    const wrapper = mount(<Slider max={2} min={1} step={0.1} value={1.2} disabled />);
    expect(wrapper.find('Range').at(0).prop('max')).toBe(2);
    expect(wrapper.find('Range').at(0).prop('min')).toBe(1);
    expect(wrapper.find('Range').at(0).prop('step')).toBe(0.1);
    expect(wrapper.find('input').at(0).node.value).toBe('1.2');
    expect(wrapper.find('.zent-slider-point-disabled').length).toBe(1);
    expect(wrapper.find('input').at(0).prop('disabled')).toBe(true);
  });

  it('can marks, dots props', () => {
    const marks = {
      0: '0%',
      20: '20%',
      50: '50%',
      100: '100%'
    };
    const wrapper = mount(<Slider range value={[0, 20]} marks={marks} dots />);
    expect(wrapper.find('.zent-slider-mark').length).toBe(4);
    expect(wrapper.find('.zent-slider-dot').length).toBe(4);
    expect(wrapper.find('.zent-slider-dot-active').length).toBe(2);
    expect(wrapper.find('.zent-slider-dot').at(2).simulate('click'));
    expect(wrapper.find('.zent-slider-dot-active').length).toBe(3);
    expect(wrapper.find('.zent-slider-dot').at(2).hasClass('zent-slider-dot-active')).toBe(true);
    expect(wrapper.find('.zent-slider-toolTips').at(0).props().style.left).toBe('0%');
    expect(wrapper.find('.zent-slider-toolTips').at(1).props().style.left).toBe('50%');
    const disabledWrapper = mount(<Slider range value={[0, 20]} marks={marks} dots disabled />);
    expect(disabledWrapper.find('.zent-slider-dot-active').length).toBe(0);
  });

  it('can range props', () => {
    const wrapper = mount(<Slider range value={[20, 30]} />);
    expect(wrapper.find('ToolTips').length).toBe(2);
    expect(wrapper.find('NumberInput').length).toBe(2);
    expect(wrapper.find('.zent-slider-toolTips').at(0).props().style.left).toBe('20%');
    expect(wrapper.find('.zent-slider-toolTips').at(1).props().style.left).toBe('30%');
    expect(wrapper.find('input').at(0).node.value).toBe('20');
    expect(wrapper.find('input').at(1).node.value).toBe('30');
  });

  it('can range props', () => {
    const wrapper = mount(<Slider range value={[20, 30]} />);
    expect(wrapper.find('ToolTips').length).toBe(2);
    expect(wrapper.find('NumberInput').length).toBe(2);
    expect(wrapper.find('.zent-slider-toolTips').at(0).props().style.left).toBe('20%');
    expect(wrapper.find('.zent-slider-toolTips').at(1).props().style.left).toBe('30%');
    expect(wrapper.find('input').at(0).node.value).toBe('20');
    expect(wrapper.find('input').at(1).node.value).toBe('30');
    const style = wrapper.find('.zent-slider-track').at(0).props().style;
    expect(style.width).toBe('10%');
    expect(style.left).toBe('20%');
  });

  it('can onchange props', () => {
    const wrapper = mount(<Slider range value={[20, 30]} />);
    expect(wrapper.find('input').at(0).simulate('change', { target: { value: 25 } }));
    expect(wrapper.find('input').at(0).node.value).toBe('25');
    expect(wrapper.find('input').at(1).simulate('change', { target: { value: 50 } }));
    expect(wrapper.find('input').at(1).node.value).toBe('50');
    expect(wrapper.find('input').at(1).simulate('blur', { target: { value: 150 } }));
    expect(wrapper.find('input').at(1).node.value).toBe('100');
    expect(wrapper.find('input').at(0).simulate('blur', { target: { value: -150 } }));
    expect(wrapper.find('input').at(0).node.value).toBe('0');
  });
});
