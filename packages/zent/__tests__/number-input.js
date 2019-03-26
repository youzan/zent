import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NumberInput from 'number-input';

Enzyme.configure({ adapter: new Adapter() });

describe('NumberInput', () => {
  it('will render div wrapper contains an Input component', () => {
    const wrapper = render(<NumberInput />);
    expect(wrapper.hasClass('zent-number-input')).toBe(true);
  });

  it('will throw error with showStepper and showCounter', () => {
    expect(() => {
      mount(<NumberInput showCounter showStepper />);
    }).toThrow();
  });

  it('can have custom wrapper classNames', () => {
    const wrapper = shallow(<NumberInput className="foo" />);
    expect(wrapper.hasClass('foo')).toBe(true);
  });

  it('can have custom prefix of classNames', () => {
    const wrapper = shallow(<NumberInput prefix="foo" />);
    expect(wrapper.hasClass('foo-number-input')).toBe(true);
  });

  it('change value is - or + ', () => {
    let wrapper = mount(<NumberInput value={0} />);
    wrapper.setState({ value: '+' });
    wrapper.find('input').simulate('blur');
    expect(wrapper.state('value')).toBe('');
    wrapper.setState({ value: '-' });
    wrapper.find('input').simulate('blur');
    expect(wrapper.state('value')).toBe('');
  });

  it('change value within min and max ', () => {
    let wrapper = mount(<NumberInput showStepper value={2} min={0} max={3} />);
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
    wrapper = mount(<NumberInput showStepper value={0} min={1} max={3} />);
    expect(wrapper.state('value')).toBe('1');
    wrapper = mount(<NumberInput showStepper value={6} min={0} max={3} />);
    expect(wrapper.state('value')).toBe('3');
  });

  it('NumberInput has its core function, change value with click on arrow', () => {
    let wrapper = mount(<NumberInput showStepper value={2} />);
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({
        value,
      });
    });
    const onBlurMock = jest.fn();
    const onPressEnter = jest.fn();
    wrapper = mount(
      <NumberInput
        onChange={onChangeMock}
        onBlur={onBlurMock}
        onPressEnter={onPressEnter}
        showStepper
        value={2}
      />
    );
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    expect(wrapper.state('value')).toBe('3');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    expect(wrapper.state('value')).toBe('2');

    wrapper.find('input').simulate('change');
    expect(onChangeMock.mock.calls.length).toBe(1);
    wrapper.find('input').simulate('blur');
    expect(onBlurMock.mock.calls.length).toBe(1);
    wrapper.find('input').simulate('keyDown', { keyCode: 13 });
    expect(onPressEnter.mock.calls.length).toBe(1);
    wrapper.setProps({ value: 4 });
    expect(wrapper.state('value')).toBe('4');
    wrapper = mount(<NumberInput min={0} showStepper value={-1} />);
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    expect(wrapper.state('value')).toBe('0');
  });

  it('NumberInput onchange value', () => {
    const handleChange = value => {
      expect(value).toBe('1');
    };

    const wrapper = mount(<NumberInput onChange={handleChange} value={1} />);
    wrapper.find('input').simulate('change', {
      target: {
        value: '',
      },
    });
    expect(wrapper.state('value')).toBe('');
  });
});
