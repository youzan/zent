/// <reference types="react" />

declare module 'zent/lib/icon' {
  type TIconType = 'summary-o' | 'summary' | 'shop-o' | 'shop' | 'goods-o' | 'goods' | 'order-o' | 'order' | 'customer-o' | 'customer' | 'chart-o' | 'chart' | 'capital-o' | 'capital' | 'casher' | 'marketing' | 'settings-o' | 'settings' | 'youzan-o' | 'youzan' | 'close' | 'close-circle-o' | 'close-circle' | 'message' | 'message-o' | 'bell' | 'bell-o' | 'calendar' | 'calendar-o' | 'search' | 'customer-service' | 'feedback' | 'error-circle-o' | 'error-circle' | 'check-circle-o' | 'check-circle' | 'help-circle-o' | 'help-circle' | 'clock-o' | 'clock' | 'countdown' | 'download' | 'share' | 'shop-decorate' | 'shop-template' | 'gift' | 'caret-up' | 'caret-down' | 'arrow-up' | 'arrow-down' | 'right' | 'plus' | 'star-o' | 'star' | 'check' | 'info-circle-o' | 'info-circle' | 'warning-o' | 'warning' | 'lock' | 'unlock'

  interface IIconProps {
    type: TIconType
    className?: string
  }

  export default class Icon extends React.Component<IIconProps, any> { }
}
