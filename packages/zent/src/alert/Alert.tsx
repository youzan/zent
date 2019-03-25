import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import isFunction from 'lodash-es/isFunction';

export interface IAlertProps {
  type: 'info' | 'warning' | 'danger' | 'error';
  size: 'normal' | 'large';
  rounded: boolean;
  closable: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  prefix: string;
}

// 忽略不支持的style
const styleClassMap = {
  info: 'alert-style-info',
  warning: 'alert-style-warning',

  // error as an alias to danger
  error: 'alert-style-danger',
  danger: 'alert-style-danger',
};

// 忽略不支持的size
const sizeClassMap = {
  normal: 'alert-size-normal',
  large: 'alert-size-large',
};

export class Alert extends Component<IAlertProps> {
  static defaultProps = {
    type: 'info',
    size: 'normal',
    closable: false,
    rounded: false,
    className: '',
    prefix: 'zent',
  };

  state = {
    closed: false,
  };

  onClose = () => {
    this.setState(
      {
        closed: true,
      },
      () => {
        // onClose是在*关闭以后*被调用的
        const { onClose } = this.props;
        if (isFunction(onClose)) {
          onClose();
        }
      }
    );
  };

  render() {
    const { closed } = this.state;
    if (closed) {
      return null;
    }

    const {
      type,
      prefix,
      rounded,
      className,
      closable,
      size,
      children,
    } = this.props;
    const containerCls = cx(
      `${prefix}-alert`,
      `${prefix}-${styleClassMap[type]}`,
      `${prefix}-${sizeClassMap[size]}`,
      className,
      {
        [`${prefix}-alert-border-rounded`]: rounded,
        [`${prefix}-alert-closable`]: closable,
      }
    );

    return (
      <div className={containerCls}>
        {closable && (
          <div className={`${prefix}-alert-close-wrapper`}>
            <span
              className={`${prefix}-alert-close-btn`}
              onClick={this.onClose}
            >
              ×
            </span>
          </div>
        )}
        <div className={`${prefix}-alert-content-wrapper`}>
          <div className={`${prefix}-alert-content`}>{children}</div>
        </div>
      </div>
    );
  }
}

export default Alert;
