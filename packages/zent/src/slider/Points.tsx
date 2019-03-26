import * as React from 'react';
import { PureComponent } from 'react';
import keys from 'lodash-es/keys';
import map from 'lodash-es/map';
import noop from 'lodash-es/noop';
import classNames from 'classnames';

import WindowEventHandler from '../utils/component/WindowEventHandler';
import { getLeft, toFixed, checkValueInRange } from './common';
import ToolTips from './ToolTips';
import { SliderValueType } from './Slider';

export default class Points extends PureComponent<any, any> {
  constructor(props) {
    super(props);
    const { range, value } = props;
    this.state = {
      visibility: false,
      conf: range ? { start: value[0], end: value[1] } : { simple: value },
    };
  }

  value: SliderValueType;

  getLeft = point => {
    const { max, min } = this.props;
    return getLeft(point, max, min);
  };

  isLeftButton = e => {
    e = e || window.event;
    const btnCode = e.button;
    return btnCode === 0;
  };

  handleMouseDown = (type, evt) => {
    evt.preventDefault();

    if (this.isLeftButton(evt)) {
      this.left = evt.clientX;
      this.setState({ type, visibility: true });
      let { value } = this.props;

      if (type === 'start') {
        value = value[0];
      } else if (type === 'end') {
        value = value[1];
      }
      this.value = value;
    }
  };

  getAbsMinInArray = (array, point) => {
    const abs = array.map(item => Math.abs(point - item));
    let lowest = 0;
    for (let i = 1; i < abs.length; i++) {
      if (abs[i] < abs[lowest]) {
        lowest = i;
      }
    }
    return array[lowest];
  };

  left = null;

  handleMouseMove = evt => {
    const left = this.left;
    if (left !== null) {
      evt.preventDefault();
      const { type } = this.state;
      const {
        max,
        min,
        onChange,
        getClientWidth,
        step,
        dots,
        marks,
        range,
      } = this.props;
      let newValue = (evt.clientX - left) / getClientWidth();
      newValue = (max - min) * newValue;
      newValue = Number(this.value) + Number(newValue);
      if (dots) {
        newValue = this.getAbsMinInArray(keys(marks), newValue);
      } else {
        newValue = Math.round(newValue / step) * step;
      }
      newValue = toFixed(newValue, step);
      newValue = checkValueInRange(newValue, max, min);
      const { conf } = this.state;
      conf[type] = newValue;
      this.setState({ conf });
      onChange && onChange(range ? [conf.start, conf.end] : newValue);
    }
  };

  handleMouseUp = () => {
    this.left = null;
    this.setState({ visibility: false });
  };

  componentWillReceiveProps(props) {
    const { range, value } = props;
    if (this.left === null) {
      this.setState({
        conf: range ? { start: value[0], end: value[1] } : { simple: value },
      });
    }
  }

  render() {
    const { visibility, type, conf } = this.state;
    const { disabled, prefix } = this.props;
    return (
      <div className={`${prefix}-slider-points`}>
        {map(conf, (value, index) => (
          <ToolTips
            prefix={prefix}
            key={index}
            content={value}
            visibility={index === type && visibility}
            left={this.getLeft(value)}
          >
            <span
              onMouseDown={
                !disabled ? this.handleMouseDown.bind(this, index) : noop
              }
              className={classNames(
                { [`${prefix}-slider-point-disabled`]: disabled },
                `${prefix}-slider-point`
              )}
            />
          </ToolTips>
        ))}
        {!disabled && (
          <WindowEventHandler
            eventName="mousemove"
            callback={this.handleMouseMove}
          />
        )}
        {!disabled && (
          <WindowEventHandler
            eventName="mouseup"
            callback={this.handleMouseUp}
          />
        )}
      </div>
    );
  }
}
