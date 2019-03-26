import * as React from 'react';
import { PureComponent } from 'react';
import map from 'lodash-es/map';
import { getLeft } from './common';

export default class Marks extends PureComponent<any> {
  render() {
    const { marks, max, min, prefix } = this.props;
    return (
      <div className={`${prefix}-slider-marks`}>
        {map(marks, (value, index) => {
          return (
            <span
              style={{ left: `${getLeft(index, max, min)}%` }}
              key={index}
              className={`${prefix}-slider-mark`}
            >
              {value}
            </span>
          );
        })}
      </div>
    );
  }
}
