import React from 'react';
import { mount } from 'enzyme';
import { DateRangePicker } from '../src';
import { isArray } from '../src/utils';

describe('DateRangePicker', () => {
  it('DateRangePicker has its core function', () => {
    const wrapper = mount(<DateRangePicker showTime />);
    wrapper.find('.picker-input').simulate('click');
    expect(wrapper.find('DatePanel').length).toBe(2);
    const click = new Event('click');
    document.dispatchEvent(click);
    wrapper.find('.picker-input').simulate('click');
    wrapper.find('DatePanel').at(0).find('.panel__cell')
      .at(10)
      .simulate('click');
    wrapper.find('DatePanel').at(0).find('.panel__cell')
      .at(10)
      .simulate('mouseover');
    wrapper.find('DatePanel').at(1).find('.panel__cell')
      .at(20)
      .simulate('mouseover');
    wrapper.find('DatePanel').at(1).find('.panel__cell')
      .at(20)
      .simulate('click');
    wrapper.find('DatePanel').at(1).find('.panel__cell')
      .at(25)
      .simulate('mouseover');
    wrapper.find('.btn--confirm').simulate('click');
    wrapper.find('.picker-input').simulate('click');
    expect(wrapper.find('.panel__cell--selected').length).toBe(2);
    wrapper.find('DatePanel').at(1).find('.panel__cell')
      .at(10)
      .simulate('click');
    wrapper.find('DatePanel').at(0).find('.panel__cell')
      .at(20)
      .simulate('click');
    wrapper.find('TimePanel').at(0).find('.time__number')
      .at(0)
      .simulate('click');
    wrapper.find('HourPanel .panel__cell').at(5).simulate('click');
    wrapper.find('TimePanel').at(1).find('.time__number')
      .at(0)
      .simulate('click');
    wrapper.find('HourPanel .panel__cell').at(1).simulate('click');
  });

  it('DateRangePicker is controlled by value', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation((value) => {
      wrapper.setProps({ value });
    });
    wrapper = mount(<DateRangePicker value={['2000-01-01', '2000-02-02']} onChange={onChangeMock} />);
    wrapper.find('.picker-input').simulate('click');
    wrapper.find('DatePanel').at(1).find('.panel__cell')
      .at(10)
      .simulate('click');
    wrapper.find('DatePanel').at(0).find('.panel__cell')
      .at(20)
      .simulate('click');
    wrapper.find('.btn--confirm').simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(isArray(onChangeMock.mock.calls[0][0])).toBe(true);

    // BUG: onChangeDate onChangeStart onChangEnd is superfluous in DateRangePicker.js
  });

  it('disable and confirm protection', () => {
    const onChangeMock = jest.fn();
    let wrapper = mount(<DateRangePicker onChange={onChangeMock} />);
    wrapper.find('.picker-input').simulate('click');
    wrapper.find('.btn--confirm').simulate('click');
    expect(wrapper.find('DatePanel').length).toBe(2);

    // default disabledDate is noop
    // HACK: branch
    wrapper = mount(<DateRangePicker disabledDate={false} />);
    wrapper.find('.picker-input').simulate('click');

    // disabledDate can be a 2 items array
    // BUG: logic error with array disabledDate
    wrapper = mount(<DateRangePicker disabledDate={['2000-01-01', '2001-01-01']} />);
    wrapper.find('.picker-input').simulate('click');
    expect(wrapper.find('.panel__cell').every('.panel__cell--disabled')).toBe(true);
  });
});
