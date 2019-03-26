import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';

import { getLeft } from './common';

export default class Track extends PureComponent<any> {
  getLeft = () => {
    const { range, value, max, min } = this.props;
    return range ? getLeft(value[0], max, min) : 0;
  };

  getWidth = () => {
    const { max, min, range, value } = this.props;
    return range
      ? ((value[1] - value[0]) * 100) / (max - min)
      : getLeft(value, max, min);
  };

  render() {
    const { disabled, prefix } = this.props;
    return (
      <div
        style={{ width: `${this.getWidth()}%`, left: `${this.getLeft()}%` }}
        className={cx(
          { [`${prefix}-slider-track-disabled`]: disabled },
          `${prefix}-slider-track`
        )}
      />
    );
  }
}
