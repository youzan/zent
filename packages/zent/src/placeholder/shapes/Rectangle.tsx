import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

import Base, { IPlaceholderBaseShapeProps } from './Base';

export interface IPlaceholderRectangleProps extends IPlaceholderBaseShapeProps {
  width?: number;
  height?: number;
}

export default class Rectangle extends PureComponent<
  IPlaceholderRectangleProps
> {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    animate: PropTypes.bool,
    prefix: PropTypes.string,
  };

  static defaultProps = {
    style: {},
    prefix: 'zent',
    animate: true,
    width: 80,
    height: 80,
  };

  render() {
    const {
      className,
      prefix,
      width,
      height,
      style,
      ...passThrough
    } = this.props;
    const classes = cx(`${prefix}-placeholder-rectangle`, className);
    const mergedStyle = {
      minWidth: width,
      height,
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
