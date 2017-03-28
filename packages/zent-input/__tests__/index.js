import React from 'react';
import { shallow } from 'enzyme';

import Input from '../src';

describe('Input', () => {
  it('will render div wrapper contains an input without any props', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.type()).toBe('div');
    expect(wrapper.hasClass('zent-input-wrapper')).toBe(true);
    expect(wrapper.find('div > input').length).toBe(1);
    expect(wrapper.find('span').isEmpty()).toBe(true);
  });

  it('can have custom wrapper classNames', () => {
    const wrapper = shallow(<Input className="foo" addonAfter="bar" />);
    expect(wrapper.hasClass('foo')).toBe(true);
    expect(wrapper.hasClass('zent-input-addons')).toBe(true);
    expect(wrapper.find('input').hasClass('foo')).toBe(false);
  });

  it('can have custom prefix of classNames', () => {
    const wrapper = shallow(<Input prefix="foo" addonAfter="bar" addonBefore="rab" />);
    expect(wrapper.hasClass('foo-input-wrapper')).toBe(true);
    expect(wrapper.hasClass('foo-input-addons')).toBe(true);
    expect(wrapper.find('span').at(0).hasClass('foo-input-addon-before')).toBe(true);
    expect(wrapper.find('input').hasClass('foo-input')).toBe(true);
    expect(wrapper.find('span').at(1).hasClass('foo-input-addon-after')).toBe(true);
  });

  it('pass any props to real input element except "className" & "prefix"', () => {
    let wrapper = shallow(<Input defaultValue="not placeholder" min={8} max={11} readOnly type="number" className="foo" />);
    expect(wrapper.find('input').props().className).toBe('zent-input');
    expect(wrapper.find('input').props().prefix).toBe(undefined);
    expect(wrapper.find('input').props().type).toBe('number');
    expect(wrapper.find('input').props().readOnly).toBe(true);
    expect(wrapper.find('input').props().max).toBe(11);
    expect(wrapper.find('input').props().min).toBe(8);
    expect(wrapper.find('input').props().defaultValue).toBe('not placeholder');
    wrapper = shallow(<Input placeholder="default" type="password" disabled />);
    expect(wrapper.find('input').props().type).toBe('password');
    expect(wrapper.find('input').props().placeholder).toBe('default');
    expect(wrapper.find('input').props().disabled).toBe(true);
  });

  it('can insert span aside controlled by prop addon(Before|After)(node)', () => {
    const wrapper = shallow(<Input addonAfter="foo" addonBefore="bar" />);
    expect(wrapper.find('div').childAt(0).type()).toBe('span');
    expect(wrapper.find('div').childAt(0).text()).toBe('bar');
    expect(wrapper.find('div').childAt(1).type()).toBe('input');
    expect(wrapper.find('div').childAt(2).type()).toBe('span');
    expect(wrapper.find('div').childAt(2).text()).toBe('foo');
  });

  it('can handle onChange event', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(<Input onChange={onChangeMock} />);
    wrapper.find('input').simulate('change');
    expect(onChangeMock.mock.calls.length).toBe(1);
    wrapper.find('input').simulate('change');
    wrapper.find('input').simulate('change');
    expect(onChangeMock.mock.calls.length).toBe(3);
  });

  it('can distinguish enter and other keys through keyDown event', () => {
    const onPressEnterMock = jest.fn();
    const onKeyUpMock = jest.fn();
    const onKeyDownMock = jest.fn();
    const wrapper = shallow(<Input onKeyUp={onKeyUpMock} onKeyDown={onKeyDownMock} onPressEnter={onPressEnterMock} />);
    wrapper.find('input').simulate('keyDown', { keyCode: 13 });
    expect(onPressEnterMock.mock.calls.length).toBe(1);
    expect(onKeyDownMock.mock.calls.length).toBe(1);
    expect(onKeyUpMock.mock.calls.length).toBe(0);
    wrapper.find('input').simulate('keyDown', { keyCode: 12 });
    wrapper.find('input').simulate('keyDown', { keyCode: 12 });
    wrapper.find('input').simulate('keyDown', { keyCode: 13 });
    wrapper.find('input').simulate('keyUp', { keyCode: 13 });
    wrapper.find('input').simulate('keyUp', { keyCode: 12 });
    expect(onPressEnterMock.mock.calls.length).toBe(2);
    expect(onKeyDownMock.mock.calls.length).toBe(4);
    expect(onKeyUpMock.mock.calls.length).toBe(2);
  });

  // hack branch
  it('can load with only the enterPress function', () => {
    const onPressEnterMock = jest.fn();
    const wrapper = shallow(<Input onPressEnter={onPressEnterMock} />);
    expect(typeof wrapper.find('input').props().onKeyDown).toBe('function');
    wrapper.find('input').simulate('keyDown', { keyCode: 13 });
    expect(onPressEnterMock.mock.calls.length).toBe(1);
    wrapper.find('input').simulate('keyDown', { keyCode: 12 });
    wrapper.find('input').simulate('keyDown', { keyCode: 12 });
    wrapper.find('input').simulate('keyDown', { keyCode: 13 });
    wrapper.find('input').simulate('keyUp', { keyCode: 13 });
    wrapper.find('input').simulate('keyUp', { keyCode: 12 });
    expect(onPressEnterMock.mock.calls.length).toBe(2);
  });

  it('supports textarea', () => {
    const wrapper = shallow(<Input type="textarea" />);
    expect(wrapper.find('textarea').length).toBe(1);
  });
});
