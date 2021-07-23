import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithTag,
  findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass,
  Simulate,
  findRenderedComponentWithType,
} from 'react-dom/test-utils';

import Slider from '../src/slider';
import {
  getPotentialValues,
  normalizeToPotentialValue,
} from '../src/slider/normalize';
import NumberInput from '../src/number-input';

describe('Slider', () => {
  it('will render div wrapper contains an Slider without any props', () => {
    class Wrapper extends Component {
      state = {
        value: 0,
      };

      onChange = value => {
        this.setState({ value });
      };

      render() {
        const { value } = this.state;
        return <Slider value={value} onChange={this.onChange} />;
      }
    }
    const wrapper = renderIntoDocument(<Wrapper />);
    expect(
      scryRenderedDOMComponentsWithClass(wrapper, 'zent-slider').length
    ).toBe(1);
    expect(
      scryRenderedDOMComponentsWithClass(wrapper, 'zent-slider-main').length
    ).toBe(1);
    expect(
      scryRenderedDOMComponentsWithClass(wrapper, 'zent-slider-input').length
    ).toBe(1);
    wrapper.setState({ value: 10 });
    const input = findRenderedDOMComponentWithTag(wrapper, 'input');
    expect(input).toBeTruthy();
    expect(input.value).toBe('10');
    expect(
      findRenderedDOMComponentWithClass(wrapper, 'zent-slider-tooltip').style
        .left
    ).toBe('10%');

    const el = findRenderedDOMComponentWithClass(wrapper, 'zent-slider-main');
    el.getBoundingClientRect = () => ({
      left: 100,
    });
    Object.defineProperty(el, 'clientWidth', {
      value: 100,
    });
    Simulate.mouseDown(el, {
      clientX: 130,
    });
    expect(wrapper.state.value).toBe(30);
    window.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: 140,
      })
    );
    expect(wrapper.state.value).toBe(40);
    window.dispatchEvent(new MouseEvent('mouseup'));
  });

  it('can have custom wrapper classNames', () => {
    const wrapper = renderIntoDocument(
      <Slider value={0} className="test-slider-wrapper" />
    );
    expect(findDOMNode(wrapper).className.includes('test-slider-wrapper')).toBe(
      true
    );
  });

  it('can range props', () => {
    class Wrapper extends Component {
      state = {
        value: [20, 30],
      };

      onChange = value => {
        this.setState({ value });
      };

      render() {
        const { value } = this.state;
        return <Slider range value={value} onChange={this.onChange} />;
      }
    }
    const wrapper = renderIntoDocument(<Wrapper />);
    expect(
      scryRenderedDOMComponentsWithClass(wrapper, 'zent-slider-tooltip').length
    ).toBe(2);
    expect(scryRenderedComponentsWithType(wrapper, NumberInput).length).toBe(2);
    const tooltips = scryRenderedDOMComponentsWithClass(
      wrapper,
      'zent-slider-tooltip'
    );
    expect(tooltips.length).toBe(2);
    expect(tooltips[0].style.left).toBe('20%');
    expect(tooltips[1].style.left).toBe('30%');
    const inputs = scryRenderedDOMComponentsWithTag(wrapper, 'input');
    expect(inputs.length).toBe(2);
    expect(inputs[0].value).toBe('20');
    expect(inputs[1].value).toBe('30');
    const { style } = findRenderedDOMComponentWithClass(
      wrapper,
      'zent-slider-track'
    );
    expect(style.width).toBe('10%');
    expect(style.left).toBe('20%');

    const el = findRenderedDOMComponentWithClass(wrapper, 'zent-slider-main');
    Object.defineProperty(el, 'clientWidth', {
      value: 100,
    });
    el.getBoundingClientRect = () => ({
      left: 100,
    });
    Simulate.mouseDown(el, {
      clientX: 110,
    });
    expect(wrapper.state.value).toEqual([10, 30]);
    Simulate.mouseDown(el, {
      clientX: 150,
    });
    expect(wrapper.state.value).toEqual([10, 50]);
  });

  it('test invalid props', () => {
    expect(() =>
      renderIntoDocument(<Slider max={2} min={1} step={0.1} value={5} />)
    ).toThrow();
    expect(() => renderIntoDocument(<Slider range value={9} />)).toThrow();
    expect(() => renderIntoDocument(<Slider value={[1, 3]} />)).toThrow();
    expect(() => renderIntoDocument(<Slider range value={[3, 1]} />)).toThrow();
    expect(() => renderIntoDocument(<Slider range value={1000} />)).toThrow();
    expect(() =>
      renderIntoDocument(<Slider range value={[10, 20, 30]} />)
    ).toThrow();
    expect(() =>
      renderIntoDocument(<Slider range value={[500, 600]} />)
    ).toThrow();
    expect(() =>
      renderIntoDocument(<Slider range dots value={[50, 60]} />)
    ).toThrow();
    expect(() => renderIntoDocument(<Slider value={0} marks={{}} />)).toThrow();
    expect(() =>
      renderIntoDocument(<Slider range value={['1', '2']} />)
    ).toThrow();
  });

  it('normalize marks', () => {
    const marks = {
      0: '0°C',
      25: '25°C',
      50: '50°C',
      75: '75°C',
      100: '100°C',
    };
    expect(getPotentialValues(marks)).toEqual([0, 25, 50, 75, 100]);
  });

  it('can marks, dots props', () => {
    const marks = {
      0: '0%',
      20: '20%',
      50: '50%',
      100: '100%',
    };
    class Wrapper extends Component {
      state = {
        value: [0, 20],
      };

      onChange = value => {
        this.setState({ value });
      };

      render() {
        const { value } = this.state;
        return (
          <Slider
            range
            value={value}
            onChange={this.onChange}
            marks={marks}
            dots
          />
        );
      }
    }

    const wrapper = renderIntoDocument(<Wrapper />);

    expect(
      scryRenderedDOMComponentsWithClass(wrapper, 'zent-slider-mark').length
    ).toBe(4);
    expect(
      scryRenderedDOMComponentsWithClass(wrapper, 'zent-slider-dot').length
    ).toBe(4);
    expect(
      scryRenderedDOMComponentsWithClass(wrapper, 'zent-slider-dot-active')
        .length
    ).toBe(2);
  });

  it('disabled', () => {
    const marks = {
      0: '0%',
      20: '20%',
      50: '50%',
      100: '100%',
    };
    const slider = renderIntoDocument(
      <Slider range value={[0, 20]} dots marks={marks} disabled />
    );
    expect(
      scryRenderedDOMComponentsWithClass(slider, 'zent-slider-dot-active')
        .length
    ).toBe(0);
  });

  it('test binary search in normalizer', () => {
    expect(normalizeToPotentialValue([0, 2, 4, 6, 8, 10, 12, 14, 16], 9)).toBe(
      8
    );
    expect(
      normalizeToPotentialValue([0, 2, 4, 6, 8, 10, 12, 14, 16, 18], 9)
    ).toBe(8);
    expect(normalizeToPotentialValue([0, 2, 4, 6, 8, 10, 12, 14, 16], 0)).toBe(
      0
    );
    expect(normalizeToPotentialValue([0, 2, 4, 6, 8, 10, 12, 14, 16], 16)).toBe(
      16
    );
    expect(normalizeToPotentialValue([0, 2, 4, 6, 8, 10, 12, 14, 16], 8)).toBe(
      8
    );
    expect(normalizeToPotentialValue([0, 2, 4, 6, 8, 10, 12, 14, 16], 11)).toBe(
      10
    );
  });

  it('test step', () => {
    class Wrapper extends Component {
      state = {
        step: 1,
        marks: {
          0: '0',
          100: '100',
        },
        value: 0,
      };

      onChange = value => {
        this.setState({
          value,
        });
      };

      render() {
        return (
          <Slider
            value={this.state.value}
            marks={this.state.marks}
            step={this.state.step}
            onChange={this.onChange}
            dots
          />
        );
      }
    }
    const wrapper = renderIntoDocument(<Wrapper />);
    const slider = findRenderedComponentWithType(wrapper, Slider);
    expect(slider.state.decimal).toBe(0);
    expect(slider.state.potentialValues).toEqual([0, 100]);
    wrapper.setState({
      step: 0.01,
      marks: {
        0: '0%',
        20: '20%',
        50: '50%',
        100: '100%',
      },
    });
    expect(slider.state.decimal).toBe(2);
    expect(slider.state.potentialValues).toEqual([0, 20, 50, 100]);
    const el = findRenderedDOMComponentWithClass(wrapper, 'zent-slider-main');
    el.getBoundingClientRect = () => ({
      left: 100,
    });
    Object.defineProperty(el, 'clientWidth', {
      value: 100,
    });
    Simulate.mouseDown(el, {
      clientX: 130,
    });
    expect(wrapper.state.value).toBe(20);
    window.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: 140,
      })
    );
    expect(wrapper.state.value).toBe(50);
    window.dispatchEvent(new MouseEvent('mouseup'));
  });

  it('can input onchange props', () => {
    class Wrapper extends Component {
      state = {
        value: [20, 30],
      };

      onChange = value => {
        this.setState({ value });
      };

      render() {
        const { value } = this.state;
        return <Slider range value={value} onChange={this.onChange} />;
      }
    }
    const wrapper = renderIntoDocument(<Wrapper />);
    const inputs = scryRenderedDOMComponentsWithTag(wrapper, 'input');
    inputs[0].value = '25';
    Simulate.change(inputs[0]);
    Simulate.blur(inputs[0]);
    expect(wrapper.state.value[0]).toBe(25);
    inputs[1].value = '50';
    Simulate.change(inputs[1]);
    Simulate.blur(inputs[1]);
    expect(wrapper.state.value[1]).toBe(50);
    inputs[0].value = '75';
    Simulate.change(inputs[0]);
    Simulate.blur(inputs[0]);
    expect(wrapper.state.value).toEqual([50, 50]);
  });
});
