import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Point from './points';
import Dots from './dots';
import Marks from './marks';
import InputField from './input';
import Contain from './contain';

export default class Slider extends Component {
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    withInput: true,
    range: false,
    value: 0,
    defaultValue: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.range ? props.value.sort((a, b) => a - b) : props.value
    };
  }

  onChange = (value) => {
    const { range, onChange } = this.props;
    this.setState({ value });
    onChange && onChange(range ? value.sort((a, b) => a - b) : value);
  }

  componentDidMount = () => {
    const $root = ReactDOM.findDOMNode(this);
    this.setState({ clientWidth: $root.clientWidth });
  }

  render() {
    const { withInput, dots, marks, ...restProps } = this.props;
    const { value, clientWidth } = this.state;
    return (<div className="zent-slider">
      <div id="zent-slider-contain" className="zent-slider-main">
        {dots && <Dots marks={marks} {...restProps} />}
        <Point clientWidth={clientWidth} onChange={this.onChange} {...restProps} value={value} />
        <Contain ref="con" clientWidth={clientWidth} dots={dots} {...restProps} onChange={this.onChange} value={value} />
        {marks && <Marks marks={marks} {...restProps} />}
      </div>
      {withInput && <InputField onChange={this.onChange} {...restProps} value={value} />}
    </div>);
  }
}
