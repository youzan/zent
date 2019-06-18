import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';

import Button from '../../../button';

export interface IPaginationPageNumberButtonProps {
  selected?: boolean;
  bordered?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export class PageNumberButton extends Component<
  IPaginationPageNumberButtonProps,
  any
> {
  static defaultProps = {
    selected: false,
    bordered: true,
  };

  render() {
    const { selected, bordered, ...rest } = this.props;

    let buttonType: 'primary' | 'default';
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

export default PageNumberButton;
