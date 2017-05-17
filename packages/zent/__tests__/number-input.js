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
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    expect(wrapper.state('value')).toBe('3');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    expect(wrapper.state('value')).toBe('2');
  });
});
