import * as React from 'react';
import cx from 'classnames';

/* auto-generate: start */
export type IconType =
  | 'approval'
  | 'approval-o'
  | 'arrow-down'
  | 'arrow-up'
  | 'assess'
  | 'assess-o'
  | 'bell'
  | 'bell-o'
  | 'business'
  | 'business-o'
  | 'calendar'
  | 'calendar-o'
  | 'capital'
  | 'capital-o'
  | 'caret-down'
  | 'caret-up'
  | 'casher'
  | 'channel-o'
  | 'chart'
  | 'chart-o'
  | 'check'
  | 'check-circle'
  | 'check-circle-o'
  | 'checkin'
  | 'checkin-o'
  | 'clock'
  | 'clock-o'
  | 'close'
  | 'close-circle'
  | 'close-circle-o'
  | 'contract-o'
  | 'countdown'
  | 'customer'
  | 'customer-o'
  | 'customer-service'
  | 'download'
  | 'edit-o'
  | 'error-circle'
  | 'error-circle-o'
  | 'expand-customer'
  | 'expand-customer-o'
  | 'export'
  | 'feedback'
  | 'flow-o'
  | 'forbidden-circle'
  | 'gift'
  | 'goods'
  | 'goods-o'
  | 'hc-manage'
  | 'hc-manage-o'
  | 'help-circle'
  | 'help-circle-o'
  | 'hotline-o'
  | 'hr'
  | 'hr-o'
  | 'im-o'
  | 'info-circle'
  | 'info-circle-o'
  | 'knowledge-o'
  | 'lock'
  | 'marketing'
  | 'message'
  | 'message-o'
  | 'order'
  | 'order-o'
  | 'pending-circle'
  | 'plus'
  | 'plus-circle-o'
  | 'qa-o'
  | 'remove-o'
  | 'report'
  | 'report-o'
  | 'right'
  | 'right-circle'
  | 'rights-list-o'
  | 'search'
  | 'settings'
  | 'settings-o'
  | 'share'
  | 'shop'
  | 'shop-decorate'
  | 'shop-o'
  | 'shop-template'
  | 'star'
  | 'star-o'
  | 'strategy-o'
  | 'subtract-circle-o'
  | 'suggestions'
  | 'summary'
  | 'summary-o'
  | 'text-guide'
  | 'ticket'
  | 'ticket-o'
  | 'tools-o'
  | 'unlock'
  | 'upload'
  | 'video-guide'
  | 'visit-o'
  | 'warning'
  | 'warning-o'
  | 'youzan'
  | 'youzan-o';
/* auto-generate: end */

export interface IIconProps extends React.HTMLAttributes<HTMLElement> {
  type: IconType;
  className?: string;
  spin?: boolean;
}

const Icon = React.forwardRef<HTMLElement, IIconProps>(
  ({ className, spin, type, ...otherProps }, ref) => (
    <i
      ref={ref}
      className={cx('zenticon', `zenticon-${type}`, className, {
        'zenticon-spin': spin,
      })}
      {...otherProps}
    />
  )
);

Icon.displayName = 'ZentIcon';

export { Icon };

export default Icon;
