import { Component } from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Rate from '../src/rate';

Enzyme.configure({ adapter: new Adapter() });

describe('Rate', () => {
  it('can have custom wrapper classNames', () => {
    const wrapper = shallow(<Rate className="test-rate-wrapper" />);
    expect(wrapper.hasClass('test-rate-wrapper')).toBe(true);
    expect(wrapper.hasClass('zent-rate')).toBe(true);
  });

  it('will render div wrapper contains an Rate without any props', () => {
    class Test extends Component {
      state = {
        value: 2,
      };

      onChange = value => {
        this.setState({ value });
      };

      render() {
        const { value } = this.state;
        return <Rate value={value} onChange={this.onChange} />;
      }
    }
    const wrapper = mount(<Test />);
    expect(wrapper.find('Rate').at(0).children().hasClass('zent-rate')).toBe(
      true
    );
    expect(wrapper.find('.zent-rate-star').length).toBe(5);
    expect(wrapper.find('.zent-rate-star-full').length).toBe(2);
  });

  it('can allowHalf props', () => {
    class EventTest extends Component {
      state = {
        value: 2.5,
      };

      onChange = value => {
        this.setState({ value });
      };

      render() {
        const { value } = this.state;
        return <Rate value={value} onChange={this.onChange} allowHalf />;
      }
    }

    const wrapper = mount(<EventTest />);

    expect(wrapper.find('.zent-rate-star-full').length).toBe(2);
    expect(wrapper.find('.zent-rate-star-zero').length).toBe(2);
    expect(
      wrapper.find('Star').at(2).children().hasClass('zent-rate-star-half')
    ).toBe(true);
  });

  it('can disabled props', () => {
    const disabledWrapper = mount(<Rate value={2} disabled />);
    expect(disabledWrapper.find('.zent-rate-disabled').length).toBe(1);
  });

  it('can onchange props', () => {
    class EventTest extends Component {
      state = {
        value: 2,
      };

      onChange = value => {
        this.setState({ value });
      };

      render() {
        const { value } = this.state;
        return <Rate value={value} onChange={this.onChange} allowHalf />;
      }
    }
    const wrapper = mount(<EventTest />);

    expect(wrapper.find('.zent-rate-star-full').length).toBe(2);
    wrapper.find('Star').at(3).simulate('click');

    expect(wrapper.find('.zent-rate-star-full').length).toBe(4);
    wrapper.find('Star').at(3).simulate('click');
    expect(wrapper.find('.zent-rate-star-full').length).toBe(0);

    wrapper.find('Star').at(4).simulate('mousemove', { pageX: 42 });
    expect(wrapper.find('.zent-rate-star-full').length).toBe(5);

    wrapper.find('Star').at(4).simulate('mousemove', { pageX: -1 });
    expect(wrapper.find('.zent-rate-star-full').length).toBe(4);
  });
});
