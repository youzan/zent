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

  it('NumberInput has its core function, change value with click on arrow', () => {
    let wrapper = mount(<NumberInput type="count" value={2} />);
    const onChangeMock = jest.fn();
    const onBlurMock = jest.fn().mockImplementation(arg => {
      // simulate outside setState()
      wrapper.setProps({ value: arg });
    });
    wrapper = mount(
      <NumberInput
        max={1}
        min={0}
        onChange={onChangeMock}
        onBlur={onBlurMock}
        type="count"
        value={2}
      />
    );
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    expect(wrapper.state('value')).toBe('1');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    expect(wrapper.state('value')).toBe('0');
    wrapper.find('input').simulate('change');
    expect(onChangeMock.mock.calls.length).toBe(2);
    wrapper.find('input').simulate('blur');
    expect(onBlurMock.mock.calls.length).toBe(0);
    wrapper = mount(<NumberInput min={0} type="count" value={-1} />);
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    expect(wrapper.state('value')).toBe('0');
  });
});
