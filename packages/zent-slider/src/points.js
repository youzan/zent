import React, { Component } from 'react';
import ToolTips from './toolTips';
import { WindowEventHandler } from 'zent-utils/component';
import keys from 'zent-utils/lodash/keys';
import map from 'zent-utils/lodash/map';
import { getLeft, toFixed, checkValueInRange } from './common';

export default class Points extends Component {
  constructor(props) {
    super(props);
    const { range, value } = props;
    this.state = {
      visibility: false,
      conf: range ? { start: value[0], end: value[1] } : { simple: value }
    };
  }

  getLeft = point => {
    const { max, min } = this.props;
    return getLeft(point, max, min);
  }

  handleMouseDown = (type, evt) => {
    this.left = evt.clientX;
    this.setState({ type, visibility: true });
    let { value } = this.props;

    if (type === 'start') {
      value = value[0];
    } else if (type === 'end') {
      value = value[1];
    }
    this.value = value;
    return false;
  }

  getAbsMinInArray = (array, point) => {
    const abs = array.map(item => Math.abs(point - item));
    let lowest = 0;
    for (let i = 1; i < abs.length; i++) {
      if (abs[i] < abs[lowest]) {
        lowest = i;
      }
    }
    return array[lowest];
  }

  left = null

  handleMouseMove = (evt) => {
    evt.preventDefault();
    const left = this.left;
    if (left !== null) {
      const { type } = this.state;
      const { max, min, onChange, clientWidth, step, dots, marks, range } = this.props;
      let newValue = (evt.clientX - left) / clientWidth;
      newValue = (max - min) * newValue;
      newValue = Number(this.value) + Number(newValue);
      if (dots) {
        newValue = this.getAbsMinInArray(keys(marks), newValue);
      } else {
        newValue = Math.round(newValue / step) * step;
      }
      newValue = toFixed(newValue, step);
      newValue = checkValueInRange(newValue, max, min);
      let { conf } = this.state;
      conf[type] = newValue;
      this.setState({ conf });
      onChange && onChange(range ? [conf.start, conf.end] : newValue);
    }
  }

  handleMouseUp = () => {
    this.left = null;
    this.setState({ visibility: false });
  }

  componentWillReceiveProps(props) {
    const { range, value } = props;
    if (this.left === null) {
      this.setState({ conf: range ? { start: value[0], end: value[1] } : { simple: value } });
    }
  }

  render() {
    const { visibility, type, conf } = this.state;
    return (<div className="zent-slider-points">
      {map(conf, (value, index) => <ToolTips key={index} content={value} visibility={index === type && visibility} left={this.getLeft(value)}>
        <span
          onMouseDown={this.handleMouseDown.bind(this, index)}
          className="zent-slider-point"></span>
      </ToolTips>)}
      <WindowEventHandler eventName="mousemove" callback={this.handleMouseMove} />
      <WindowEventHandler eventName="mouseup" callback={this.handleMouseUp} />
    </div>);
  }
}
