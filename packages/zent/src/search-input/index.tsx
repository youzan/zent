import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from '../icon';
import Input, { IInputProps } from '../input';
import getWidth from '../utils/getWidth';

interface ISearchInputProps extends IInputProps {}

export default class SearchInput extends Component<ISearchInputProps> {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    className: '',
    prefix: 'zent',
  };

  render() {
    const { prefix, className, width, ...inputProps } = this.props;

    return (
      <div
        style={getWidth(width)}
        className={cx(`${prefix}-search-input`, className)}
      >
        <Icon type="search" />
        <Input {...inputProps} prefix={prefix} width={width} showClear />
      </div>
    );
  }
}
