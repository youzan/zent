import React, { Component } from 'react';
import Input from 'zent-input';

export default class NumberInput extends Component {
  onchange = (e) => {
    const { onChange } = this.props;
    let newValue = +e.target.value;
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
