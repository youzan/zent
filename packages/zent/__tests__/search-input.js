import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchInput from 'search-input';

Enzyme.configure({ adapter: new Adapter() });

describe('SearchInput', () => {
  it('supports onChange and clear, retains focus when click on clear button', () => {
    let value = '';
    const onChange = jest.fn().mockImplementation(evt => {
      evt.preventDefault();
      evt.stopPropagation();
      value = evt.target.value;
    });
    const preventDefault = jest.fn();
    const stopPropagation = jest.fn();
    const wrapper = mount(<SearchInput value={value} onChange={onChange} />);

    expect(
      wrapper
        .find('Icon')
        .childAt(0)
        .hasClass('zenticon-search')
    ).toBe(true);
    expect(wrapper.find('Icon').length).toBe(1);

    wrapper.find('input').simulate('change', {
      target: { value: 'abc' },
      preventDefault,
      stopPropagation,
    });
    expect(onChange.mock.calls.length).toBe(1);
    expect(value).toBe('abc');
    expect(preventDefault.mock.calls.length).toBe(1);
    expect(stopPropagation.mock.calls.length).toBe(1);

    wrapper.setProps({ value });

    expect(wrapper.find('Icon').length).toBe(2);
    expect(
      wrapper
        .find('Icon')
        .at(1)
        .children()
        .hasClass('zenticon-close-circle')
    ).toBe(true);

    const iconPreventDefault = jest.fn();
    wrapper
      .find('Icon')
      .at(1)
      .children()
      .simulate('mousedown', { preventDefault: iconPreventDefault });
    expect(iconPreventDefault.mock.calls.length).toBe(1);

    wrapper
      .find('Icon')
      .at(1)
      .children()
      .simulate('click');
    expect(onChange.mock.calls.length).toBe(2);
    expect(value).toBe('');
  });
});
