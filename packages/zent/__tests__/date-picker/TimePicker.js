import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CombinedTimeRangePicker from 'date-picker/CombinedTimeRangePicker';
import TimePicker from 'date-picker/TimePicker';

Enzyme.configure({ adapter: new Adapter() });

describe('TimePicker', () => {
  it('TimePicker canClear', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(<TimePicker value="00:30:00" onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-can-clear').simulate('mouseenter');

    wrapper.find('.zenticon-close-circle').simulate('click');
    expect(wrapper.prop('value')).toBe('');
  });

  it('CombinedTimeRangePicker canClear', () => {
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <CombinedTimeRangePicker
        value={['00:03:00', '00:04:00']}
        onChange={onChangeMock}
      />
    );
    wrapper.find('.zent-datepicker-can-clear').simulate('mouseenter');

    wrapper.find('.zenticon-close-circle').simulate('click');
    expect(wrapper.prop('value')[0]).toBe('');
    expect(wrapper.prop('value')[1]).toBe('');
  });
});
