import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Base extends (PureComponent || Component) {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    animate: PropTypes.bool,
    prefix: PropTypes.string
  };

  static defaultProps = {
    style: {},
    prefix: 'zent',
    animate: true
  };

  render() {
    const { className, style, prefix, animate } = this.props;

    const classes = cx(
      `${prefix}-placeholder-shape`,
      {
        [`${prefix}-placeholder-shape--animate`]: animate
      },
      className
    );

    return <div className={classes} style={style} />;
  }
}
