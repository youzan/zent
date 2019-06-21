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
    this.state = {
      visibility: false,
    };
  }

  value: SliderValueType;

  getLeft = point => {
    const { max, min } = this.props;
    return getLeft(point, max, min);
  };

  isLeftButton = (e: React.MouseEvent<HTMLSpanElement>): boolean => {
    const btnCode = e.button;
    return btnCode === 0;
  };

  handleMouseDown = (
    type: 'start' | 'end',
    evt: React.MouseEvent<HTMLSpanElement>
  ) => {
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
      const conf = this.getConfig();
      conf[type] = newValue;
      onChange && onChange(range ? [conf.start, conf.end] : newValue);
    }
  };

  handleMouseUp = () => {
    this.left = null;
    this.setState({ visibility: false });
  };

  getConfig() {
    const { range, value } = this.props;
    return range ? { start: value[0], end: value[1] } : { simple: value };
  }

  getPoint(value, index) {
    const { visibility, type } = this.state;
    const { disabled, prefix } = this.props;

    return (
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
    );
  }

  render() {
    const { disabled, prefix } = this.props;
    const conf = this.getConfig();

    return (
      <div className={`${prefix}-slider-points`}>
        {map(conf, (value, index) => this.getPoint(value, index))}
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
