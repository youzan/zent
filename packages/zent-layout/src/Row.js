import React, { Component } from 'react';
import cx from 'zent-utils/classnames';

export default class Row extends Component {

  static propTypes = {
    className: React.PropTypes.string,
    prefix: React.PropTypes.string
  }

  static defaultProps = {
    prefix: 'zent'
  }

  render() {
    const { className, prefix, ...others } = this.props;

    const classes = cx({
      [`${prefix}-row`]: true,
      [className]: className
    });

    return <div {...others} className={classes}>{this.props.children}</div>;
  }
}
