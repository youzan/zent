import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

import Button from '../../../button';

export default class PageNumberButton extends Component<any, any> {
  static propTypes = {
    selected: PropTypes.bool,
    bordered: PropTypes.bool,
  };

  static defaultProps = {
    selected: false,
    bordered: true,
  };

  render() {
    const { selected, bordered, ...rest } = this.props;

    let buttonType;
    if (selected) {
      buttonType = 'primary';
    } else {
      buttonType = 'default';
    }

    return (
      <Button
        {...rest}
        type={buttonType}
        className={cx('zent-pagination-page-number-button', {
          'zent-pagination-page-button--no-border': !bordered,
        })}
      />
    );
  }
}
