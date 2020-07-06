import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Simulate } from 'react-dom/test-utils';
import { startOfYear } from 'date-fns';
import DatePicker from 'date-picker/DatePicker';
import WeekPicker from 'date-picker/WeekPicker';
import MonthPicker from 'date-picker/MonthPicker';
import QuarterPicker from 'date-picker/QuarterPicker';
import YearPicker from 'date-picker/YearPicker';
import TimePicker from 'date-picker/TimePicker';
import CombinedTimeRangePicker from 'date-picker/CombinedTimeRangePicker';
import { Disabled } from 'disabled';
import { formatDate } from 'date-picker/utils/index';

Enzyme.configure({ adapter: new Adapter() });

describe('All of the Picker', () => {
  it('DatePicker value and onChange', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(<DatePicker value="2020-05-11" onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(wrapper.find('.zent-datepicker-trigger-focus').length).toBe(1);
    const pop = document.querySelector('.zent-popover');
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-body-cells_item')[0]
    );
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')).toBe('2020-04-26');
  });

  it('WeekPicker value and onChange', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(
      <WeekPicker
        value={['2020-05-11', '2020-05-17']}
        onChange={onChangeMock}
      />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(wrapper.find('.zent-datepicker-trigger-focus').length).toBe(1);
    const pop = document.querySelector('.zent-popover');
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-body-cells_item')[1]
    );
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')[0]).toBe('2020-04-27');
    expect(wrapper.prop('value')[1]).toBe('2020-05-03');
  });

  it('MonthPicker value and onChange', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(<MonthPicker onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(wrapper.find('.zent-datepicker-trigger-focus').length).toBe(1);
    const pop = document.querySelector('.zent-popover');
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-body-cells_item')[0]
    );
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')).toBe(
      formatDate(startOfYear(new Date()), 'YYYY-MM')
    );
  });

  it('QuarterPicker value and onChange', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(<QuarterPicker onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(wrapper.find('.zent-datepicker-trigger-focus').length).toBe(1);
    const pop = document.querySelector('.zent-popover');
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-body-cells_item')[0]
    );
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')[0]).toBe(
      formatDate(startOfYear(new Date()), 'YYYY-MM')
    );
    expect(wrapper.prop('value')[1]).toBe(
      formatDate(startOfYear(new Date()).setMonth(2), 'YYYY-MM')
    );
  });

  it('YearPicker value and onChange', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(<YearPicker value="2024" onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(wrapper.find('.zent-datepicker-trigger-focus').length).toBe(1);
    const pop = document.querySelector('.zent-popover');
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-body-cells_item')[0]
    );
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')).toBe('2020');
  });

  it('TimePicker value and onChange', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(<TimePicker onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(wrapper.find('.zent-datepicker-trigger-focus').length).toBe(1);
    const pop = document.querySelector('.zent-datepicker-panel-footer');

    Simulate.click(pop.querySelector('a'));
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')).toBe(formatDate(new Date(), 'HH:mm:ss'));
  });

  it('CombinedTimeRangePicker value and onChange', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(<CombinedTimeRangePicker onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(wrapper.find('.zent-datepicker-trigger-focus').length).toBe(1);
    const pop = document.querySelector('.zent-popover');

    Simulate.click(
      pop
        .querySelectorAll('.zent-datepicker-time-panel-body_scroll')[0]
        .querySelectorAll('.zent-datepicker-time-panel-body-unit')[2]
    );
    Simulate.click(
      pop
        .querySelectorAll('.zent-datepicker-time-panel-body_scroll')[3]
        .querySelectorAll('.zent-datepicker-time-panel-body-unit')[3]
    );
    Simulate.click(pop.querySelector('.zent-datepicker-panel-footer-btn'));
    expect(onChangeMock.mock.calls.length).toBe(1);

    expect(wrapper.prop('value')[0]).toBe('02:00:00');
    expect(wrapper.prop('value')[1]).toBe('03:00:00');
  });

  it('DatePicker used in Disabled', () => {
    const wrapper = mount(
      <Disabled>
        <DatePicker />
      </Disabled>
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    const pop = document.querySelector('.zent-datepicker-panel-footer');
    expect(pop).toBe(null);
  });
});
