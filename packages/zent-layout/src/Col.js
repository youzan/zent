import React, { Component } from 'react';
import cx from 'zent-utils/classnames';

export default class Col extends Component {

  static propTypes = {
    span: React.PropTypes.number,
    offset: React.PropTypes.number,
    className: React.PropTypes.string,
    prefix: React.PropTypes.string
  }

  static defaultProps = {
    prefix: 'zent'
  }

  render() {
    const { span, offset, className, prefix, ...others } = this.props;

    const classes = cx({
      [`${prefix}-col`]: true,
      [`${prefix}-col-${span}`]: span,
      [`${prefix}-col-offset-${offset}`]: offset,
      [className]: className
    });

    return <div {...others} className={classes}>{this.props.children}</div>;
  }
}
