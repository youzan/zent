import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import DateRangePicker from 'datetimepicker/DateRangePicker';
import { isArray } from 'datetimepicker/utils';

describe('DateRangePicker', () => {
  it('CombineDateRangePicker not show footer', () => {
    let pop;
    const wrapper = mount(<DateRangePicker type="combine" />);
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(
      wrapper.find('CombineDateRangePicker').node.picker,
      true
    );

    expect(pop.find('DatePanel').length).toBe(2);
    wrapper.find('.picker-input').simulate('click');
    pop
      .find('DatePanel')
      .at(0)
      .find('.panel__cell')
      .at(10)
      .simulate('click');
    pop
      .find('DatePanel')
      .at(1)
      .find('.panel__cell')
      .at(20)
      .simulate('click');

    expect(wrapper.find('DatePanel').length).toBe(0);
  });

  it('CombineDateRangePicker has its core function', () => {
    let pop;
    const wrapper = mount(
      <DateRangePicker type="combine" showTime isFooterVisble />
    );
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(
      wrapper.find('CombineDateRangePicker').node.picker,
      true
    );
    expect(pop.find('DatePanel').length).toBe(2);
    const click = new Event('click');
    document.dispatchEvent(click);
    wrapper.find('.picker-input').simulate('click');
    pop
      .find('DatePanel')
      .at(0)
      .find('.panel__cell')
      .at(10)
      .simulate('click');
    pop
      .find('DatePanel')
      .at(0)
      .find('.panel__cell')
      .at(10)
      .simulate('mouseover');
    pop
      .find('DatePanel')
      .at(1)
      .find('.panel__cell')
      .at(20)
      .simulate('mouseover');
    pop
      .find('DatePanel')
      .at(1)
      .find('.panel__cell')
      .at(20)
      .simulate('click');
    pop
      .find('DatePanel')
      .at(1)
      .find('.panel__cell')
      .at(25)
      .simulate('mouseover');
    pop.find('.btn--confirm').simulate('click');
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(
      wrapper.find('CombineDateRangePicker').node.picker,
      true
    );
    expect(pop.find('.panel__cell--selected').length).toBe(2);
    pop
      .find('DatePanel')
      .at(1)
      .find('.panel__cell')
      .at(10)
      .simulate('click');
    pop
      .find('DatePanel')
      .at(0)
      .find('.panel__cell')
      .at(20)
      .simulate('click');
    pop
      .find('TimePanel')
      .at(0)
      .find('.time__number')
      .at(0)
      .simulate('click');
    pop
      .find('HourPanel .panel__cell')
      .at(5)
      .simulate('click');
    pop
      .find('TimePanel')
      .at(1)
      .find('.time__number')
      .at(0)
      .simulate('click');
    pop
      .find('HourPanel .panel__cell')
      .at(1)
      .simulate('click');
  });

  it('SplitDateRangePicker has its core function', () => {
    let pop;
    const wrapper = mount(
      <DateRangePicker type="split" showTime isFooterVisble />
    );
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

  it('SplitDateRangePicker render value', () => {
    let pop;
    const wrapper = mount(
      <DateRangePicker
        type="split"
        value={['2017-01-01', '2017-12-30']}
        isFooterVisble
      />
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

  it('CombineDateRangePicker is controlled by value', () => {
    let wrapper;
    let pop;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <DateRangePicker
        type="combine"
        value={['2000-01-01', '2000-02-02']}
        onChange={onChangeMock}
        isFooterVisble
      />
    );
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(
      wrapper.find('CombineDateRangePicker').node.picker,
      true
    );
    pop
      .find('DatePanel')
      .at(1)
      .find('.panel__cell')
      .at(10)
      .simulate('click');
    pop
      .find('DatePanel')
      .at(0)
      .find('.panel__cell')
      .at(20)
      .simulate('click');
    pop.find('.btn--confirm').simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(isArray(onChangeMock.mock.calls[0][0])).toBe(true);
  });

  it('SplitDateRangePicker is controlled by value', () => {
    let wrapper;
    let pop;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <DateRangePicker type="split" onChange={onChangeMock} isFooterVisble />
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

  it('SplitDateRangePicker call onClose with type', () => {
    let wrapper;
    let pop;
    const onClose = jest.fn();
    const onOpen = jest.fn();
    wrapper = mount(
      <DateRangePicker
        type="split"
        onClose={onClose}
        onOpen={onOpen}
        isFooterVisble
      />
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

  it('Support three kind of value type', () => {
    let wrapper;
    let pop;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <DateRangePicker
        type="combine"
        value={['2000-01-01', '2000-02-02']}
        valueType="date"
        onChange={onChangeMock}
        isFooterVisble
      />
    );

    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(
      wrapper.find('CombineDateRangePicker').node.picker,
      true
    );
    pop
      .find('DatePanel')
      .at(1)
      .find('.panel__cell')
      .at(10)
      .simulate('click');
    pop
      .find('DatePanel')
      .at(0)
      .find('.panel__cell')
      .at(20)
      .simulate('click');
    pop.find('.btn--confirm').simulate('click');
    expect(onChangeMock.mock.calls[0][0][0]).toBeInstanceOf(Date);

    wrapper = mount(
      <DateRangePicker
        type="combine"
        value={['2000-01-01', '2000-02-02']}
        valueType="number"
        onChange={onChangeMock}
        isFooterVisble
      />
    );

    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(
      wrapper.find('CombineDateRangePicker').node.picker,
      true
    );
    pop
      .find('DatePanel')
      .at(1)
      .find('.panel__cell')
      .at(10)
      .simulate('click');
    pop
      .find('DatePanel')
      .at(0)
      .find('.panel__cell')
      .at(20)
      .simulate('click');
    pop.find('.btn--confirm').simulate('click');
    expect(typeof onChangeMock.mock.calls[1][0][0]).toBe('number');
  });

  it('CombineDateRangePicker support clear value', () => {
    let wrapper;
    const onChangeMock = jest.fn();
    wrapper = mount(
      <DateRangePicker
        type="combine"
        value={['2000-01-01', '2000-02-02']}
        onChange={onChangeMock}
        isFooterVisble
      />
    );

    wrapper
      .find('.zenticon-close-circle')
      .at(0)
      .simulate('click');
    expect(onChangeMock.mock.calls[0][0].length).toBe(0);
  });

  it('CombineDateRangePicker disable and confirm protection', () => {
    const onChangeMock = jest.fn();
    let pop;
    let wrapper = mount(
      <DateRangePicker type="combine" onChange={onChangeMock} isFooterVisble />
    );
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(
      wrapper.find('CombineDateRangePicker').node.picker,
      true
    );
    pop.find('.btn--confirm').simulate('click');
    expect(pop.find('DatePanel').length).toBe(2);

    // default disabledDate is noop
    // HACK: branch
    wrapper = mount(
      <DateRangePicker type="combine" disabledDate={false} isFooterVisble />
    );
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(
      wrapper.find('CombineDateRangePicker').node.picker,
      true
    );

    // del ---disabledDate can be a 2 items array ---del
    // BUG: logic error with array disabledDate
    // support min and max
    pop = mount(
      <DateRangePicker
        type="combine"
        min="2000-01-01"
        max="2001-01-01"
        isFooterVisble
      />
    );
    pop.find('.picker-input').simulate('click');
    expect(pop.find('.panel__cell').every('.panel__cell--disabled')).toBe(true);
  });

  it('SplitDateRangePicker disable and confirm protection', () => {
    const onChangeMock = jest.fn();
    let pop;
    let wrapper = mount(
      <DateRangePicker type="split" onChange={onChangeMock} isFooterVisble />
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
    wrapper = mount(<DateRangePicker type="split" disabled isFooterVisble />);
    wrapper
      .find('.picker-input')
      .at(0)
      .simulate('click');
    pop = new ReactWrapper(wrapper.find('DatePicker').node.picker, true);

    // support min and max
    pop = mount(
      <DateRangePicker
        type="split"
        min="2000-01-01"
        max="2001-01-01"
        isFooterVisble
      />
    );
    pop
      .find('.picker-input')
      .at(0)
      .simulate('click');
    expect(pop.find('.panel__cell').every('.panel__cell--disabled')).toBe(true);
  });
});
