import * as React from 'react';
import cx from 'classnames';
import { AlertTypes } from './types';
import Icon, { IconType } from '../icon';
import InlineLoading from '../loading/InlineLoading';
import { IAlertProps } from './types';

const iconTypeMap: {
  [key in AlertTypes]: IconType;
} = {
  info: 'info-circle',
  warning: 'warning',
  success: 'check-circle',
  error: 'error-circle',
};

type IAlertItemProps = Omit<IAlertProps, 'outline' | 'closed'> & {
  scrollRef?: React.Ref<HTMLDivElement>;
};

export class AlertItem extends React.PureComponent<IAlertItemProps> {
  static highlightClassName = 'alert-item-content__highlight';

  /**
   * 显示内容
   */
  private renderContent() {
    const { title, description, children } = this.props;
    return children ? (
      children
    ) : (
      <>
        {title && <h3 className="alert-item-content__title">{title}</h3>}
        {description && (
          <p className="alert-item-content__description">{description}</p>
        )}
      </>
    );
  }

  /**
   * 关闭触发器节点
   */
  private renderCloseNode() {
    const { closable, closeContent, onClose } = this.props as IAlertItemProps;
    return closable ? (
      <div className="alert-item-close-wrapper" onClick={onClose}>
        {closeContent ? (
          closeContent
        ) : (
          <Icon type="close" className="alert-item-close-btn" />
        )}
      </div>
    ) : null;
  }

  /**
   * 显示icon
   */
  private renderIcon() {
    const { loading, type } = this.props as IAlertItemProps;
    return loading ? (
      <InlineLoading
        className="alert-item-icon"
        loading
        icon="circle"
        iconSize={16}
      />
    ) : type in iconTypeMap ? (
      <Icon className="alert-item-icon" type={iconTypeMap[type]} />
    ) : null;
  }

  render() {
    const { extraContent, scrollRef = null, className } = this.props;

    const alertIcon = this.renderIcon();
    const content = this.renderContent();
    const closeNode = this.renderCloseNode();

    return (
      <div className={cx('alert-item', className)} ref={scrollRef}>
        {alertIcon}
        <div className="alert-item-content">{content}</div>
        {extraContent && (
          <div className="alert-item-extra-content">{extraContent}</div>
        )}
        {closeNode}
      </div>
    );
  }
}

export default AlertItem;
