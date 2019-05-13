import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';

import Icon from '../icon';
import Input, { IInputCoreProps } from '../input';
import getWidth from '../utils/getWidth';

export interface ISearchInputProps extends IInputCoreProps {}

export class SearchInput extends Component<ISearchInputProps> {
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

export default SearchInput;
