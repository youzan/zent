import React, { Component } from 'react';
import ToolTips from './toolTips';
import { WindowEventHandler } from 'zent-utils/component';

export default class Points extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
  }

  getLeft = point => {
    const { max, min } = this.props;
    return (point - min) * 100 / (max - min);
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

  left = null

  handleMouseMove = (evt) => {
    evt.preventDefault();
    const left = this.left;
    if (left !== null) {
      const { type } = this.state;
      const { max, min, onChange, clientWidth, step, value } = this.props;
      let newValue = (evt.clientX - left) * 100 / clientWidth;
      newValue = Math.ceil(newValue);
      if ((newValue % step) > step / 2) {
        newValue += step;
      }
      newValue = newValue - newValue % step + this.value;
      if (newValue > max) {
        newValue = max;
      } else if (newValue < min) {
        newValue = min;
      }
      if (type === 'start') {
        newValue = [newValue, value[1]];
      } else if (type === 'end') {
        newValue = [value[0], newValue];
      }
      onChange && onChange(newValue);
    }
  }

  handleMouseUp = () => {
    this.left = null;
    this.setState({ visibility: false });
  }

  render() {
    const { value, range } = this.props;
    let points = [];
    range ? points = [{ value: value[0], type: 'start' }, { value: value[1], type: 'end' }] : points.push({ value, type: 'single' });
    const { visibility, type } = this.state;
    return (<div className="zent-slider-points">
      {points.map((point, index) => <ToolTips key={index} content={point.value} visibility={type === point.type && visibility} left={this.getLeft(point.value)}>
        <span
          onMouseDown={this.handleMouseDown.bind(this, point.type)}
          className="zent-slider-point"></span>
      </ToolTips>)}
      <WindowEventHandler eventName="mousemove" callback={this.handleMouseMove} />
      <WindowEventHandler eventName="mouseup" callback={this.handleMouseUp} />
    </div>);
  }
}
