import React from 'react';
import { MonthPicker } from '../src';
import { mount } from 'enzyme';
import { formatDate } from '../src/utils/format';

describe('MonthPicker', () => {
  it('MonthPicker has 2 level panel', () => {
    const wrapper = mount(<MonthPicker />);
    wrapper.find('.picker-input').simulate('click');
    expect(wrapper.find('MonthPanel').length).toBe(1);
    const click = new Event('click');
    document.dispatchEvent(click);
    expect(wrapper.find('MonthPanel').length).toBe(0);
    wrapper.find('.picker-input').simulate('click');
    wrapper.find('.panel__title').simulate('click');
    expect(wrapper.find('YearPanel').length).toBe(1);
    wrapper.find('YearPanel .panel__cell').at(1).simulate('click');
    expect(wrapper.find('YearPanel').length).toBe(0);
    wrapper.find('MonthPanel .panel__cell').at(1).simulate('click');
    wrapper.find('.btn--confirm').simulate('click');
    expect(wrapper.find('MonthPanel').length).toBe(0);
    wrapper.find('.picker-input').simulate('click');
    wrapper.find('.link--current').simulate('click');
    wrapper.find('.btn--confirm').simulate('click');
    expect(wrapper.find('MonthPanel').length).toBe(0);
    expect(wrapper.find('MonthPicker').getNode().state.selected.getMonth()).toBe(new Date().getMonth());
  });

  it('MonthPicker is a controlled component', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation((value) => {
      wrapper.setProps({ value });
    });
    wrapper = mount(<MonthPicker value="2010-01" onChange={onChangeMock} />);
    expect(wrapper.find('MonthPicker').getNode().state.actived.getFullYear()).toBe(2010);
    expect(wrapper.find('MonthPicker').getNode().state.actived.getMonth()).toBe(0);
    wrapper.find('.picker-input').simulate('click');
    wrapper.find('.link--current').simulate('click');
    wrapper.find('.btn--confirm').simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0][0]).toBe(formatDate(new Date(), 'YYYY-MM'));

    // HACK: branch
    wrapper.setProps({ value: null });
    wrapper.setProps({ value: '2010-02', format: null });

    // BUG: onChangeMonth in MonthPicker is superfluous
  });
});
