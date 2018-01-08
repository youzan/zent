import React from 'react';
import cx from 'classnames';

import { I18nReceiver as Receiver } from 'i18n';
import { Sweetalert as i18nDefault } from 'i18n/default';
import Dialog from 'dialog';
import Icon from 'icon';

import ActionButton from './ActionButton';
import { TitleIconMap } from './constants';

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
function sweet(config, sweetType) {
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
    parentComponent
  } = config;

  // close 的引用地址，后续会指向函数的返回值，供 ActionButton 调用。
  let close = null;

  const renderTitle = i18n => {
    const icon = TitleIconMap[type] || '';
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
        <ActionButton
          key="sweetalert-confirm"
          type={confirmType}
          className={`${prefix}-sweetalert-${sweetType}-btn-confirm`}
          getClose={() => close}
          onClick={onConfirm}
          text={confirmText || (isAlert ? i18n.ok : i18n.confirm)}
        />
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
      </div>
    );
  };

  close = openDialog({
    prefix,
    closeBtn,
    maskClosable,
    className: cx(`${prefix}-sweetalert-${sweetType}`, {
      [className]: !!className
    }),
    title: (
      <Receiver componentName="Sweetalert" defaultI18n={i18nDefault}>
        {renderTitle}
      </Receiver>
    ),
    children: content,
    footer: (
      <Receiver componentName="Sweetalert" defaultI18n={i18nDefault}>
        {renderButtons}
      </Receiver>
    ),
    parentComponent
  });

  return close;
}

export function alert(config = {}) {
  return sweet(config, 'alert');
}

export const info = alert;

export function confirm(config = {}) {
  return sweet(config, 'confirm');
}

export default {
  alert,
  info,
  confirm
};
