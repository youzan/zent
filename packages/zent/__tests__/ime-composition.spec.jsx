import { Component } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Input from '../src/input';
import IMEComposition from '../src/ime-composition';

Enzyme.configure({ adapter: new Adapter() });

describe('IMEComposition', () => {
  it('not change value when enable', () => {
    const onChange = jest.fn();

    class Simple extends Component {
      state = {
        value: '',
      };

      onChange = e => {
        this.setState({ value: e.target.value });
        onChange();
      };

      render() {
        return (
          <IMEComposition>
            <Input value={this.state.value} onChange={this.onChange} />
          </IMEComposition>
        );
      }
    }

    const wrapper = mount(<Simple />);

    wrapper.find('input').simulate('change', { target: { value: '1' } });

    expect(onChange.mock.calls.length).toBe(1);
    expect(wrapper.state().value).toBe('1');

    wrapper
      .find('input')
      .simulate('compositionStart', { target: { value: '12' } });
    wrapper.find('input').simulate('change', { target: { value: '12' } });

    expect(onChange.mock.calls.length).toBe(1);
    expect(wrapper.state().value).toBe('1');

    wrapper
      .find('input')
      .simulate('compositionEnd', { target: { value: '123' } });

    expect(onChange.mock.calls.length).toBe(2);
    expect(wrapper.state().value).toBe('123');
  });
});
