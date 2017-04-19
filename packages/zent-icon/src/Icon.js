import React, { Component } from 'react';
import PropTypes from 'zent-utils/prop-types';
import cx from 'zent-utils/classnames';

export default class Icon extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    spin: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    spin: false
  };

  render() {
    const { type, className, spin, ...otherProps } = this.props;
    const cls = cx('zenticon', `zenticon-${type}`, className, {
      'zenticon-spin': spin
    });

    return <i className={cls} {...otherProps}></i>;
  }
}
