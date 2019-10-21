import * as React from 'react';
import cx from 'classnames';
import isNil from 'lodash-es/isNil';
import omit from 'lodash-es/omit';
import { AlertTypes } from './types';
import Icon, { IconType } from '../icon';
import InlineLoading from '../loading/InlineLoading';
import { Omit } from 'utility-types';
import { ParticalRequired } from '../utils/types';

export interface IAlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: AlertTypes;
  loading?: boolean;
  outline?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  extraContent?: React.ReactNode;
  closable?: boolean;
  closed?: boolean;
  onClose?: () => void;
  closeContent?: React.ReactNode;
}

interface IAlertState {
  closed: boolean;
}

const iconTypeMap: {
  [key in AlertTypes]: IconType;
} = {
  info: 'info-circle',
  warning: 'warning',
  success: 'check-circle',
  error: 'error-circle',
};

type IAlertInnerProps = ParticalRequired<
  IAlertProps,
  'type' | 'loading' | 'outline' | 'closable'
>;

const renderOmitProps = [
  'title',
  'description',
  'loading',
  'closable',
  'closed',
  'onClose',
  'closeContent',
] as const;

export class Alert extends React.PureComponent<IAlertProps, IAlertState> {
  static highlightClassName = 'zent-alert-content__highlight';

  static defaultProps = {
    type: 'info',
    loading: false,
    outline: false,
    closable: false,
  };

  state: IAlertState = {
    closed: false,
  };

  /**
   * 判断组件是否受控
   */
  private get isControlled() {
    const { closed } = this.props;
    const hasClosed = !isNil(closed);
    return hasClosed;
  }

  /**
   * 关闭状态
   */
  private get closed() {
    return this.isControlled ? this.props.closed : this.state.closed;
  }

  /**
   * 关闭回调函数
   */
  private onCloseHandler = () => {
    if (!this.isControlled) {
      this.setState({
        closed: true,
      });
    }
    this.props.onClose && this.props.onClose();
  };

  /**
   * 显示内容
   */
  private renderContent() {
    const { title, description, children } = this.props;
    return children ? (
      children
    ) : (
      <>
        {title && <h3 className="zent-alert-content__title">{title}</h3>}
        {description && (
          <p className="zent-alert-content__description">{description}</p>
        )}
      </>
    );
  }

  /**
   * 关闭触发器节点
   */
  private renderCloseNode() {
    const { closable, closeContent } = this.props as IAlertInnerProps;
    return closable ? (
      <div className="zent-alert-close-wrapper" onClick={this.onCloseHandler}>
        {closeContent ? (
          closeContent
        ) : (
          <Icon type="close" className="zent-alert-close-btn" />
        )}
      </div>
    ) : null;
  }

  /**
   * 关闭触发器节点
   */
  private renderIcon() {
    const { loading, type } = this.props as IAlertInnerProps;
    return loading ? (
      <InlineLoading
        className="zent-alert-icon"
        loading
        icon="circle"
        iconSize={16}
      />
    ) : (
      <Icon className="zent-alert-icon" type={iconTypeMap[type]} />
    );
  }

  render() {
    if (this.closed) {
      return null;
    }

    const {
      className,
      type = 'info',
      outline,
      extraContent,
      ...restDivAttrs
    } = omit(this.props as IAlertInnerProps, renderOmitProps);

    const alertIcon = this.renderIcon();
    const content = this.renderContent();
    const closeNode = this.renderCloseNode();

    const containerCls = cx(
      'zent-alert',
      `zent-alert-style-${type}`,
      className,
      {
        ['zent-alert-outline']: outline,
      }
    );

    return (
      <div className={containerCls} {...restDivAttrs}>
        {alertIcon}
        <div className="zent-alert-content">{content}</div>
        {extraContent && (
          <div className="zent-alert-extra-content">{extraContent}</div>
        )}
        {closeNode}
      </div>
    );
  }
}

export default Alert;
