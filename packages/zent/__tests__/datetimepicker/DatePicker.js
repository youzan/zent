import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { formatDate } from 'datetimepicker/utils/date';
import DatePicker from 'datetimepicker/DatePicker';

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
    // expect(wrapper.find('.zent-datetime-picker').childAt(0).type()).toBe('div');
    // expect(wrapper.find('.zent-datetime-picker').childAt(0).hasClass('picker-wrapper')).toBe(true);
    expect(wrapper.find('.picker-input').length).toBe(1);
    expect(wrapper.find('.zenticon').length).toBe(2);
    wrapper.find('.picker-input').simulate('click');
  });

  it('DatePicker has its default behavior(DatePanel, MonthPanel and YearPanel 3 level transition)', () => {
    const wrapper = mount(<DatePicker />);

    // expect(pop.find('DatePanel').length).toBe(0);
    // expect(pop.find('MonthPanel').length).toBe(0);
    // expect(pop.find('YearPanel').length).toBe(0);
    wrapper.find('.picker-input').simulate('click');
    // get pop from ref after simulate click.
    const pop = new ReactWrapper(wrapper.instance().picker, true);

    expect(pop.find('DatePanel').length).toBe(1);
    expect(pop.find('MonthPanel').length).toBe(0);
    expect(pop.find('YearPanel').length).toBe(0);
    pop.find('DatePanel .panel__title').simulate('click');
    expect(pop.find('DatePanel').length).toBe(1);
    expect(pop.find('MonthPanel').length).toBe(1);
    expect(pop.find('YearPanel').length).toBe(0);
    pop.find('MonthPanel .panel__title').simulate('click');
    expect(pop.find('DatePanel').length).toBe(1);
    expect(pop.find('MonthPanel').length).toBe(1);
    expect(pop.find('YearPanel').length).toBe(1);
    pop.find('YearPanel .panel__cell--current').simulate('click');
    expect(pop.find('DatePanel').length).toBe(1);
    expect(pop.find('MonthPanel').length).toBe(1);
    expect(pop.find('YearPanel').length).toBe(0);
    pop.find('MonthPanel .panel__cell--current').simulate('click');
    expect(pop.find('DatePanel').length).toBe(1);
    expect(pop.find('MonthPanel').length).toBe(0);
    expect(pop.find('YearPanel').length).toBe(0);
    pop.find('DatePanel .panel__cell--current').simulate('click');
    pop.find('PanelFooter .btn--confirm').simulate('click');
    // expect(document.querySelector('.zent-datetime-picker-popover')).toBe(null);
    // expect(pop.find('DatePanel').length).toBe(0);
    // expect(pop.find('MonthPanel').length).toBe(0);
    // expect(pop.find('YearPanel').length).toBe(0);
  });

  it('DatePicker with showTime switch (some kind of 5-level panel)', () => {
    const wrapper = mount(<DatePicker showTime />);
    wrapper.find('.picker-input').simulate('click');
    const pop = new ReactWrapper(wrapper.instance().picker, true);
    pop.find('.link--current').simulate('click');
    pop.find('.btn--confirm').simulate('click');

    wrapper.find('.picker-input').simulate('click');
    expect(pop.find('TimePanel').length).toBe(1);
    expect(pop.find('TimePanel .time__number').length).toBe(3);
    pop.find('TimePanel .time__number').at(0).simulate('click');
    expect(pop.find('HourPanel').length).toBe(1);
    expect(pop.find('HourPanel Icon').length).toBe(1);
    pop.find('HourPanel Icon').simulate('click');
    expect(pop.find('HourPanel').length).toBe(0);
    pop.find('TimePanel .time__number').at(1).simulate('click');
    expect(pop.find('MinutePanel').length).toBe(1);
    pop.find('MinutePanel Icon').simulate('click');
    expect(pop.find('MinutePanel').length).toBe(0);
    pop.find('TimePanel .time__number').at(2).simulate('click');
    expect(pop.find('SecondPanel').length).toBe(1);
    pop.find('SecondPanel Icon').simulate('click');
    expect(pop.find('SecondPanel').length).toBe(0);
    pop.find('TimePanel .time__number').at(0).simulate('click');
    expect(pop.find('HourPanel').length).toBe(1);
    pop.find('HourPanel .panel__cell--current').simulate('click');
    expect(pop.find('HourPanel').length).toBe(0);
    pop.find('TimePanel .time__number').at(1).simulate('click');
    expect(pop.find('MinutePanel').length).toBe(1);
    pop.find('MinutePanel .panel__cell--current').simulate('click');
    expect(pop.find('MinutePanel').length).toBe(0);
    pop.find('TimePanel .time__number').at(2).simulate('click');
    expect(pop.find('SecondPanel').length).toBe(1);
    pop.find('SecondPanel .panel__cell--current').simulate('click');
    expect(pop.find('SecondPanel').length).toBe(0);
  });

  it('There are prev and next pager in Date/Month/YearPanel', () => {
    const getMonthNumber = string => +string.match(/(\d{4}).*(\d{1})/)[2];
    const getYearNumber = string => +string.match(/(\d{4})/)[1];
    const getYearRangeTail = string => +string.match(/(\d{4}).*(\d{4})/)[2];
    const wrapper = mount(<DatePicker showTime />);

    // DatePanel
    wrapper.find('.picker-input').simulate('click');
    const pop = new ReactWrapper(wrapper.instance().picker, true);

    expect(pop.find('DatePanel').length).toBe(1);
    pop.find('DatePanel .zenticon-right').at(0).simulate('click');
    let prev = getMonthNumber(pop.find('DatePanel .panel__title').text());
    pop.find('DatePanel .zenticon-right').at(1).simulate('click');
    let header = getMonthNumber(pop.find('DatePanel .panel__title').text());
    pop.find('DatePanel .zenticon-right').at(1).simulate('click');
    let next = getMonthNumber(pop.find('DatePanel .panel__title').text());
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
    pop.find('DatePanel .panel__title').simulate('click');
    expect(pop.find('MonthPanel').length).toBe(1);
    pop.find('MonthPanel .zenticon-right').at(0).simulate('click');
    prev = getYearNumber(pop.find('MonthPanel .panel__title').text());
    pop.find('MonthPanel .zenticon-right').at(1).simulate('click');
    header = getYearNumber(pop.find('MonthPanel .panel__title').text());
    pop.find('MonthPanel .zenticon-right').at(1).simulate('click');
    next = getYearNumber(pop.find('MonthPanel .panel__title').text());
    expect(header - prev).toBe(1);
    expect(next - header).toBe(1);

    // YearPanel
    pop.find('MonthPanel .panel__title').simulate('click');
    expect(pop.find('YearPanel').length).toBe(1);
    pop.find('YearPanel .zenticon-right').at(0).simulate('click');
    prev = getYearRangeTail(pop.find('YearPanel .panel__title').text());
    pop.find('YearPanel .zenticon-right').at(1).simulate('click');
    header = getYearRangeTail(pop.find('YearPanel .panel__title').text());
    pop.find('YearPanel .zenticon-right').at(1).simulate('click');
    next = getYearRangeTail(pop.find('YearPanel .panel__title').text());
    expect(next - header).toBe(12);
    expect(header - prev).toBe(12);

    // HACK: branch with unused noop onClick
    pop.find('YearPanel .panel__title').simulate('click');
  });

  it('DatePicker is a controlled component', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    const hoverMock = jest.fn();
    wrapper = mount(
      <DatePicker
        value="2017-01-01"
        onChange={onChangeMock}
        onHover={hoverMock}
      />
    );
    wrapper.find('.picker-input').simulate('click');
    const pop = new ReactWrapper(wrapper.instance().picker, true);

    // Today Button(only put the current selected and active)
    pop.find('PanelFooter .link--current').simulate('click');
    pop.find('PanelFooter .btn--confirm').simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')).toBe(formatDate(new Date(), 'YYYY-MM-DD'));

    // click other date
    wrapper.find('.picker-input').simulate('click');
    pop.find('DatePanel .zenticon-right').at(0).simulate('click');
    pop.find('DatePanel .panel__cell').at(1).simulate('click');
    pop.find('PanelFooter .btn--confirm').simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(2);
    expect(pop.prop('value')).not.toBe(formatDate(new Date(), 'YYYY-MM-DD'));

    // hover event
    // BUG: onHover is not revealed
    wrapper.find('.picker-input').simulate('click');
    pop.find('DatePanel .panel__cell').at(2).simulate('mouseover');
    expect(hoverMock.mock.calls.length).toBe(0);
  });

  // HACK: branch description is not clear
  it('DatePicker will set actived to Date.now() when value prop is unable to parse', () => {
    let wrapper = mount(<DatePicker value={'2001年9月11日'} />);
    expect(
      wrapper.find('DatePicker').getNode().state.actived instanceof Date
    ).toBe(true);

    wrapper = mount(<DatePicker />);
    wrapper.setProps({ prefix: 'zent-custom' });
    expect(wrapper.find('.zent-custom-datetime-picker').length).toBe(1);
    wrapper.setProps({ value: false });
    expect(wrapper.find('DatePicker').getNode().state.value).toBe(undefined);
    wrapper.setProps({ value: '2011-01-01' });
    wrapper.setProps({ format: null });

    wrapper.find('.picker-input').simulate('click');
    const pop = new ReactWrapper(wrapper.instance().picker, true);
    expect(pop.find('DatePanel').length).toBe(1);
    const click = new Event('click');
    document.dispatchEvent(click);
    expect(wrapper.find('ClosablePortal').prop('visible')).toBe(false);
    expect(wrapper.find('DatePanel').length).toBe(0);
  });

  it('DatePicker support value whose type is number or DateObj', () => {
    let pop;
    let wrapper;
    const changeValue = w => {
      w.find('.picker-input').simulate('click');
      pop = new ReactWrapper(w.instance().picker, true);
      pop.find('PanelFooter .link--current').simulate('click');
      pop.find('PanelFooter .btn--confirm').simulate('click');
    };

    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <DatePicker
        onChange={onChangeMock}
        value={new Date(2017, 1, 1).getTime()}
      />
    );
    changeValue(wrapper);
    expect(typeof onChangeMock.mock.calls[0][0]).toBe('number');
    wrapper = mount(<DatePicker onChange={onChangeMock} value={new Date()} />);
    changeValue(wrapper);
    expect(onChangeMock.mock.calls[1][0] instanceof Date).toBe(true);
  });

  it('DatePicker has disable prop', () => {
    // total disable switch
    const getMonthNumber = string => +string.match(/(\d{4}).*(\d{1})/)[2];
    const getYearNumber = string => +string.match(/(\d{4})/)[1];
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
    let pop = new ReactWrapper(wrapper.instance().picker, true);
    expect(pop.find('.panel__cell').every('.panel__cell--disabled')).toBe(true);

    // max
    wrapper = mount(<DatePicker max="2010.01.01" />);
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(wrapper.instance().picker, true);
    expect(getMonthNumber(pop.find('DatePanel .panel__title').text())).toBe(1);
    expect(getYearNumber(pop.find('DatePanel .panel__title').text())).toBe(
      2010
    );
    // expect(pop.find('.panel__cell').every('.panel__cell--disabled')).toBe(true);

    // min
    wrapper = mount(<DatePicker min="3000.01.01" />);
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(wrapper.instance().picker, true);
    expect(getMonthNumber(pop.find('DatePanel .panel__title').text())).toBe(1);
    expect(getYearNumber(pop.find('DatePanel .panel__title').text())).toBe(
      3000
    );

    // expect(pop.find('.panel__cell').every('.panel__cell--disabled')).toBe(true);

    // when disabled, the current link is hidden
    expect(pop.find('.link--current').length).toBe(0);
    // expect(pop.find('DatePicker').getNode().state.selected).toBe(undefined);
    pop.find('.btn--confirm').simulate('click');
    expect(pop.find('DatePanel').length).toBe(1);
  });

  it('supports disabledTime callback', () => {
    const getDisabledTime = () => {
      return {
        disabledHour: () => false,
        disabledMinute: () => false,
        disabledSecond: () => false
      };
    };
    const wrapper = mount(
      <DatePicker showTime disabledTime={getDisabledTime} />
    );
    wrapper.find('.picker-input').simulate('click');
    const pop = new ReactWrapper(wrapper.instance().picker, true);
    expect(pop.find('TimePanel').length).toBe(1);

    pop.find('TimePanel .time__number').first().simulate('click');
    expect(pop.find('HourPanel').length).toBe(1);
    pop.find('HourPanel .link--prev').simulate('click');
    expect(pop.find('HourPanel').length).toBe(0);

    pop.find('TimePanel .time__number').at(1).simulate('click');
    expect(pop.find('MinutePanel').length).toBe(1);
    pop.find('MinutePanel .link--prev').simulate('click');
    expect(pop.find('MinutePanel').length).toBe(0);

    pop.find('TimePanel .time__number').at(2).simulate('click');
    expect(pop.find('SecondPanel').length).toBe(1);
    pop.find('SecondPanel .link--prev').simulate('click');
    expect(pop.find('SecondPanel').length).toBe(0);
  });
});
