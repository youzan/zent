import * as React from 'react';
import { PureComponent } from 'react';
import map from 'lodash-es/map';
import classNames from 'classnames';
import noop from 'lodash-es/noop';

import { getLeft, getClosest } from './common';

export default class Dots extends PureComponent<any> {
  isInTrack = point => {
    const { range, value, disabled } = this.props;
    if (disabled) {
      return false;
    }
    point = Number(point);
    return range ? point <= value[1] && point >= value[0] : point <= value;
  };

  handleClick = pointValue => {
    const { range, value, onChange } = this.props;
    let newValue = Number(pointValue);
    if (range) {
      newValue = getClosest(value, newValue);
    }
    onChange && onChange(newValue);
  };

  render() {
    const { marks, max, min, disabled, prefix } = this.props;
    return (
      <div className={`${prefix}-slider-dots`}>
        {map(marks, (value, index) => {
          return (
            <span
              onClick={!disabled ? this.handleClick.bind(null, index) : noop}
              style={{ left: `${getLeft(index, max, min)}%` }}
              key={value}
              className={classNames({
                'zent-slider-dot': true,
                'zent-slider-dot-active': this.isInTrack(index),
              })}
            />
          );
        })}
      </div>
    );
  }
}
