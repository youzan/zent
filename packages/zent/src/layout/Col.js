import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Col extends (PureComponent || Component) {
  static propTypes = {
    span: PropTypes.number,
    offset: PropTypes.number,
    className: PropTypes.string,
    prefix: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent'
  };

  render() {
    const { span, offset, className, prefix, ...others } = this.props;

    const classes = cx({
      [`${prefix}-col`]: true,
      [`${prefix}-col-${span}`]: span,
      [`${prefix}-col-offset-${offset}`]: offset,
      [className]: className
    });

    return (
      <div {...others} className={classes}>
        {this.props.children}
      </div>
    );
  }
}
