import React, { PureComponent, Component } from 'react';
import Icon from 'icon';
import Input from 'input';
import cx from 'classnames';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import getWidth from 'utils/getWidth';

export default class SearchInput extends (PureComponent || Component) {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    className: '',
    prefix: 'zent'
  };

  render() {
    const { prefix, className, width } = this.props;
    const inputProps = omit(this.props, 'className');

    return (
      <div
        style={getWidth(width)}
        className={cx(`${prefix}-search-input`, className)}
      >
        <Icon type="search" />
        <Input {...inputProps} showClear />
      </div>
    );
  }
}
