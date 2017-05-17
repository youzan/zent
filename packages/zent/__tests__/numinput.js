import React from 'react';
import { shallow, mount } from 'enzyme';
import Numinput from 'numinput';

describe('Numinput', () => {
  it('will render div wrapper contains an Input component', () => {
    const wrapper = shallow(<Numinput />);
    expect(wrapper.type()).toBe('div');
    expect(wrapper.hasClass('zent-numinput-wrapper')).toBe(true);
    expect(wrapper.find('.zent-input-wrapper')).to.have.length(1);
    expect(wrapper.find('.zent-numinput-wrapper').childAt(0).type()).toBe(
      'span'
    );
    expect(wrapper.find('.zent-numinput-wrapper').childAt(2).type()).toBe(
      'span'
    );
  });

  it('can have custom wrapper classNames', () => {
    const wrapper = shallow(<Numinput className="foo" />);
    expect(wrapper.hasClass('foo')).toBe(true);
    expect(wrapper.find('input').hasClass('foo')).toBe(false);
  });

  it('can have custom prefix of classNames', () => {
    const wrapper = shallow(<Numinput prefix="foo" />);
    expect(wrapper.hasClass('foo-numinput-wrapper')).toBe(true);
  });

  it('pass any props to real input element except "className" & "prefix"', () => {
    let wrapper = shallow(
      <Numinput min={8} max={11} decimal={2} className="foo" />
    );
    expect(wrapper.find('input').props().className).toBe('zent-input');
    expect(wrapper.find('input').props().prefix).toBe(undefined);

    expect(wrapper.props().max).toBe(11);
    expect(wrapper.props().min).toBe(8);
    expect(wrapper.props().decimal).toBe(2);
    wrapper = shallow(<Numinput placeholder="default" disabled />);
    expect(wrapper.find('input').props().placeholder).toBe('default');
    expect(wrapper.find('input').props().disabled).toBe(true);
  });

  it('Numinput has its core function, change value with click on arrow', () => {
    let wrapper = mount(<Numinput type="count" value={2} />);
    wrapper.find('.zent-numinput-arrow').at(1).simulate('click');
    expect(wrapper.prop('value')).toBe(3);
    wrapper.find('.zent-numinput-arrow').at(2).simulate('click');
    expect(wrapper.prop('value')).toBe(2);
  });
});
