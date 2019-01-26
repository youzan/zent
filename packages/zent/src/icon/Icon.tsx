import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { Omit } from 'utility-types';

export type EIconType =
  | 'summary-o'
  | 'summary'
  | 'shop-o'
  | 'shop'
  | 'goods-o'
  | 'goods'
  | 'order-o'
  | 'order'
  | 'customer-o'
  | 'customer'
  | 'chart-o'
  | 'chart'
  | 'capital-o'
  | 'capital'
  | 'casher'
  | 'marketing'
  | 'settings-o'
  | 'settings'
  | 'youzan-o'
  | 'youzan'
  | 'close'
  | 'close-circle-o'
  | 'close-circle'
  | 'message'
  | 'message-o'
  | 'bell'
  | 'bell-o'
  | 'calendar'
  | 'calendar-o'
  | 'search'
  | 'customer-service'
  | 'feedback'
  | 'error-circle-o'
  | 'error-circle'
  | 'check-circle-o'
  | 'check-circle'
  | 'help-circle-o'
  | 'help-circle'
  | 'clock-o'
  | 'clock'
  | 'countdown'
  | 'download'
  | 'share'
  | 'shop-decorate'
  | 'shop-template'
  | 'gift'
  | 'caret-up'
  | 'caret-down'
  | 'arrow-up'
  | 'arrow-down'
  | 'right'
  | 'right-circle'
  | 'plus'
  | 'star-o'
  | 'star'
  | 'check'
  | 'info-circle-o'
  | 'info-circle'
  | 'warning-o'
  | 'warning'
  | 'lock'
  | 'unlock'
  | 'pending-circle'
  | 'pending-circle';

export interface IIconProps extends React.HTMLAttributes<HTMLElement> {
  type: EIconType;
  className?: string;
  spin?: boolean;
}

export class Icon extends Component<IIconProps> {
  static propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    spin: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    spin: false,
  };

  render() {
    const { type, className, spin, ...otherProps } = this.props;
    const cls = cx('zenticon', `zenticon-${type}`, className, {
      'zenticon-spin': spin,
    });

    return <i className={cls} {...otherProps} />;
  }
}

export default Icon;
