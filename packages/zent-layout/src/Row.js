import React, { Component } from 'react';
import classnames from 'classnames';

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

    const classes = classnames({
      [`${prefix}-row`]: true,
      [className]: className
    });

    return <div {...others} className={classes}>{this.props.children}</div>;
  }
}
