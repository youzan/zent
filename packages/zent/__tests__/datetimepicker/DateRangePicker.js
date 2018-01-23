import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import DateRangePicker from 'datetimepicker/DateRangePicker';
import isArray from 'lodash/isArray';

describe('DateRangePicker', () => {
  it('DateRangePicker has its core function', () => {
    let pop;
    const wrapper = mount(<DateRangePicker showTime isFooterVisble />);
    wrapper
      .find('.picker-input')
      .at(0)
      .simulate('click');
    pop = new ReactWrapper(wrapper.find('DatePicker').node.picker, true);
    expect(pop.find('DatePanel').length).toBe(1);

    pop
      .find('DatePanel')
      .at(0)
      .find('.panel__cell')
      .at(10)
      .simulate('click');
    pop.find('.btn--confirm').simulate('click');

    wrapper
      .find('.picker-input')
      .at(1)
      .simulate('click');
    pop = new ReactWrapper(wrapper.find('DatePicker').node.picker, true);
    expect(pop.find('DatePanel').length).toBe(1);

    pop
      .find('DatePanel')
      .at(0)
      .find('.panel__cell')
      .at(10)
      .simulate('click');
    pop.find('.btn--confirm').simulate('click');
  });

  it('DateRangePicker render value', () => {
    let pop;
    const wrapper = mount(
      <DateRangePicker value={['2017-01-01', '2017-12-30']} isFooterVisble />
    );
    expect(wrapper.find('.zent-input').at(0).node.value).toBe('2017-01-01');
    wrapper
      .find('.picker-input')
      .at(0)
      .simulate('click');
    pop = new ReactWrapper(wrapper.find('DatePicker').node.picker, true);

    expect(
      pop
        .find('DatePanel')
        .find('.panel__cell--selected')
        .text()
    ).toBe('1');
  });

  it('DateRangePicker is controlled by value', () => {
    let wrapper;
    let pop;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(<DateRangePicker onChange={onChangeMock} isFooterVisble />);
    wrapper
      .find('.picker-input')
      .at(0)
      .simulate('click');
    pop = new ReactWrapper(wrapper.find('DatePicker').node.picker, true);
    pop
      .find('DatePanel')
      .at(0)
      .find('.panel__cell')
      .at(20)
      .simulate('click');
    pop.find('.btn--confirm').simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(isArray(onChangeMock.mock.calls[0][0])).toBe(true);
    expect(onChangeMock.mock.calls[0][0][1].length).toBe(0);

    wrapper
      .find('.picker-input')
      .at(1)
      .simulate('click');
    pop = new ReactWrapper(wrapper.find('DatePicker').at(1).node.picker, true);
    pop
      .find('DatePanel')
      .at(0)
      .find('.panel__cell')
      .at(20)
      .simulate('click');
    pop.find('.btn--confirm').simulate('click');
    expect(isArray(onChangeMock.mock.calls[0][0])).toBe(true);
  });

  it('DateRangePicker call onClose with type', () => {
    let wrapper;
    let pop;
    const onClose = jest.fn();
    const onOpen = jest.fn();
    wrapper = mount(
      <DateRangePicker onClose={onClose} onOpen={onOpen} isFooterVisble />
    );
    wrapper
      .find('.picker-input')
      .at(0)
      .simulate('click');
    pop = new ReactWrapper(wrapper.find('DatePicker').node.picker, true);
    pop.find('.btn--confirm').simulate('click');

    wrapper
      .find('.picker-input')
      .at(1)
      .simulate('click');
    pop = new ReactWrapper(wrapper.find('DatePicker').at(1).node.picker, true);
    pop.find('.btn--confirm').simulate('click');

    expect(onOpen.mock.calls[0][0]).toBe('start');
    expect(onOpen.mock.calls[1][0]).toBe('end');
    expect(onClose.mock.calls[0][0]).toBe('start');
    expect(onClose.mock.calls[1][0]).toBe('end');
  });

  it('DateRangePicker disable and confirm protection', () => {
    const onChangeMock = jest.fn();
    let pop;
    let wrapper = mount(
      <DateRangePicker onChange={onChangeMock} isFooterVisble />
    );
    wrapper
      .find('.picker-input')
      .at(0)
      .simulate('click');
    pop = new ReactWrapper(wrapper.find('DatePicker').node.picker, true);
    pop
      .find('DatePanel')
      .at(0)
      .find('.panel__cell')
      .at(10)
      .simulate('click');
    pop.find('.btn--confirm').simulate('click');

    wrapper
      .find('.picker-input')
      .at(1)
      .simulate('click');
    pop = new ReactWrapper(wrapper.find('DatePicker').node.picker, true);
    pop
      .find('DatePanel')
      .at(0)
      .find('.panel__cell')
      .at(20)
      .simulate('click');
    pop.find('.btn--confirm').simulate('click');

    expect(onChangeMock.mock.calls.length).toBe(2);

    // default disabledDate is noop
    // HACK: branch
    wrapper = mount(<DateRangePicker disabled isFooterVisble />);
    wrapper
      .find('.picker-input')
      .at(0)
      .simulate('click');
    pop = new ReactWrapper(wrapper.find('DatePicker').node.picker, true);

    // support min and max
    pop = mount(
      <DateRangePicker min="2000-01-01" max="2001-01-01" isFooterVisble />
    );
    pop
      .find('.picker-input')
      .at(0)
      .simulate('click');
    expect(pop.find('.panel__cell').every('.panel__cell--disabled')).toBe(true);
  });
});
