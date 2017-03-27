import React from 'react';
import { MonthPicker } from '../src';
import { mount, ReactWrapper } from 'enzyme';
import { formatDate } from '../src/utils/format';

describe('MonthPicker', () => {
  it('MonthPicker has 2 level panel', () => {
    let pop;
    const wrapper = mount(<MonthPicker />);
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(wrapper.instance().picker, true);
    expect(pop.find('MonthPanel').length).toBe(1);
    const click = new Event('click');
    document.dispatchEvent(click);
    expect(wrapper.find('ClosablePortal').prop('visible')).toBe(false);
    wrapper.find('.picker-input').simulate('click');
    pop.find('.panel__title').simulate('click');
    expect(pop.find('YearPanel').length).toBe(1);
    pop.find('YearPanel .panel__cell').at(1).simulate('click');
    expect(pop.find('YearPanel').length).toBe(0);
    pop.find('MonthPanel .panel__cell').at(1).simulate('click');
    pop.find('.btn--confirm').simulate('click');
    expect(wrapper.find('ClosablePortal').prop('visible')).toBe(false);
    wrapper.find('.picker-input').simulate('click');
    pop.find('.link--current').simulate('click');
    pop.find('.btn--confirm').simulate('click');
    expect(wrapper.find('ClosablePortal').prop('visible')).toBe(false);
    // expect(pop.find('MonthPicker').getNode().state.selected.getMonth()).toBe(new Date().getMonth());
  });

  it('MonthPicker is a controlled component', () => {
    let wrapper;
    let pop;
    const onChangeMock = jest.fn().mockImplementation((value) => {
      wrapper.setProps({ value });
    });
    wrapper = mount(<MonthPicker value="2010-01" onChange={onChangeMock} />);
    
    // expect(pop.find('MonthPicker').getNode().state.actived.getFullYear()).toBe(2010);
    // expect(pop.find('MonthPicker').getNode().state.actived.getMonth()).toBe(0);
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(wrapper.instance().picker, true);
    pop.find('.link--current').simulate('click');
    pop.find('.btn--confirm').simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0][0]).toBe(formatDate(new Date(), 'YYYY-MM'));

    // HACK: branch
    wrapper.setProps({ value: null });
    wrapper.setProps({ value: '2010-02', format: null });

    // BUG: onChangeMonth in MonthPicker is superfluous
  });
});
