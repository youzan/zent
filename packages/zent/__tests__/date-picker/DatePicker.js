import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Simulate } from 'react-dom/test-utils';
import DatePicker from 'date-picker/DatePicker';
import { formatDate } from 'date-picker/utils/index';

Enzyme.configure({ adapter: new Adapter() });
const DateTimeFormat = 'YYYY-MM-DD HH:mm';

describe('DateTimePicker', () => {
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
});
