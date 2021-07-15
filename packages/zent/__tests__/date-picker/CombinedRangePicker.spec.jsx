import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Simulate } from 'react-dom/test-utils';

import { CombinedDateRangePicker } from '../../src/date-picker';

Enzyme.configure({ adapter: new Adapter() });
const DateTimeFormat = 'YYYY-MM-DD HH:mm';
const DateTimeSecFormat = 'YYYY-MM-DD HH:mm:ss';

describe('CombinedRangePicker', () => {
  it('CombinedDateRangePicker value and onChange', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <CombinedDateRangePicker value={[]} onChange={onChangeMock} />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    const pop = document.querySelector('.zent-datepicker-combined-panel');

    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-header-arrow')[0]
    );

    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-header-arrow')[3]
    );

    const cellsLeft = pop.querySelectorAll(
      '.zent-datepicker-combined-panel-body-item'
    )[0];
    Simulate.click(
      cellsLeft.querySelectorAll('.zent-datepicker-panel-body-cells_item')[10]
    );
    expect(onChangeMock.mock.calls.length).toBe(0);

    Simulate.click(
      cellsLeft.querySelectorAll('.zent-datepicker-panel-body-cells_item')[12]
    );
    expect(onChangeMock.mock.calls.length).toBe(1);
    wrapper.unmount();
  });

  it('CombinedDateRangePicker canClear', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <CombinedDateRangePicker
        value={['2020-05-11', '2020-05-20']}
        onChange={onChangeMock}
      />
    );
    wrapper.find('.zent-datepicker-can-clear').simulate('mouseenter');
    wrapper.find('.zenticon-close-circle').simulate('click');
    expect(wrapper.prop('value')[0]).toBe(null);

    wrapper.setProps({
      value: ['2020-05-11', '2020-05-20'],
      valueType: 'date',
    });
    wrapper.update();
    wrapper.find('.zent-datepicker-can-clear').simulate('mouseenter');
    wrapper.find('.zenticon-close-circle').simulate('click');
    expect(wrapper.prop('value')[0]).toBe(null);
  });

  it('CombinedDateRangePicker hoverRange', () => {
    const wrapper = mount(<CombinedDateRangePicker value={['2020-05-11']} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    const pop = document.querySelector('.zent-datepicker-combined-panel');
    const cellsLeft = pop.querySelectorAll(
      '.zent-datepicker-combined-panel-body-item'
    )[0];
    Simulate.mouseEnter(
      cellsLeft.querySelectorAll('.zent-datepicker-cell-inner')[20]
    );
    wrapper.unmount();
  });

  it('CombinedDateRangePicker name', () => {
    const wrapper = mount(
      <CombinedDateRangePicker name={['date1', 'date2']} />
    );
    expect(
      wrapper
        .find('.zent-datepicker-trigger')
        .containsMatchingElement(<input name="date1" />)
    ).toBe(true);
    expect(
      wrapper
        .find('.zent-datepicker-trigger')
        .containsMatchingElement(<input name="date2" />)
    ).toBe(true);
    wrapper.unmount();
  });

  it('CombinedDateRangePicker showTime', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChange = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <CombinedDateRangePicker
        showTime={{ format: 'HH:mm' }}
        format={DateTimeFormat}
        value={['2020-05-20 12:00', '2020-05-20 12:59']}
        onChange={onChange}
      />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const doc = document;
    // start footer
    const startTimeTrigger = doc
      .querySelectorAll('.zent-datepicker-combined-panel-footer')[0]
      .querySelectorAll('.zent-datepicker-trigger')[0];
    Simulate.click(startTimeTrigger);
    const startTimePicker = doc.querySelectorAll('.zent-datepicker-panel')[0];
    const startTimePanel = startTimePicker.querySelector(
      '.zent-datepicker-time-panel-body'
    );
    const startTimeUnits = startTimePanel.querySelectorAll(
      '.zent-datepicker-time-panel-body-unit'
    );
    Simulate.click(startTimeUnits[6]);
    const startTimeBtn = startTimePicker.querySelector(
      '.zent-datepicker-panel-footer-btn'
    );
    Simulate.click(startTimeBtn);

    expect(
      document.querySelectorAll('.zent-datepicker-trigger-input')[0].innerHTML
    ).toBe('06:00');

    // end footer
    const endTimeTrigger = doc
      .querySelectorAll('.zent-datepicker-combined-panel-footer')[0]
      .querySelectorAll('.zent-datepicker-trigger')[1];
    Simulate.click(endTimeTrigger);
    const endTimePicker = doc.querySelectorAll('.zent-datepicker-panel')[0];
    const endTimePanel = endTimePicker.querySelector(
      '.zent-datepicker-time-panel-body'
    );
    const endTimeUnits = endTimePanel.querySelectorAll(
      '.zent-datepicker-time-panel-body-unit'
    );
    Simulate.click(endTimeUnits[20]);
    const endTimeBtn = doc.querySelector('.zent-datepicker-panel-footer-btn');
    Simulate.click(endTimeBtn);

    expect(
      doc.querySelectorAll('.zent-datepicker-trigger-input')[1].innerHTML
    ).toBe('20:59');

    const comfirmBtn = doc
      .querySelectorAll('.zent-datepicker-combined-panel-footer')[0]
      .querySelector('.zent-datepicker-combined-panel-footer-confirm');
    Simulate.click(comfirmBtn);
    wrapper.unmount();
  });

  it('CombinedDateRangePicker disabled confirm', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <CombinedDateRangePicker
        value={['2020-05-10 20:00:00']}
        showTime={{ defualtTime: ['00:00:00', '12:00:00'] }}
        format={DateTimeSecFormat}
        onChange={onChange}
      />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const comfirmBtn = document
      .querySelectorAll('.zent-datepicker-combined-panel-footer')[0]
      .querySelector('.zent-datepicker-combined-panel-footer-confirm');
    Simulate.click(comfirmBtn);
    expect(onChange.mock.calls.length).toBe(0);

    wrapper.setProps({
      value: ['2020-05-10 20:00:00', '2020-05-10 10:00:00'],
    });
    const endTimeTrigger = document
      .querySelectorAll('.zent-datepicker-combined-panel-footer')[0]
      .querySelectorAll('.zent-datepicker-trigger')[1];
    Simulate.click(endTimeTrigger);
    const endTimePicker = document.querySelectorAll(
      '.zent-datepicker-panel'
    )[0];
    const endTimePanel = endTimePicker.querySelector(
      '.zent-datepicker-time-panel-body'
    );
    const endTimeUnits = endTimePanel.querySelectorAll(
      '.zent-datepicker-time-panel-body-unit'
    );
    Simulate.click(endTimeUnits[9]);
    const endTimeBtn = document.querySelector(
      '.zent-datepicker-panel-footer-btn'
    );
    Simulate.click(endTimeBtn);
    expect(onChange.mock.calls.length).toBe(0);

    wrapper.setProps({
      value: ['', '2020-05-10 00:00:00'],
    });
    Simulate.click(comfirmBtn);
    expect(onChange.mock.calls.length).toBe(0);
    wrapper.unmount();
  });
});
