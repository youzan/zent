import React from 'react';
import { shallow, mount } from 'enzyme';
import NumberInput from 'number-input';

describe('NumberInput', () => {
  it('will render div wrapper contains an Input component', () => {
    const wrapper = shallow(<NumberInput />);
    expect(wrapper.type()).toBe('div');
    expect(wrapper.hasClass('zent-number-input-wrapper')).toBe(true);
  });

  it('can have custom wrapper classNames', () => {
    const wrapper = shallow(<NumberInput className="foo" />);
    expect(wrapper.hasClass('foo')).toBe(true);
  });

  it('can have custom prefix of classNames', () => {
    const wrapper = shallow(<NumberInput prefix="foo" />);
    expect(wrapper.hasClass('foo-number-input-wrapper')).toBe(true);
  });

  it('change value is - or + ', () => {
    let wrapper = shallow(<NumberInput value={0} />);
    wrapper.find('.zent-input-wrapper').at(0).simulate('blur', { value: '+' });
    expect(wrapper.state('value')).toBe('0');
    wrapper
      .find('.zent-input-wrapper')
      .at(0)
      .simulate('blur', { target: { value: '-' } });
    expect(wrapper.state('value')).toBe('0');
  });

  it('change value within min and max ', () => {
    let wrapper = shallow(
      <NumberInput showStepper value={2} min={0} max={3} />
    );
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    expect(wrapper.state('value')).toBe('3');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    expect(wrapper.state('value')).toBe('0');
    wrapper = shallow(<NumberInput showStepper value={0} min={1} max={3} />);
    expect(wrapper.state('value')).toBe('1');
    wrapper = shallow(<NumberInput showStepper value={6} min={0} max={3} />);
    expect(wrapper.state('value')).toBe('3');
  });

  it('NumberInput has its core function, change value with click on arrow', () => {
    let wrapper = mount(<NumberInput showStepper value={2} />);
    const onChangeMock = jest.fn();
    const onBlurMock = jest.fn().mockImplementation(arg => {
      // simulate outside setState()
      wrapper.setProps({ value: arg });
    });
    wrapper = mount(
      <NumberInput
        onChange={onChangeMock}
        onBlur={onBlurMock}
        showStepper
        value={2}
      />
    );
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    expect(wrapper.state('value')).toBe('3');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    expect(wrapper.state('value')).toBe('2');

    wrapper.find('input').simulate('change');
    expect(onChangeMock.mock.calls.length).toBe(2);
    wrapper.find('input').simulate('blur');
    expect(onBlurMock.mock.calls.length).toBe(0);
    wrapper.setProps({ value: 4 });
    expect(wrapper.state('value')).toBe('4');
    wrapper = mount(<NumberInput min={0} showStepper value={-1} />);
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    expect(wrapper.state('value')).toBe('0');
  });

  it('NumberInput onchange value', () => {
    // let wrapper = mount(<NumberInput showStepper value={2} />);
    let preventDefaultCalled = false;
    let stopPropagationCalled = false;

    const handleChange = e => {
      expect(e.target.value).toBe('1');

      expect(preventDefaultCalled).toBe(false);
      expect(stopPropagationCalled).toBe(false);

      e.preventDefault();
      e.stopPropagation();

      expect(preventDefaultCalled).toBe(true);
      expect(stopPropagationCalled).toBe(true);
    };

    const wrapper = mount(<NumberInput onChange={handleChange} value={1} />);
    wrapper.find('input').simulate('blur', {
      preventDefault() {
        preventDefaultCalled = true;
      },
      stopPropagation() {
        stopPropagationCalled = true;
      }
    });

    wrapper.find('input').simulate('change', {
      target: {
        value: ''
      }
    });
    expect(wrapper.state('value')).toBe('');
  });
});
