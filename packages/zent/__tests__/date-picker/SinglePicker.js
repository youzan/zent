import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Simulate } from 'react-dom/test-utils';
import DatePicker from 'date-picker/DatePicker';
import WeekPicker from 'date-picker/WeekPicker';
import MonthPicker from 'date-picker/MonthPicker';
import QuarterPicker from 'date-picker/QuarterPicker';
import YearPicker from 'date-picker/YearPicker';
import { formatDate } from 'date-picker/utils/index';
import { isSameDay, addDays } from 'date-fns';

Enzyme.configure({ adapter: new Adapter() });
const DateTimeFormat = 'YYYY-MM-DD HH:mm';

describe('SinglePicker', () => {
  it('DatePicker valueType', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(<DatePicker valueType="date" onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    const footer = document.querySelector('.zent-datepicker-panel-footer');
    Simulate.click(footer.querySelector('a'));
    expect(typeof wrapper.prop('value')).toBe('object');

    wrapper.setProps({ valueType: 'number' });
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    const footer2 = document.querySelector('.zent-datepicker-panel-footer');
    Simulate.click(footer2.querySelector('a'));
    expect(typeof wrapper.prop('value')).toBe('number');
    wrapper.unmount();
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
    Simulate.click(pop.querySelector('a'));

    expect(wrapper.prop('value')).toBe(formatDate(new Date(), DateTimeFormat));
    wrapper.unmount();
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
    wrapper.unmount();
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
    wrapper.unmount();
  });

  it('DatePicker disabledTime', () => {
    const disabledTimes = jest.fn();
    const wrapper = mount(
      <DatePicker showTime disabledTimes={disabledTimes} />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    expect(disabledTimes.mock.calls.length).toBeGreaterThan(0);
    wrapper.unmount();
  });

  it('DatePicker disabled cell', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    const disabledDate = () => true;

    wrapper = mount(
      <DatePicker
        value="2020-05-01"
        onChange={onChangeMock}
        disabledDate={disabledDate}
      />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    const pop = document.querySelector('.zent-datepicker-panel');
    const cells = pop.querySelectorAll(
      '.zent-datepicker-panel-body-cells_item'
    );

    const cellInner = pop.querySelectorAll('.zent-datepicker-cell-inner');
    Simulate.mouseEnter(cellInner[0]);
    Simulate.mouseLeave(cellInner[0]);

    Simulate.click(cells[0]);
    expect(onChangeMock.mock.calls.length).toBe(0);
    wrapper.unmount();
  });

  it('DatePicker canClear', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(<DatePicker value="2020-05-11" onChange={onChangeMock} />);

    wrapper.find('.zent-datepicker-can-clear').simulate('mouseenter');
    wrapper.find('.zenticon-close-circle').simulate('click');
    expect(wrapper.prop('value')).toBe('');
  });

  it('DatePicker name', () => {
    const wrapper = mount(<DatePicker name="date" />);

    expect(
      wrapper
        .find('.zent-datepicker-trigger')
        .containsMatchingElement(<input name="date" />)
    ).toBe(true);
  });

  it('DatePicker showTime Object', () => {
    const wrapper = mount(
      <DatePicker showTime={{}} value="2020-05-20 12:10:10" />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    const cells = pop.querySelectorAll(
      '.zent-datepicker-panel-body-cells_item'
    );
    Simulate.click(cells[6]);

    const timeTrigger = pop
      .querySelectorAll('.zent-datepicker-panel-footer')[0]
      .querySelectorAll('.zent-datepicker-trigger')[0];
    Simulate.click(timeTrigger);
    const timePicker = document.querySelectorAll('.zent-datepicker-panel')[1];
    const timePanel = timePicker.querySelectorAll(
      '.zent-datepicker-time-panel-body'
    )[0];
    const timeUnits = timePanel.querySelectorAll(
      '.zent-datepicker-time-panel-body-unit'
    );
    Simulate.click(timeUnits[6]);
    const timeBtn = timePicker.querySelector(
      '.zent-datepicker-panel-footer-btn'
    );
    Simulate.click(timeBtn);

    const confirmBtn = pop.querySelectorAll(
      '.zent-datepicker-panel-footer-btn'
    )[0];
    Simulate.click(confirmBtn);
    wrapper.unmount();
  });

  it('DatePicker title', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <DatePicker value="2020-05-20" onChange={onChange} />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    const header = pop.querySelector('.zent-datepicker-panel-header');
    // change year/month
    const yearTitle = header.querySelectorAll(
      '.zent-datepicker-panel-header-title_clickable'
    )[0];
    const monthTitle = header.querySelectorAll(
      '.zent-datepicker-panel-header-title_clickable'
    )[1];
    Simulate.click(yearTitle);
    const yearPanel = document.querySelector('.zent-datepicker-ym-panel-body');
    const yearUnits = yearPanel.querySelectorAll(
      '.zent-datepicker-panel-body-cells_item'
    );
    Simulate.click(yearUnits[1]);

    Simulate.click(monthTitle);
    const monthPanel = document.querySelector('.zent-datepicker-ym-panel-body');
    const monthUnits = monthPanel.querySelectorAll(
      '.zent-datepicker-panel-body-cells_item'
    );
    Simulate.click(monthUnits[1]);

    // prev
    const prevs = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[0];
    const prevBtns = prevs.querySelectorAll('svg');
    Simulate.click(prevBtns[0]);
    Simulate.click(prevBtns[1]);
    // next
    const nexts = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[1];
    const nextBtns = nexts.querySelectorAll('svg');
    Simulate.click(nextBtns[0]);
    Simulate.click(nextBtns[1]);

    const cells = document
      .querySelector('.zent-datepicker-panel')
      .querySelectorAll('.zent-datepicker-panel-body-cells_item');
    Simulate.click(cells[1]);
    expect(onChange.mock.calls.length).toBe(1);

    wrapper.unmount();
  });

  it('MonthPicker title', () => {
    const wrapper = mount(<MonthPicker value="2020-05" />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    const header = pop.querySelector('.zent-datepicker-panel-header');
    // change year
    const yearTitle = header.querySelectorAll(
      '.zent-datepicker-panel-header-title_clickable'
    )[0];
    Simulate.click(yearTitle);
    const yearPanel = document.querySelector('.zent-datepicker-ym-panel-body');
    const yearUnits = yearPanel.querySelectorAll(
      '.zent-datepicker-panel-body-cells_item'
    );
    Simulate.click(yearUnits[1]);

    // prev
    const prevs = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[0];
    const prevBtns = prevs.querySelectorAll('svg');
    Simulate.click(prevBtns[0]);
    // next
    const nexts = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[1];
    const nextBtns = nexts.querySelectorAll('svg');
    Simulate.click(nextBtns[0]);
    wrapper.unmount();
  });

  it('QuarterPicker title', () => {
    const wrapper = mount(<QuarterPicker value="2020-05" />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    const header = pop.querySelector('.zent-datepicker-panel-header');
    // change year
    const yearTitle = header.querySelectorAll(
      '.zent-datepicker-panel-header-title_clickable'
    )[0];
    Simulate.click(yearTitle);
    const yearPanel = document.querySelector('.zent-datepicker-ym-panel-body');
    const yearUnits = yearPanel.querySelectorAll(
      '.zent-datepicker-panel-body-cells_item'
    );
    Simulate.click(yearUnits[1]);

    // prev
    const prevs = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[0];
    const prevBtns = prevs.querySelectorAll('svg');
    Simulate.click(prevBtns[0]);
    // next
    const nexts = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[1];
    const nextBtns = nexts.querySelectorAll('svg');
    Simulate.click(nextBtns[0]);
    wrapper.unmount();
  });
  it('YearPicker title', () => {
    const wrapper = mount(<YearPicker value="2020" />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    const header = pop.querySelector('.zent-datepicker-panel-header');

    // prev
    const prevs = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[0];
    const prevBtns = prevs.querySelectorAll('svg');
    Simulate.click(prevBtns[0]);
    // next
    const nexts = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[1];
    const nextBtns = nexts.querySelectorAll('svg');
    Simulate.click(nextBtns[0]);
    wrapper.unmount();
  });

  it('WeekPicker hoverRange', () => {
    const wrapper = mount(<WeekPicker value={[]} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    Simulate.mouseEnter(
      pop.querySelectorAll('.zent-datepicker-cell-inner')[20]
    );
    Simulate.mouseLeave(
      pop.querySelectorAll('.zent-datepicker-cell-inner')[20]
    );

    wrapper.unmount();
  });

  it('YearPicker largest value', () => {
    const wrapper = mount(<YearPicker value="2999" />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    wrapper.unmount();
  });
});
