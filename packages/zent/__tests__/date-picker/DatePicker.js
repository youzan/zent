import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Simulate } from 'react-dom/test-utils';
import DatePicker from 'date-picker/DatePicker';
import { formatDate } from 'date-picker/utils/index';
import { isSameDay, addDays } from 'date-fns';

Enzyme.configure({ adapter: new Adapter() });
const DateTimeFormat = 'YYYY-MM-DD HH:mm';

describe('DatePicker', () => {
  it('DatePicker valueType', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(<DatePicker valueType="date" onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    const pop = document.querySelector('.zent-datepicker-panel-footer');

    Simulate.click(pop.querySelector('a'));
    expect(typeof wrapper.prop('value')).toBe('object');
  });

  it('DatePicker showTime', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <DatePicker
        showTime={{ format: 'HH:mm', defaultTime: '00:00' }}
        format={DateTimeFormat}
        onChange={onChangeMock}
      />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    const pop = document.querySelector('.zent-datepicker-panel-footer');
    expect(pop.querySelectorAll('.zent-datepicker').length).toBe(1);
    Simulate.click(pop.querySelector('a'));
    expect(wrapper.prop('value')).toBe(formatDate(new Date(), DateTimeFormat));
  });

  it('DatePicker disabledDate', () => {
    const disabledDate = jest
      .fn()
      .mockImplementation(date => isSameDay(date, new Date()));
    const wrapper = mount(<DatePicker showTime disabledDate={disabledDate} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel-footer');
    Simulate.click(pop.querySelector('a'));
    expect(wrapper.prop('value')).toBe(undefined);
  });

  it('DatePicker disabledDate with `min`, `max`', () => {
    const disabledDate = {
      min: addDays(new Date(), -3),
      max: addDays(new Date(), -1),
    };
    const wrapper = mount(<DatePicker showTime disabledDate={disabledDate} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel-footer');
    Simulate.click(pop.querySelector('a'));
    expect(wrapper.prop('value')).toBe(undefined);
  });

  it('DatePicker disabledTime', () => {
    const disabledTimes = jest.fn();
    const wrapper = mount(
      <DatePicker showTime disabledTimes={disabledTimes} />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(disabledTimes.mock.calls.length).toBeGreaterThan(0);
  });
});
