import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';

export default class Panel extends (PureComponent || Component) {
  static propTypes = {
    key: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    showArrow: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    prefix: PropTypes.string,
    children: PropTypes.node,

    // Internal props
    active: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    disabled: false,
    showArrow: true,
    prefix: 'zent'
  };

  render() {
    const { children, title } = this.props;

    return (
      <div>
        <div>{title}</div>
        <div>{children}</div>
      </div>
    );
  }
}
