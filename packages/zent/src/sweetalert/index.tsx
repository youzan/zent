import * as React from 'react';
import cx from 'classnames';

import { I18nReceiver as Receiver } from '../i18n';
import Dialog from '../dialog';
import Icon from '../icon';

import ActionButton, { ActionButtonClickHandler } from './ActionButton';
import { TitleIconMap } from './constants';

export namespace Sweetalert {
  export interface IAlertOption {
    content?: React.ReactNode;
    type?: 'info' | 'success' | 'error' | 'warning';
    title?: React.ReactNode;
    onConfirm?: ActionButtonClickHandler;
    confirmText?: string;
    confirmType?: 'default' | 'primary' | 'danger' | 'success';
    closeBtn?: boolean;
    maskClosable?: boolean;
    parentComponent?: any;
    className?: string;
    prefix?: string;
    onCancel?: ActionButtonClickHandler;
    onClose?: () => void;
  }

  export interface IConfirmOption extends IAlertOption {
    cancelText?: React.ReactNode;
  }
}

/**
 * 17.12.13 从相似的 alert 与 confirm 函数中提取公共逻辑，方便 i18n 注入
 *
 * 另调整组件的文件组织结构方便维护
 */

const { openDialog } = Dialog;

/**
 * sweet [main function]
 *
 * @param {object} config [config object passed by entry function]
 * @param {string} sweetType [internal type of entry function]
 * @returns {function} [close function returned by openDialog]
 */
function sweet(
  config: Sweetalert.IAlertOption & Sweetalert.IConfirmOption,
  sweetType: 'alert' | 'info' | 'confirm'
) {
  const {
    className = '',
    prefix = 'zent',
    confirmType = 'primary',
    closeBtn = false,
    maskClosable = false,
    title,
    type,
    content,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
    parentComponent,
    onClose,
  } = config;

  // close 的引用地址，后续会指向函数的返回值，供 ActionButton 调用。
  let close = null;

  const renderTitle = i18n => {
    const icon = TitleIconMap[type];
    return (
      <div className={`${prefix}-sweetalert-${type ? 'icon-' : ''}title`}>
        {type && (
          <Icon className={`${prefix}-sweetalert-type-icon`} type={icon} />
        )}
        {title || i18n.title}
      </div>
    );
  };

  const renderButtons = i18n => {
    const isAlert = sweetType === 'alert';
    return (
      <div className={`sweet-${sweetType}-actions`}>
        {!isAlert && (
          <ActionButton
            key="sweetalert-cancel"
            type="default"
            className={`${prefix}-sweetalert-${sweetType}-btn-cancel`}
            getClose={() => close}
            onClick={onCancel}
            text={cancelText || i18n.cancel}
          />
        )}
        <ActionButton
          key="sweetalert-confirm"
          type={confirmType}
          className={`${prefix}-sweetalert-${sweetType}-btn-confirm`}
          getClose={() => close}
          onClick={onConfirm}
          text={confirmText || (isAlert ? i18n.ok : i18n.confirm)}
        />
      </div>
    );
  };

  close = openDialog({
    prefix,
    closeBtn,
    maskClosable,
    className: cx(`${prefix}-sweetalert-${sweetType}`, {
      [className]: !!className,
    }),
    title: <Receiver componentName="Sweetalert">{renderTitle}</Receiver>,
    children: content,
    footer: <Receiver componentName="Sweetalert">{renderButtons}</Receiver>,
    parentComponent,
    onClose,
  });

  return close;
}

export function alert(config: Sweetalert.IAlertOption = {}) {
  return sweet(config, 'alert');
}

export const info = alert;

export function confirm(config: Sweetalert.IConfirmOption = {}) {
  return sweet(config, 'confirm');
}

export const Sweetalert = {
  alert,
  info,
  confirm,
};

export default Sweetalert;
