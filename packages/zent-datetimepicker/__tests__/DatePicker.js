import React from 'react';
import { mount } from 'enzyme';
import { formatDate } from '../src/utils/format';

import DatePicker from '../src';

describe('DateTimePicker', () => {
  it('DatePicker has its default structure', () => {
    /**
     * .zent-datetime-picker
     *   .picker-wrapper
     *     .picker-input
     *       {palceholder||value}
     *       span.zenticon-calendar-o
     */
    const wrapper = mount(<DatePicker />);
    expect(wrapper.find('DatePicker').length).toBe(1);
    expect(wrapper.find('.zent-datetime-picker').childAt(0).type()).toBe('div');
    expect(wrapper.find('.zent-datetime-picker').childAt(0).hasClass('picker-wrapper')).toBe(true);
    expect(wrapper.find('.picker-input').length).toBe(1);
    expect(wrapper.find('.zenticon').length).toBe(2);
    wrapper.find('.picker-input').simulate('click');
  });

  it('DatePicker has its default behavior(DatePanel, MonthPanel and YearPanel 3 level transition)', () => {
    const wrapper = mount(<DatePicker />);
    expect(wrapper.find('DatePanel').length).toBe(0);
    expect(wrapper.find('MonthPanel').length).toBe(0);
    expect(wrapper.find('YearPanel').length).toBe(0);
    wrapper.find('.picker-input').simulate('click');
    expect(wrapper.find('DatePanel').length).toBe(1);
    expect(wrapper.find('MonthPanel').length).toBe(0);
    expect(wrapper.find('YearPanel').length).toBe(0);
    wrapper.find('DatePanel .panel__title').simulate('click');
    expect(wrapper.find('DatePanel').length).toBe(1);
    expect(wrapper.find('MonthPanel').length).toBe(1);
    expect(wrapper.find('YearPanel').length).toBe(0);
    wrapper.find('MonthPanel .panel__title').simulate('click');
    expect(wrapper.find('DatePanel').length).toBe(1);
    expect(wrapper.find('MonthPanel').length).toBe(1);
    expect(wrapper.find('YearPanel').length).toBe(1);
    wrapper.find('YearPanel .panel__cell--current').simulate('click');
    expect(wrapper.find('DatePanel').length).toBe(1);
    expect(wrapper.find('MonthPanel').length).toBe(1);
    expect(wrapper.find('YearPanel').length).toBe(0);
    wrapper.find('MonthPanel .panel__cell--current').simulate('click');
    expect(wrapper.find('DatePanel').length).toBe(1);
    expect(wrapper.find('MonthPanel').length).toBe(0);
    expect(wrapper.find('YearPanel').length).toBe(0);
    wrapper.find('DatePanel .panel__cell--current').simulate('click');
    wrapper.find('PanelFooter .btn--confirm').simulate('click');
    expect(wrapper.find('DatePanel').length).toBe(0);
    expect(wrapper.find('MonthPanel').length).toBe(0);
    expect(wrapper.find('YearPanel').length).toBe(0);
  });

  it('DatePicker with showTime switch (some kind of 5-level panel)', () => {
    const wrapper = mount(<DatePicker showTime />);
    wrapper.find('.picker-input').simulate('click');
    wrapper.find('.link--current').simulate('click');
    wrapper.find('.btn--confirm').simulate('click');
    wrapper.find('.picker-input').simulate('click');
    expect(wrapper.find('TimePanel').length).toBe(1);
    expect(wrapper.find('TimePanel .time__number').length).toBe(3);
    wrapper.find('TimePanel .time__number').at(0).simulate('click');
    expect(wrapper.find('HourPanel').length).toBe(1);
    expect(wrapper.find('HourPanel Icon').length).toBe(1);
    wrapper.find('HourPanel Icon').simulate('click');
    expect(wrapper.find('HourPanel').length).toBe(0);
    wrapper.find('TimePanel .time__number').at(1).simulate('click');
    expect(wrapper.find('MinutePanel').length).toBe(1);
    wrapper.find('MinutePanel Icon').simulate('click');
    expect(wrapper.find('MinutePanel').length).toBe(0);
    wrapper.find('TimePanel .time__number').at(2).simulate('click');
    expect(wrapper.find('SecondPanel').length).toBe(1);
    wrapper.find('SecondPanel Icon').simulate('click');
    expect(wrapper.find('SecondPanel').length).toBe(0);
    wrapper.find('TimePanel .time__number').at(0).simulate('click');
    expect(wrapper.find('HourPanel').length).toBe(1);
    wrapper.find('HourPanel .panel__cell--current').simulate('click');
    expect(wrapper.find('HourPanel').length).toBe(0);
    wrapper.find('TimePanel .time__number').at(1).simulate('click');
    expect(wrapper.find('MinutePanel').length).toBe(1);
    wrapper.find('MinutePanel .panel__cell--current').simulate('click');
    expect(wrapper.find('MinutePanel').length).toBe(0);
    wrapper.find('TimePanel .time__number').at(2).simulate('click');
    expect(wrapper.find('SecondPanel').length).toBe(1);
    wrapper.find('SecondPanel .panel__cell--current').simulate('click');
    expect(wrapper.find('SecondPanel').length).toBe(0);
  });

  it('There are prev and next pager in Date/Month/YearPanel', () => {
    const getMonthNumber = string => +string.match(/(\d{4}).*(\d{1})/)[2];
    const getYearNumber = string => +string.match(/(\d{4})/)[1];
    const getYearRangeTail = string => +string.match(/(\d{4}).*(\d{4})/)[2];
    const wrapper = mount(<DatePicker showTime />);

    // DatePanel
    wrapper.find('.picker-input').simulate('click');
    expect(wrapper.find('DatePanel').length).toBe(1);
    wrapper.find('DatePanel .zenticon-right').at(0).simulate('click');
    let prev = getMonthNumber(wrapper.find('DatePanel .panel__title').text());
    wrapper.find('DatePanel .zenticon-right').at(1).simulate('click');
    let header = getMonthNumber(wrapper.find('DatePanel .panel__title').text());
    wrapper.find('DatePanel .zenticon-right').at(1).simulate('click');
    let next = getMonthNumber(wrapper.find('DatePanel .panel__title').text());
    if (header === 12) {
      expect(prev).toBe(11);
      expect(next).toBe(1);
    } else if (header === 1) {
      expect(prev).toBe(12);
      expect(next).toBe(2);
    } else {
      expect(header - prev).toBe(1);
      expect(header - next).toBe(-1);
    }

    // MonthPanel
    wrapper.find('DatePanel .panel__title').simulate('click');
    expect(wrapper.find('MonthPanel').length).toBe(1);
    wrapper.find('MonthPanel .zenticon-right').at(0).simulate('click');
    prev = getYearNumber(wrapper.find('MonthPanel .panel__title').text());
    wrapper.find('MonthPanel .zenticon-right').at(1).simulate('click');
    header = getYearNumber(wrapper.find('MonthPanel .panel__title').text());
    wrapper.find('MonthPanel .zenticon-right').at(1).simulate('click');
    next = getYearNumber(wrapper.find('MonthPanel .panel__title').text());
    expect(header - prev).toBe(1);
    expect(next - header).toBe(1);

    // YearPanel
    wrapper.find('MonthPanel .panel__title').simulate('click');
    expect(wrapper.find('YearPanel').length).toBe(1);
    wrapper.find('YearPanel .zenticon-right').at(0).simulate('click');
    prev = getYearRangeTail(wrapper.find('YearPanel .panel__title').text());
    wrapper.find('YearPanel .zenticon-right').at(1).simulate('click');
    header = getYearRangeTail(wrapper.find('YearPanel .panel__title').text());
    wrapper.find('YearPanel .zenticon-right').at(1).simulate('click');
    next = getYearRangeTail(wrapper.find('YearPanel .panel__title').text());
    expect(next - header).toBe(12);
    expect(header - prev).toBe(12);

    // HACK: branch with unused noop onClick
    wrapper.find('YearPanel .panel__title').simulate('click');
  });

  it('DatePicker is a controlled component', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation((value) => {
      wrapper.setProps({ value });
    });
    const hoverMock = jest.fn();
    wrapper = mount(<DatePicker value="2017-01-01" onChange={onChangeMock} onHover={hoverMock} />);
    wrapper.find('.picker-input').simulate('click');

    // Today Button(only put the current selected and active)
    wrapper.find('PanelFooter .link--current').simulate('click');
    wrapper.find('PanelFooter .btn--confirm').simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')).toBe(formatDate(new Date(), 'yyyy-mm-dd'));

    // click other date
    wrapper.find('.picker-input').simulate('click');
    wrapper.find('DatePanel .zenticon-right').at(0).simulate('click');
    wrapper.find('DatePanel .panel__cell').at(1).simulate('click');
    wrapper.find('PanelFooter .btn--confirm').simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(2);
    expect(wrapper.prop('value')).not.toBe(formatDate(new Date(), 'yyyy-mm-dd'));

    // hover event
    // BUG: onHover is not revealed
    wrapper.find('.picker-input').simulate('click');
    wrapper.find('DatePanel .panel__cell').at(2).simulate('mouseover');
    expect(hoverMock.mock.calls.length).toBe(0);
  });

  // HACK: branch description is not clear
  it('DatePicker will set actived to Date.now() when value prop is unable to parse', () => {
    let wrapper = mount(<DatePicker value={'2001年9月11日'} />);
    expect(wrapper.find('DatePicker').getNode().state.actived instanceof Date).toBe(true);

    wrapper = mount(<DatePicker />);
    wrapper.setProps({ prefix: 'zent-custom' });
    expect(wrapper.find('.zent-custom-datetime-picker').length).toBe(1);
    wrapper.setProps({ value: false });
    expect(wrapper.find('DatePicker').getNode().state.value).toBe('');
    wrapper.setProps({ value: '2011-01-01' });
    wrapper.setProps({ format: null });

    wrapper.find('.picker-input').simulate('click');
    expect(wrapper.find('DatePanel').length).toBe(1);
    const click = new Event('click');
    document.dispatchEvent(click);
    expect(wrapper.find('DatePanel').length).toBe(0);
  });

  it('DatePicker support value whose type is number or DateObj', () => {
    const changeValue = (w) => {
      w.find('.picker-input').simulate('click');
      w.find('PanelFooter .link--current').simulate('click');
      w.find('PanelFooter .btn--confirm').simulate('click');
    };

    let wrapper;
    const onChangeMock = jest.fn().mockImplementation((value) => {
      wrapper.setProps({ value });
    });
    wrapper = mount(<DatePicker onChange={onChangeMock} value={new Date(2017, 1, 1).getTime()} />);
    changeValue(wrapper);
    expect(typeof onChangeMock.mock.calls[0][0]).toBe('number');
    wrapper = mount(<DatePicker onChange={onChangeMock} value={new Date()} />);
    changeValue(wrapper);
    expect(onChangeMock.mock.calls[1][0] instanceof Date).toBe(true);
  });

  it('DatePicker has disable prop', () => {
    // total disable switch
    let wrapper = mount(<DatePicker disabled />);
    expect(wrapper.find('DatePanel').length).toBe(0);
    wrapper.find('.picker-input').simulate('click');
    expect(wrapper.find('DatePanel').length).toBe(0);

    // disabledTime function
    const disFunc = val => {
      return val.getFullYear() > 2000;
    };
    wrapper = mount(<DatePicker disabledDate={disFunc} />);
    wrapper.find('.picker-input').simulate('click');
    expect(wrapper.find('.panel__cell').every('.panel__cell--disabled')).toBe(true);

    // max
    wrapper = mount(<DatePicker max="2010.01.01" />);
    wrapper.find('.picker-input').simulate('click');
    expect(wrapper.find('.panel__cell').every('.panel__cell--disabled')).toBe(true);

    // min
    wrapper = mount(<DatePicker min="3000.01.01" />);
    wrapper.find('.picker-input').simulate('click');
    expect(wrapper.find('.panel__cell').every('.panel__cell--disabled')).toBe(true);

    // when disabled, the date could not be selected and confirmed
    wrapper.find('.link--current').simulate('click');
    expect(wrapper.find('DatePicker').getNode().state.selected).toBe(undefined);
    wrapper.find('.btn--confirm').simulate('click');
    expect(wrapper.find('DatePanel').length).toBe(1);
  });
});
