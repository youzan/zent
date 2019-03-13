import React, { Component } from 'react';
import Button from 'button';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class PageNumberButton extends Component {
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
