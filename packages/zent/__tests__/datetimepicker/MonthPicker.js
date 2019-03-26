import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import MonthPicker from 'datetimepicker/MonthPicker';
import formatDate from 'zan-utils/date/formatDate';

describe('MonthPicker', () => {
  it('MonthPicker not show footer ', () => {
    let pop;
    const wrapper = mount(<MonthPicker />);
    wrapper.find('.picker-input').simulate('click');

    pop = new ReactWrapper(wrapper.instance().picker, true);

    expect(pop.find('MonthPanel').length).toBe(1);
    pop
      .find('.panel__cell')
      .at(1)
      .simulate('click');

    expect(wrapper.state('openPanel')).toBe(false);
  });

  it('MonthPicker has 2 level panel', () => {
    let pop;
    const wrapper = mount(<MonthPicker isFooterVisble />);
    const inst = wrapper.instance();
    expect(inst.state.openPanel).toBe(false);
    expect(inst.state.showPlaceholder).toBe(true);
    wrapper.find('.picker-input').simulate('click');
    expect(inst.state.openPanel).toBe(true);

    pop = new ReactWrapper(inst.picker, true);
    expect(pop.find('MonthPanel').length).toBe(1);
    expect(pop.find('.grid-cell').length).toBe(12);

    const click = new Event('click');
    document.dispatchEvent(click);
    expect(inst.state.openPanel).toBe(false);
    expect(wrapper.find('ClosablePortal').prop('visible')).toBe(false);
    wrapper.find('.picker-input').simulate('click');

    pop.find('.panel__title').simulate('click');
    expect(pop.find('YearPanel').length).toBe(1);
    expect(pop.find('YearPanel .grid-cell').length).toBe(12);

    pop
      .find('YearPanel .panel__cell')
      .at(1)
      .simulate('click');
    expect(pop.find('YearPanel').length).toBe(0);

    pop
      .find('MonthPanel .panel__cell')
      .at(1)
      .simulate('click');
    pop.find('.btn--confirm').simulate('click');
    expect(wrapper.find('ClosablePortal').prop('visible')).toBe(false);

    wrapper.find('.picker-input').simulate('click');
    pop.find('.link--current').simulate('click');
    pop.find('.btn--confirm').simulate('click');
    expect(wrapper.find('ClosablePortal').prop('visible')).toBe(false);
    expect(inst.state.selected.getMonth()).toBe(new Date().getMonth());
  });

  it('MonthPicker return empty string when click clear icon', () => {
    let wrapper;
    const onChangeMock = jest.fn();
    wrapper = mount(
      <MonthPicker value="2010-01" onChange={onChangeMock} isFooterVisble />
    );
    wrapper
      .find('.zenticon-close-circle')
      .at(0)
      .simulate('click');
    expect(onChangeMock.mock.calls[0][0].length).toBe(0);
  });

  it('MonthPicker support default value', () => {
    let wrapper;
    wrapper = mount(<MonthPicker defaultValue="2010-01" isFooterVisble />);
    expect(wrapper.instance().state.actived).toBeInstanceOf(Date);

    wrapper = mount(<MonthPicker vaule="xxxx-xx" isFooterVisble />);
    expect(wrapper.instance().state.showPlaceholder).toBe(true);
  });

  it('MonthPicker is a controlled component', () => {
    let wrapper;
    let pop;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <MonthPicker value="2010-01" onChange={onChangeMock} isFooterVisble />
    );

    const inst = wrapper.instance();
    expect(inst.state.showPlaceholder).toBe(false);
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(inst.picker, true);

    expect(inst.state.actived.getFullYear()).toBe(2010);
    expect(inst.state.actived.getMonth()).toBe(0);

    pop.find('.link--current').simulate('click');
    expect(inst.state.actived.getMonth()).toBe(new Date().getMonth());

    pop.find('.btn--confirm').simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0][0]).toBe(
      formatDate(new Date(), 'YYYY-MM')
    );
  });
});
