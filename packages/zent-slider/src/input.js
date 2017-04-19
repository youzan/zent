import React, { Component } from 'react';
import Input from 'zent-input';

export default class InputField extends Component {
  onchange = (type, e) => {
    const { onChange, value } = this.props;
    let newValue = +e.target.value;
    if (type === 'start') {
      newValue = [newValue, value[1]];
    } else if (type === 'end') {
      newValue = [value[0], newValue];
    }
    onChange && onChange(newValue);
  }

  render() {
    const { range, value } = this.props;
    return (<div className="zent-slider-input">
      {range ? (<div className="zent-slider-input">
        <Input onChange={this.onchange.bind(null, 'start')} value={value[0]} />
        <span className="slider-input-line">-</span>
        <Input onChange={this.onchange.bind(null, 'end')} value={value[1]} /></div>) : <Input onChange={this.onchange.bind(null, 'single')} value={value} />}
    </div>);
  }
}
