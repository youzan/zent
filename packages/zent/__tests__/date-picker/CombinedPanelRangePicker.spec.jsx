import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Component } from 'react';

import { CombinedPanelRangePicker } from '../../src/date-picker';

Enzyme.configure({ adapter: new Adapter() });

describe('CombinedPanelRangePicker', () => {
  it('CombinedPanelRangePicker value and onChange with time', () => {
    const onChangeMock = jest.fn().mockImplementation(value => {
      return value;
    });

    class Picker extends Component {
      state = {
        value: [new Date.now(), new Date.now()],
      };

      handleChange = value => {
        this.setState({ value });
        onChangeMock(value);
      };

      render() {
        const { value } = this.state;
        return (
          <div>
            <CombinedPanelRangePicker
              value={value}
              onChange={this.handleChange}
              showTime={true}
              hideConfirm={true}
            />
          </div>
        );
      }
    }
    const wrapper = mount(<Picker />);

    wrapper.find('.zent-datepicker-panel-header-arrow').at(0).simulate('click');

    wrapper.find('.zent-datepicker-panel-header-arrow').at(2).simulate('click');

    wrapper
      .find('.zent-datepicker-panel-body-cells_item')
      .at(10)
      .simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(1);

    wrapper
      .find('.zent-datepicker-panel-body-cells_item')
      .at(30)
      .simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(2);

    wrapper.unmount();
  });

  it('CombinedPanelRangePicker value and onChange without time', () => {
    const onChangeMock = jest.fn().mockImplementation(value => {
      return value;
    });

    class Picker extends Component {
      state = {
        value: [new Date.now(), new Date.now()],
      };

      handleChange = value => {
        this.setState({ value });
        onChangeMock(value);
      };

      render() {
        const { value } = this.state;
        return (
          <div>
            <CombinedPanelRangePicker
              value={value}
              onChange={this.handleChange}
            />
          </div>
        );
      }
    }
    const wrapper = mount(<Picker />);

    wrapper.find('.zent-datepicker-panel-header-arrow').at(0).simulate('click');

    wrapper.find('.zent-datepicker-panel-header-arrow').at(2).simulate('click');

    wrapper
      .find('.zent-datepicker-panel-body-cells_item')
      .at(10)
      .simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(0);

    wrapper
      .find('.zent-datepicker-panel-body-cells_item')
      .at(30)
      .simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(1);

    wrapper.unmount();
  });
});
