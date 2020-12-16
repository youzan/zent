import cx from 'classnames';
import { forwardRef } from 'react';

/* auto-generate: start */
export type IconType =
  | 'add-page'
  | 'approval'
  | 'approval-o'
  | 'arrow-down'
  | 'arrow-up'
  | 'assess'
  | 'assess-o'
  | 'back'
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
  | 'cashier'
  | 'cashier-desk-o'
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
  | 'closed-eye'
  | 'contract-o'
  | 'countdown'
  | 'coupon'
  | 'coupon-o'
  | 'customer'
  | 'customer-o'
  | 'customer-service'
  | 'development-doc'
  | 'distribution-o'
  | 'doc'
  | 'down'
  | 'down-circle'
  | 'down-circle-o'
  | 'download'
  | 'drag'
  | 'edit-o'
  | 'error-circle'
  | 'error-circle-o'
  | 'expand-customer'
  | 'expand-customer-o'
  | 'export'
  | 'eye'
  | 'feedback'
  | 'filter-o'
  | 'flow-o'
  | 'folder-o'
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
  | 'inventory'
  | 'inventory-o'
  | 'knowledge-o'
  | 'left'
  | 'left-circle'
  | 'left-circle-o'
  | 'link'
  | 'lock'
  | 'marketing'
  | 'member-o'
  | 'message'
  | 'message-o'
  | 'mini-apps'
  | 'mini-apps-o'
  | 'more'
  | 'nav-grid'
  | 'nav-line'
  | 'open-folder-o'
  | 'order'
  | 'order-o'
  | 'pending-circle'
  | 'pending-payment-o'
  | 'photo'
  | 'plus'
  | 'plus-circle'
  | 'plus-circle-o'
  | 'procurement'
  | 'procurement-o'
  | 'qa-o'
  | 'qrcode'
  | 'refresh'
  | 'remove-o'
  | 'report'
  | 'report-forms'
  | 'report-forms-o'
  | 'report-o'
  | 'right'
  | 'right-circle'
  | 'right-circle-o'
  | 'rights-list-o'
  | 'salesman-o'
  | 'save-o'
  | 'scan-code-o'
  | 'search'
  | 'settings'
  | 'settings-o'
  | 'share'
  | 'shop'
  | 'shop-analyze-o'
  | 'shop-decorate'
  | 'shop-o'
  | 'shop-template'
  | 'smile'
  | 'star'
  | 'star-o'
  | 'strategy-o'
  | 'subtract-circle'
  | 'subtract-circle-o'
  | 'suggestions'
  | 'summary'
  | 'summary-o'
  | 'tendency-o'
  | 'text-guide-o'
  | 'thumbnail'
  | 'ticket'
  | 'ticket-o'
  | 'tools-o'
  | 'unlock'
  | 'up'
  | 'up-circle'
  | 'up-circle-o'
  | 'upload'
  | 'video'
  | 'video-guide-o'
  | 'visit-o'
  | 'voice'
  | 'warning'
  | 'warning-o'
  | 'wechat'
  | 'withdraw-cash-o'
  | 'youzan'
  | 'youzan-o';
/* auto-generate: end */

export interface IIconProps extends React.HTMLAttributes<HTMLElement> {
  type: IconType;
  spin?: boolean;
}

const Icon = forwardRef<HTMLElement, IIconProps>(
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
