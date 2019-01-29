import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

import Base, { IPlaceholderBaseShapeProps } from './Base';

export interface IPlaceholderCicleProps extends IPlaceholderBaseShapeProps {
  diameter?: number;
}

export default class Circle extends PureComponent<IPlaceholderCicleProps> {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    diameter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    animate: PropTypes.bool,
    prefix: PropTypes.string,
  };

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
