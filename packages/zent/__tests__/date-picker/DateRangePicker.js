import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Simulate } from 'react-dom/test-utils';
import DateRangePicker from 'date-picker/DateRangePicker';
import { formatDate } from 'date-picker/utils/index';
import { isSameDay } from 'date-fns';

Enzyme.configure({ adapter: new Adapter() });
const DateTimeFormat = 'YYYY-MM-DD HH:mm';

describe('DateRangePicker', () => {
  it('DateRangePicker showTime', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <DateRangePicker
        showTime={{ format: 'HH:mm', defaultTime: ['00:00', '23:59'] }}
        format={DateTimeFormat}
        onChange={onChangeMock}
      />
    );
    wrapper
      .find('.zent-datepicker-trigger')
      .first()
      .simulate('click');
    const pop = document.querySelector('.zent-datepicker-panel-footer');
    expect(pop.querySelectorAll('.zent-datepicker').length).toBe(1);
    Simulate.click(pop.querySelector('a'));
    expect(wrapper.prop('value')[0]).toBe(
      formatDate(new Date(), DateTimeFormat)
    );
  });

  it('DateRangePicker valueType equals to `number`', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <DateRangePicker valueType="number" onChange={onChangeMock} />
    );
    wrapper
      .find('.zent-datepicker-trigger')
      .first()
      .simulate('click');
    const pop = document.querySelector('.zent-datepicker-panel-footer');
    Simulate.click(pop.querySelector('a'));
    expect(isSameDay(wrapper.prop('value')[0], new Date())).toBe(true);
  });

  it('DateRangePicker valueType equals to `date`', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <DateRangePicker valueType="number" onChange={onChangeMock} />
    );
    wrapper
      .find('.zent-datepicker-trigger')
      .first()
      .simulate('click');
    const pop = document.querySelector('.zent-datepicker-panel-footer');
    Simulate.click(pop.querySelector('a'));
    expect(isSameDay(wrapper.prop('value')[0], new Date())).toBe(true);
  });

  it('DateRangePicker disabledDate', () => {
    let wrapper;
    const disabledDate = jest.fn().mockImplementation(() => false);
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <DateRangePicker
        value
        disabledDate={disabledDate}
        onChange={onChangeMock}
      />
    );
    wrapper
      .find('.zent-datepicker-trigger')
      .first()
      .simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel-footer');
    Simulate.click(pop.querySelector('a'));

    wrapper
      .find('.zent-datepicker-trigger')
      .at(1)
      .simulate('click');

    const pop2 = document.querySelector('.zent-datepicker-panel-footer');
    Simulate.click(pop2.querySelector('a'));
    expect(wrapper.prop('value')[1]).toBe(formatDate(new Date(), 'YYYY-MM-DD'));

    wrapper
      .find('.zent-datepicker-trigger')
      .first()
      .simulate('click');
  });
});
