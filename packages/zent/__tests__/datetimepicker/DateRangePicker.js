import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { DateRangePicker } from 'datetimepicker';
import { isArray } from 'datetimepicker/utils';

describe('DateRangePicker', () => {
  it('DateRangePicker has its core function', () => {
    let pop;
    const wrapper = mount(<DateRangePicker showTime />);
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(wrapper.instance().picker, true);
    expect(pop.find('DatePanel').length).toBe(2);
    const click = new Event('click');
    document.dispatchEvent(click);
    wrapper.find('.picker-input').simulate('click');
    pop.find('DatePanel').at(0).find('.panel__cell').at(10).simulate('click');
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
    pop.find('DatePanel').at(1).find('.panel__cell').at(20).simulate('click');
    pop
      .find('DatePanel')
      .at(1)
      .find('.panel__cell')
      .at(25)
      .simulate('mouseover');
    pop.find('.btn--confirm').simulate('click');
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(wrapper.instance().picker, true);
    expect(pop.find('.panel__cell--selected').length).toBe(2);
    pop.find('DatePanel').at(1).find('.panel__cell').at(10).simulate('click');
    pop.find('DatePanel').at(0).find('.panel__cell').at(20).simulate('click');
    pop.find('TimePanel').at(0).find('.time__number').at(0).simulate('click');
    pop.find('HourPanel .panel__cell').at(5).simulate('click');
    pop.find('TimePanel').at(1).find('.time__number').at(0).simulate('click');
    pop.find('HourPanel .panel__cell').at(1).simulate('click');
  });

  it('DateRangePicker is controlled by value', () => {
    let wrapper;
    let pop;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <DateRangePicker
        value={['2000-01-01', '2000-02-02']}
        onChange={onChangeMock}
      />
    );
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(wrapper.instance().picker, true);
    pop.find('DatePanel').at(1).find('.panel__cell').at(10).simulate('click');
    pop.find('DatePanel').at(0).find('.panel__cell').at(20).simulate('click');
    pop.find('.btn--confirm').simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(isArray(onChangeMock.mock.calls[0][0])).toBe(true);

    // BUG: onChangeDate onChangeStart onChangEnd is superfluous in DateRangePicker.js
  });

  it('disable and confirm protection', () => {
    const onChangeMock = jest.fn();
    let pop;
    let wrapper = mount(<DateRangePicker onChange={onChangeMock} />);
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(wrapper.instance().picker, true);
    pop.find('.btn--confirm').simulate('click');
    expect(pop.find('DatePanel').length).toBe(2);

    // default disabledDate is noop
    // HACK: branch
    wrapper = mount(<DateRangePicker disabledDate={false} />);
    wrapper.find('.picker-input').simulate('click');
    pop = new ReactWrapper(wrapper.instance().picker, true);

    // del ---disabledDate can be a 2 items array ---del
    // BUG: logic error with array disabledDate
    // support min and max
    pop = mount(<DateRangePicker min="2000-01-01" max="2001-01-01" />);
    pop.find('.picker-input').simulate('click');
    expect(pop.find('.panel__cell').every('.panel__cell--disabled')).toBe(true);
  });
});
