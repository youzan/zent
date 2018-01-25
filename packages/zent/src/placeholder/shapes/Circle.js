import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Base from './Base';

export default class Circle extends (PureComponent || Component) {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    diameter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    animate: PropTypes.bool,
    prefix: PropTypes.string
  };

  static defaultProps = {
    style: {},
    prefix: 'zent',
    animate: true,
    diameter: 80
  };

  render() {
    const { className, prefix, diameter, style, ...passThrough } = this.props;
    const classes = cx(`${prefix}-placeholder-circle`, className);
    const mergedStyle = {
      height: diameter,
      minWidth: diameter,
      ...style
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
