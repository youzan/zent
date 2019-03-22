import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';

import Base, { IPlaceholderBaseShapeProps } from './Base';

export interface IPlaceholderCicleProps extends IPlaceholderBaseShapeProps {
  diameter?: number;
}

export default class Circle extends PureComponent<IPlaceholderCicleProps> {
  static defaultProps = {
    style: {},
    prefix: 'zent',
    animate: true,
    diameter: 80,
  };

  render() {
    const { className, prefix, diameter, style, ...passThrough } = this.props;
    const classes = cx(`${prefix}-placeholder-circle`, className);
    const mergedStyle = {
      height: diameter,
      minWidth: diameter,
      ...style,
    };

    return (
      <Base
        className={classes}
        prefix={prefix}
        style={mergedStyle}
        {...passThrough}
      />
    );
  }
}
